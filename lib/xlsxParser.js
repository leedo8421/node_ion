const xlsx = require("xlsx");

module.exports.xlsxParser = (path) => {
  console.log('hihihihi!!!!!!!!!!!!!!!!!!!!!')
  let workbook = xlsx.readFile(path);
  // console.log(workbook)
  let worksheet = workbook.Sheets["대량발송"]
  console.log(worksheet)


};
