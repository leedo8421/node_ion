const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
var fs = require('fs');
const xp = require('../lib/xlsxParser');


router.get('/', (req, res) => {
  // res.render('download');
  res.send('Input the file full name...')
});


// QSCeF_20181219133701.xlsx
router.get('/:id', (req, res) => {
  const fileKey = req.param('id');
  console.log(fileKey);
  // const fileKey = 'QSCeF_20181219133701.xlsx';

  console.log('Trying to download file', fileKey);
  aws.config.loadFromPath(`${__dirname}/../config/s3config.json`);

  const s3 = new aws.S3();
  const options = {
    Bucket    : 'test-alan',
    Key    : fileKey,
  };

  // res.attachment(fileKey);
  // res.download(`${__dirname}/../data/`, fileKey)
  const fileStream = s3.getObject(options).createReadStream();
  res.send('Downloaded!!!!');
  const writeStream = fs.createWriteStream('D://'+fileKey)
  writeStream.on('finish', ()=>{
    xp.xlsxParser('D://'+fileKey)
  });
  fileStream.pipe(writeStream);


  // setTimeout(function (){
  //  xp.xlsxParser('D://'+fileKey)
  // }, 5000);
  // xp.xlsxParser('D://'+fileKey)
});

module.exports = router;
