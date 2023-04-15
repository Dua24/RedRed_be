const admin = require('firebase-admin');
const serviceAccount = require('../../redred-firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://redred-31c48.appspot.com'

})

module.exports = admin 
