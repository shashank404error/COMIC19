var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
let db = admin.firestore();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'COMIC19 | Login' });
});

router.get('/getting-started',function (req,res,next) {
  let docRef = db.collection('comics').doc(req.query.email);
  let bPartnerInfo = docRef.set({
    email: req.query.email,
    name: req.query.fName+" "+req.query.lName,
  });
  res.render('homepage',
      {
        title: 'COMIC19 | Homepage',
        link1:  req.query.fName+" "+req.query.lName,
        link2: '',
        link3: '',
        link4: '',
        //email:req.body.email});
      });
});

module.exports = router;
