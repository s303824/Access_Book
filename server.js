const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfjs = require('pdfjs-dist');

const app = express();
const upload = multer();


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/createAudioFile', upload.single('pdf'), (req, res) => {
  // req.file contains the PDF file
  // process the file as needed
  const pdfFile = req.file;
  console.log(pdfFile);

  const source = {
    data: pdfFile.buffer,
  };

  let text = "";
  var loadingTask = pdfjs.getDocument(source);

  loadingTask.promise.then(function(doc) {
    doc.getPage(1).then((page) => {
      page.getTextContent().then((content) => {
        content.items.forEach((item) => {
          console.log(item.str)
          text+=item.str + " ";
        });
        res.send(text.replace(/\s+/g, ' '));  // send the extracted text
      });
    });
  });
});
app.listen(4000, () => {
  console.log('Server listening on port 4000');
});