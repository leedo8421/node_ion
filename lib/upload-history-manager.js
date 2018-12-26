

class UploadHistoryManager {
  constructor(req, res){
    let page = req.param('page');
    if(page == null) {page = 1;}
    let skipSize = (page - 1) * 10;
    let limitSize = 10;
    let pageNum = 1;
  }

// (req, res) => {
//   let page = req.param('page');
//   if(page == null) {page = 1;}
// let skipSize = (page - 1) * 10;
// let limitSize = 10;
// let pageNum = 1;
//
// File.count({},(err, totalCount)=>{
//   console.log(totalCount)
//   if(err) {
//     throw err;
//   }
//   pageNum = Math.ceil(totalCount/limitSize);
//   File.find({}).skip(skipSize).limit(limitSize).exec((err, pageContents) => {
//     if(err) {
//       throw err;
//     }
//     res.render('upload_list', {data: pageContents, pagination: pageNum, page: parseInt(page)});
//   });
// });
// }
}