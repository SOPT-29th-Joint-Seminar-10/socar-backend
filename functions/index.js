const admin = require('firebase-admin');
const serviceAccount = require('./socar-server-814e9-firebase-adminsdk-9e02d-f5661f6cfc');
const dotenv = require('dotenv');

dotenv.config();

let firebase;
if (admin.apps.length === 0) {
  firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  firebase = admin.app();
}

module.exports = {
  api: require('./api'),
};
