const express = require('express');
const router = express.Router();
const s3upload = require('../lib/s3upload');
const File = require('../models/File');
const fc = require('../collections/FileCollection');
const pagingLib = require('../lib/pagingLib');


router.get('/', (req, res) => {
  res.render('upload');
});

/**
 * @swagger
 * definitions:
 *   files:
 *     properties:
 *       originName:
 *         type: string
 *       refineName:
 *         type: string
 *       size:
 *         type: string
 *       format:
 *         type: string
 */

/**
 * @swagger
 * /upload/list:
 *   get:
 *     tags:
 *       - File upload history list
 *     description: Returns File upload history list by page 1
 *     produces:
 *       - application/view
 *     responses:
 *       200:
 *         description: json object by file upload history
 *         schema:
 *           $ref: '#/definitions/files'
 */
/**
 * @swagger
 * /upload/list/{id}:
 *   get:
 *     tags:
 *       - File upload history list by page
 *     description: Returns File upload history list by {id}
 *     produces:
 *       - application/view
 *     responses:
 *       200:
 *         description: json object by file upload history
 *         schema:
 *           $ref: '#/definitions/files'
 */
router.get(['/list', '/list/:page'], (req, res) => {
  let page = req.param('page') || 1;
  const fileCollection = new fc({model: File});

  fileCollection.getListByPage(pagingLib.getPagination(page))
    .then((result) => {
      // throw new Error('Error Test by alan.lee')
      res.render('upload_list', {data: result.pageContents, pagination: result.pageNum, page: parseInt(page)});
    })
    .catch((err) => {
      console.log(err)
      res.send(err.message);
    });

});

router.get('/list_data', (req, res) => {
  File.find( {}, function(err, files) {
    if (err) return res.status(500).send("파일 업로드 히스토리 전체 조회 실패.");
    res.status(200).send(files);
  });
});

router.post('/', s3upload.upload.array('upl', 1), (req, res) => {
  // console.log('uploaded!!!!!!!!!!!!!!!!!');
  const filesize = req.files[0].size;
  s3upload.writeFileDataDB(filesize);

  res.write("<script>alert('uploaded!!!')</script>");
  res.write("<script>window.location='upload/list'</script>");
});

module.exports = router;
