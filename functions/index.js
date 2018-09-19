const functions = require('firebase-functions')
const admin = require('firebase-admin')
const Firestore = require('@google-cloud/firestore')
const serviceAccount = require('./service_account')

const firestore = new Firestore({
    projectId: 'jdpiqa',
    keyFilename: './service_account.json',
});

exports.getJdpiqaData = functions.https.onRequest((request, response) => {
    const result = []
    
    firestore.collection('questionandanswers').get()
    .then(snapshot => {
        snapshot.forEach(doc => result.push(Object.assign(doc.data(), { id: doc.id })))
        
        response.status(200).json(result)
    })

    // snapshot.forEach(doc => console.log('kya yaar', doc.data()))
    /*
    response.status(200).json([{
        question: 'Explain what is Java Design Pattern?',
        answer: 'A design pattern is a language independent strategies for solving common object oriented design problem.  It describes how to structure classes to meet a given requirement.'
    }, {
        question: 'Explain what is creational design patterns and Factory pattern?',
        answer: `Creational design pattern: This pattern is used to define and describe how objects are created at class instantiation time.
    Factory pattern: The factory pattern is used to create an object without exposing the creation logic to the client and refer to a newly created object using a common interface.
        `
    }, {
        question: 'Which design pattern is used to get a way to access the elements of a collection object in sequential manner?',
        answer: 'Iterator pattern is used to get a way to access the elements of a collection object in sequential manner.'
    }, {
        question: 'When service locator pattern is used?',
        answer: 'When we want to locate various services using JNDI we use service locator pattern.'
    }, {
        question: 'Mention in how many ways can you create singleton pattern?',
        answer: `To create single objects there are two famous ways:
    Lazy loading
    Eager loading`
    }, {
        question: 'Mention which pattern is used when we need to decouple an abstraction from its implementation?',
        answer: `When we want to decouple an abstraction from its implementation in order that two can vary independently we use bridge pattern.`
    }, {
        question: 'Mention which design pattern will be helpful to add new functionality to an existing object?',
        answer: 'A decorator pattern allows a user to add new functionality to an existing object without changing its structure.'
    }, {
        question: 'Explain how can you create a Singleton class in Java?',
        answer: `It is two step process,
    First make the constructor private so that new operator cannot be used to instantiate the class
    Return an object of the object if not null otherwise create the object and return the same via a method.`
    }, {
        question: 'Is it possible to write thread safe singleton in Java?',
        answer: 'To write thread safe singleton in Java there are multiple ways for example by using static singleton instance initialized during class loading, by writing singleton using double checked locking. Java Enum is the simplest way to create thread safe singleton.'
    }, {
        question: 'Mention how one should describe a design pattern?',
        answer: `To describe a design pattern, following things need to be taken care of:
    Pattern name and classification
    Problem and solution
    Consequences : Variation and language dependent alternatives should also be addressed
    Know Uses: Identify the uses in the real systems and its efficiency`
    }, {
        question: 'Mention why access to the non-static variable is not allowed from static method in Java?',
        answer: 'You cannot access non-static data from static context because non-static variable are associated with a specific instance of an object while static is not associated with any instance.'
    }, {
        question: 'Mention which pattern is useful when one has to pass data with multiple attributes in one shot from client to server?',
        answer: 'Transfer Object Pattern is useful when one has to pass data with multiple attributes in one shot from client to the server.'
    }, {
        question: 'Name some of the entities of DAO pattern?',
        answer: `Some of the entities of DAO include,
    Data access object concrete class
    Data access object interface
    Model object or value object`
    }, {
        question: 'Mention when can you use the Intercepting pattern?',
        answer: 'Intercepting pattern is used when you have to do some pre-processing or post processing with request or response of the application.'
    }, {
        question: 'Mention when to use a Factory Pattern?',
        answer: `Factory pattern can be used,
    When a class does not know which class of objects needs to create
    When class specifies its sub-classes to specify which objects to create
    In programming language, you can use factory pattern where you have to create an object of any one of sub-classes depending on the given data
        `
    }, {
        question: 'Explain in singleton pattern whether it is better to make the whole getinstance() method synchronized or just critical section is enough? Which one is preferable?',
        answer: 'Synchronization of whole getinstance() method is costly and is only needed during the initialization on singleton instance, to stop creating another instance of Singleton.  Therefore it is better to only synchronize critical section and not the whole method.'
    }, {
        question: 'Mention in how many ways can you write singleton class in Java?',
        answer: `One can write singleton class in Java in four ways:
    Singleton with public static final field initialized during class loading
    Singleton generated by static nested class, also referred as singleton holder pattern
    Singleton by synchronizing get instance () method
    From Java 5 on-wards using Enums`
    }, {
        question: 'Explain how can you prevent creating another instance of singleton using clone() method?',
        answer: 'The preferred way to prevent creating another instance of a singleton is by not implementing Cloneable interface and if you do just throw an exception from clone() method “ not to create a clone of singleton class”.'
    }, {
        question: 'Mention what is the difference between “throw” and “throws”?',
        answer: 'Keyword “Throw” is used to explicitly throw as an exception, while “Throws” is utilized to handle checked exceptions for re-intimating the compiler that exceptions are being handled.   The throws need to be used in the method’s definition and also while invoking the method that raises checked exceptions.'
    }, {
        question: 'Mention which classes in JDK uses singleton pattern?',
        answer: 'Java.lang.Runtime classes uses singleton pattern in JDK.'
    }, {
        question: 'Mention what is the limitation of using singleton pattern?',
        answer: 'The singleton pattern ensures that a class has only one instance and to provide a global point of access to it.  But at the same time this becomes its limitation as most classes in an application you will need to create multiple instances.'
    }, {
        question: 'Mention what is the difference between VO and JDO?',
        answer: 'The difference between JDO and VO is that the JDO is a persistent technology that compete against entity beans in enterprise application development.  It enables you to create POJO (plain old java objects) and persist them to the database. While VO stands for value objects represents an abstract design pattern used in conjuction with entity beans, jdbc and possibly even JDO to overcome commonly found isolation and transactional problems in enterprise apps.'
    }]);
    */
});
