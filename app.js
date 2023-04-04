const bodyParser = require('body-parser');
const express = require('express');
const tesseract = require("node-tesseract-ocr");

const app = express();

const config = {
    lang: 'eng',
    oem: 1,
    psm: 3,
};

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', { data: '' });
});

app.post('/extractFromImage', function (req, res) {
    const url = req.body.url;
    // console.log(url);

    tesseract
        .recognize(url, config)
        .then((text) => {
            console.log("Result:", text);
            res.render('index', { data: text });
        })
        .catch((error) => {
            console.log(error.message);
        });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`App is running on port ${port}`);
});