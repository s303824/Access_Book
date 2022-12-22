const express = require('express');
const multer = require('multer');
const pdfjs = require('pdfjs-dist');
var EPUBJS = require('epubjs');
const { exec } = require('child_process');

const app = express();
const upload = multer();

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
  
app.post('/generateTextPagePdf', upload.single('pdf'), (req, res) => {
  // req.file contains the PDF file
  // process the file as needed
  const pdfFile = req.file;
  const index = Number(req.body.number);
  const source = {
    data: pdfFile.buffer,
  };

  let text = "";
  var loadingTask = pdfjs.getDocument(source);

  loadingTask.promise.then(function(doc) {
    doc.getPage(index).then((page) => {
      page.getTextContent().then((content) => {
        content.items.forEach((item) => {
          text+=item.str + " ";
        });
        
        text = text.trim().replace(/\s+/g, ' ');
        res.send({
          text : text,
          pageCount : doc.numPages
        });

      });
    });
  });
});

app.post('/generateTextPageEpub', upload.single('file'), (req, res) => {
  const index = Number(req.body.number);

  let text = "";
  const book = new EPUBJS.Book(req.file.buffer);

    book.load().then(() => {
      const chapter = book.getChapter(index);
      const container = document.createElement('div');
      chapter.renderTo()
    text = text.trim().replace(/\s+/g, ' ');
    res.send({
      text : text,
      pageCount : book.renderer.pageCount
    });
  });
});


app.get('/createAudioFile', (req, res) => {
  // req.file contains the PDF file
  // process the file as needed
  const text = req.query.text;
  // specify the command to run the Python script
  const command = 'python3 ./server/python/tts.py ' + JSON.stringify(text);
  
  // execute the Python script
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    res.sendFile('./server/python/readaloud.mp3', {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
      root: __dirname
    });
  });
});

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});