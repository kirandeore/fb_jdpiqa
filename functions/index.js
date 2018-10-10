const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const _ = require('lodash')
const serviceAccount = require('./service_account')
const admin_credentials = require('./admin_credentials.js')
const saltRounds = 10

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const firestore = admin.firestore()
const auth = admin.auth()
firestore.settings({ timestampsInSnapshots: true })

bcrypt.hash(admin_credentials.password, saltRounds).then(function(hash) {
    firestore.collection('jdpiqa_allowed_users').doc('saibaba').set({
        name: 'Sai Baba',
        password: hash 
    })
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next()
})

// https://us-central1-jdpiqa.cloudfunctions.net/getJdpiqaData
app.get('',(req, res) => {
    const result = []
    const docRef = firestore.collection('questionandanswers').get()
    
    docRef.then(snapshot => {
        snapshot.forEach(doc => result.push(Object.assign(doc.data(), { id: doc.id })))
        
        res.status(200).json(result)
    })
})

app.post('/createUserInFirebaseUsersTable', (req, res) => {
    auth.createUser(admin_credentials)
     .then(userRecord => response.status(200).json(userRecord))
     .catch(error => response.status(500).json(error))
})

app.post('/saveqna', (req, res) => {
    // If your data has more than 500 entries you'll have to do break it up and do 500 at a time.

    const qnas = req.body.qnas
    // console.log(qnas[0])
    const batch = firestore.batch()

    _.forEach(qnas, qna => {
        const { question, answer, id } = qna

        if (id) {
            const docRef = firestore.collection('questionandanswers').doc(id)
            batch.set(docRef, { question, answer })
        } else {
            const docRef = firestore.collection('questionandanswers').doc()
            console.log('new id', docRef.id)
            batch.set(docRef, { question, answer })
        }
    })

    batch.commit().then((result) => {
        res.status(200).send('ok')
    })
    .catch((error) => res.status(500).send(error))
})

app.post('/deleteqna', (req, res) => {
    const qnas = req.body.qnas
    // console.log(qnas[0])
    const batch = firestore.batch()

    _.forEach(qnas, qna => {
        const { id } = qna
        // console.log(id)
        const docRef = firestore.collection('questionandanswers').doc(id)

        batch.delete(docRef)
    })

    batch.commit().then((result) => {
        res.status(200).send('ok')
    })
    .catch((error) => res.status(500).send(error))
})

app.post('/generateCustomTokenUsingEmailID',(req, res) => {
    const docRef = firestore
        .collection('jdpiqa_allowed_users')
        .doc(req.body.username)
    
    docRef.get()
        .then(doc => {
            if (doc.exists) {
                const jsonDoc = doc.data()
                
                return Promise.resolve(jsonDoc)
            }
            
            return Promise.reject({ code: 'USER/NOTEXISTS', message: 'User doesn\'t exist' })
        })
        .then(jsonDoc => bcrypt.compare(req.body.password, jsonDoc.password))
        .then(res => res ? Promise.resolve(true) : Promise.reject({ code: 'INCORRECT/PASSWORD', message: 'Incorrect password' }))
        .then(() => auth.createCustomToken(req.body.username))
        .then(customToken => res.status(200).json(customToken))
        .catch(error => res.status(500).json(error))    
})

app.post('/verifyCustomTokenGeneratedByEmailID',(req, res) => {
    auth.verifyIdToken(req.body.token)
        .then((decodedIdToken) => {
            console.log('ID Token correctly decoded', decodedIdToken);
            req.user = decodedIdToken;
            res.status(200).send('Cool') // .json(customToken)
        })
        .catch((error) => {
            console.error('Error while verifying Firebase ID token:', error);
            res.status(403).send('Unauthorized');
        })
})

exports.getJdpiqaData = functions.https.onRequest(app)

// console.log(admin.app().name)

// firebase serve --only hosting, functions

/*
    https://www.youtube.com/watch?v=0NaEmhh9Dzg

    firebase API key musy be public like a URL
*/

// https://us-central1-jdpiqa.cloudfunctions.net/getJdpiqaData
// exports.getJdpiqaData = functions.https.onRequest((request, response) => {
//     const result = []
    
//     firestore.collection('questionandanswers').get()
//     .then(snapshot => {
//         snapshot.forEach(doc => result.push(Object.assign(doc.data(), { id: doc.id })))
        
//         response.status(200).json(result)
//     })
// })