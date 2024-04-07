const fsp = require('node:fs/promises'),
express = require('express'),
app = express(),
fileUpload = require('express-fileupload'),
{ log } = require('console'),
path = require('path'),
formidable = require('formidable')


app.use(fileUpload({defCharset: 'utf8', defParamCharset: 'utf8'}));

let uploadFile = function (req, res, id) {
  log("Запрос на выкладывание файлов");
  if (!req.files || Object.keys(req.files).length === 0) //проверкаа наличия файлов
      return res.status(400).send('No files were uploaded.');
  
  // console.log(req.files);

  let sampleFile = req.files.file; 
  const fileName = req.body.name;  

  try {
    fsp.writeFile(`./library/${id}.pdf`, sampleFile.data)
  } catch(err){throw err}
  console.log("save done");
}

exports.uploadFile = uploadFile;