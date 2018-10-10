// execute this as - node create_token_using_uid.js
// this script runs on server

const admin = require('firebase-admin')
const serviceAccount = require('./service_account.json')
const admin_credentials = require('./admin_credentials.js')


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

// console.log(admin.app().name)

const firestore = admin.firestore()
firestore.settings({ timestampsInSnapshots: true })

admin.auth().createCustomToken(admin_credentials.uid)
        .then(function(customToken) {
          // Send token back to client
          console.log(customToken)
            // return admin.auth().verifyIdToken(admin_credentials.uid)
            // .then(function(decodedToken) {
            //     var uid = decodedToken.uid;
            //     console.log(decodedToken)
            // }).catch(function(error) {
            //     console.log('error --- ', error)
            // })
        })
        .catch(function(error) {
          console.log("Error creating custom token:", error);
        })




//   admin.auth().getUser('cashmoneysai@gmail.com')
//     .then(function(userRecord) {
//         // See the UserRecord reference doc for the contents of userRecord.
//         console.log("Successfully fetched user data:", userRecord.toJSON());
//     })
//     .catch(function(error) {
//         console.log("Error fetching user data:", error);
//     });



// admin.auth().createUser({
//     uid: "cashmoneysai@gmail.com", // (optional property) we are explicitly specifying a uid
//     email: "cashmoneysai@gmail.com",
//     emailVerified: false,
//     phoneNumber: "+4053388406",
//     password: "",
//     displayName: "John Doe",
//     photoURL: "http://www.example.com/12345678/photo.png",
//     disabled: false
//   })
//     .then(function(userRecord) {
//       // See the UserRecord reference doc for the contents of userRecord.
//       console.log("Successfully created new user:", userRecord.uid);

    //   admin.auth().getUser(userRecord.uid)
    //     .then(function(userRecord) {
    //         // See the UserRecord reference doc for the contents of userRecord.
    //         // console.log("Successfully fetched user data:", userRecord.toJSON());
    //     })
    //     .catch(function(error) {
    //         // console.log("Error fetching user data:", error);
    //     });

    //  admin.auth().createCustomToken(userRecord.uid)
    //     .then(function(customToken) {
    //       // Send token back to client
    //       console.log(customToken)
    //     })
    //     .catch(function(error) {
    //       console.log("Error creating custom token:", error);
    //     });
    // })
    // .catch(function(error) {
    //   console.log("Error creating new user:", error);
    // });