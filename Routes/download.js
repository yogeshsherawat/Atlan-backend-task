var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var lineReader = require('line-reader');
var fetch = require('node-fetch');
var fileName = require('../constants/fileName');
var downConstants = require('../constants/downConstants');
var { dPause: downloadPause, dComplete: downloadComplete, drow: downRow, dTerminate: downTerminate , disDownloading:isDownloading   } = downConstants;



router.post('/downloadPause', (req, res) => {
    if (!isDownloading)
        res.send("Start Downloading First");
    else {
        console.log("should be paused here");
        downloadPause = true;
        res.redirect('/');
    }

})




router.post('/downloadResume', (req, res) => {
    if (!isDownloading)
        res.send('Start Downloading First');
    else {
        downloadPause = false;
        fetch('http://localhost:3000/download', { method: 'POST' });
        res.redirect('/');
    }
})






router.post('/download', (req, res) => {
    isDownloading = true;
    if (fs.existsSync('./uploads/'+fileName)) {
        if (downloadComplete)
            res.send("Download Completed");
        else {
            // ( , { , { 
            var downCurrRow = 0;
            console.log(downRow);
            lineReader.eachLine('./uploads/'+fileName, (line, last) => {

                if (downCurrRow >= downRow && downloadPause == false) {

                    //console.log("Line=" + line);
                    line = line + '\n';
                    fs.appendFile('./downloads/'+fileName, line, function (err) {
                        if (err) console.log(err.message);
                        console.log("downCurrRow:" + downCurrRow);
                        downRow++;
                        downCurrRow++;
                        if (last) {
                            downloadComplete = true;
                            toSend = "downloading Complete";
                            if (downTerminate) {
                                fs.unlinkSync('./downloads/'+fileName);
                                toSend = "Terminated Download"
                            }
                            res.send(toSend);
                        }
                    })

                }
                else
                    downCurrRow++;
            });


            // },},)
        }
    }
    else {
        isDownloading = false;
        res.send('Upload a File First');

    }

})




router.post('/downloadTerminate', async (req, res) => {
    try {
        if (!isDownloading)
            res.send("Start Downloading First");
        else {
            console.log("temrinate called");
            downRow = 0;
            await fs.unlink('./downloads/' + fileName);
            downTerminate = true;
            res.send("Terminated");
        }

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

});

module.exports = router;