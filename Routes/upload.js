var express = require("express");
var router = express.Router();
var lineReader = require('line-reader');
var fs = require('fs-extra');
var fetch = require('node-fetch');
var UpConstants = require('../constants/upConstants');
var fileName = require('../constants/fileName');
var { uPause: pause, uComplete: complete, urow: row, uTerminate: terminate,uisUploading:isUploading } = UpConstants;

router.get('/abc', (req, res) => {
    pause = false;
    complete = false;
    row = 0;
    terminate = false;
    isUploading = false;
    res.redirect('/');
})


router.post('/pause', (req, res) => {
    if (!isUploading)
        res.send('Please Start Uploading first');
    else {
        pause = true;
        res.send('Uploading Paused');
    }

})




router.post('/resume', (req, res) => {
    if (!isUploading)
        res.send('Please Start Uploading First');
    else {
        pause = false;
        console.log("need to redirect to post route of /");
        fetch('http://localhost:3000/upload', { method: 'POST' });
        if(complete)
        res.send('Uploading Completedd');
    }
})




router.post('/upload', (req, res) => {
    isUploading = true;
    if (complete)
        res.send('uploading completed');
    else {
        var currRow = 0;
        console.log(row);
        lineReader.eachLine('./'+fileName, (line, last) => {

            if (currRow >= row && pause == false) {

                line = line + '\n';
                fs.appendFile('./uploads/'+fileName, line, function (err) {
                    if (err) console.log(err.message);
                    console.log("currRow:" + currRow);
                    row++;
                    currRow++;
                    if (last) {
                        complete = true;
                        toSend = 'Uploading complete';
                        res.send(toSend);
                    }
                })

            }
            else
                currRow++;
        });

    }
})



  
router.post('/terminate', async (req, res) => {
    try {
        if (!isUploading)
            res.send("Please Start Uploading First");
        else {
            row = 0;
            pause = true;
            await fs.unlink('./uploads/' + fileName);
            terminate = true;
            res.send("File Terminated");
        }

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

});

module.exports = router;