const admin = require('firebase-admin');
const serviceAccount = require('../redred-31c48-firebase-adminsdk-lovn7-eac26867f4.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://redred-31c48.appspot.com'

})

module.exports = admin 
