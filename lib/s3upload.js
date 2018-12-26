const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const File = require('../models/File');

aws.config.loadFromPath(`${__dirname}/../config/s3config.json`);

module.exports.makeFileName = function() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

module.exports.makeFileDate = function() {
  let text;
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth()+1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  text = year + month + day + hour + minute + second;

  return text
};

const s3 = new aws.S3();
let copyfile = null;
let copyRefineName = null;
let copyFormat = null;

module.exports.upload = multer({
  storage: multerS3({
    s3,
    bucket: 'test-alan',
    // acl: 'public-read',
    key: (req, file, cb) => {
      console.log(file);
      copyfile = file;
      const filename = this.makeFileName();
      const date = this.makeFileDate();
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      copyFormat = ext;

      // cb(null, Date.now() + file.originalname); // use Date.now() for unique file keys
      copyRefineName = filename + '_' + date + ext;
      cb(null, copyRefineName);
    },
  }),
});


module.exports.writeFileDataDB = function(filesize) {
  const originName = copyfile.originalname;
  const refineName = copyRefineName;
  const size = filesize;
  try {
    File.create({
      originName: originName,
      refineName: refineName,
      size: size,
      format: copyFormat
    });
  }catch (e) {
    console.log(e);
  }
};