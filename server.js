const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfjs = require('pdfjs-dist');
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



  //                  TODO: EPUB FILE FUNCTIONALITY

  
app.post('/generateTextPage', upload.single('pdf'), (req, res) => {
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
        console.log("------------------Text generated and sent------------------")

      });
    });
  });
});

app.get('/createAudioFile', (req, res) => {
  // req.file contains the PDF file
  // process the file as needed
  const text = req.query.text;
  // specify the command to run the Python script
  const command = 'python3 ./server/python/tts.py ' + JSON.stringify(text);
  
  console.log(command)

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
    console.log("------------------Audio file generated and sent------------------")
  });
});

app.listen(4000, () => {
  console.log('Server listening on port 4000');
});