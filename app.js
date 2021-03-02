path = require('path');
var express = require('express');
var app = express();
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/');
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + file.originalname);
    cb(null,file.originalname);
  }
});

var upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('wallpaper'), function (req, res) {
  console.log('---/upload--- be invoked!');
  console.log('req.file.path:',req.file.path)
  var imagePath = req.file.path.replace(/^public\//, '');
  res.redirect(imagePath);
});

app.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) res.status(500).send(err.message);
  else next(err);
});

app.listen(5000);

console.log('Server is listening on port 5000!');