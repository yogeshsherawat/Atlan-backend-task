# BACKEND TASK
## API CALLS:
## 1.POST /upload:
#### Example:
POST Method : <baseURL>/upload
#### Result:
A Success message **Uploading Completed** on completion of upload and if not success then goes to other operations like resume/pause/terminate 
#### Description:
Local File name **dummy1.csv** gets uploaded to folder name **Uploads** at server

## 2.POST /pause
POST Method : <baseURL>/pause
#### Result:
Success Message on succesful pause of the uploading **Uploading Paused** or the error if uploading not started first **Please Start Uploading First**.
#### Description:
Pauses the file uploading the user has started if  uploading not started first then prompt error.

## 3.POST /resume
POST Method : <baseURL>/resume
#### Result:
Success Message **Uploading Completed** after succesful completion of uploading after resuming the uploading or the error if uploading not started first **Please Start Uploading First**.
#### Description:
Resumes the uploading if already paused or do nothing if uploading is going on.

## 4.POST /terminate
POST Method : <baseURL>/terminate
#### Result:
Success Message **File Terminated** after succesful termination of file or Error Message **Please Start uploading first** if no uploading is started
#### Description:
Deletes the currenty uploading file and stop uploading

## 5.POST /download
POST Method : <baseURL>/download
#### Result:
Success Message **Downloading Completed** on succesful completion of download or error message **Please Upload File First** if there is no file uploaded
#### Description:
Starts downloading the file if already uploaded or throw error if there is no such file

## 6.POST /downloadPause
POST Method : <baseURL>/downloadPause
#### Result:
Success Message on succesful pause of the downloading **Downloading Paused** or the error if uploading not started first **Please Start Downloading First**.
#### Description:
Pauses the file downloading the user has started or if downloading not started first then prompt error.

## 7.POST /downloadResume
POST Method : <baseURL>/downloadResume
#### Result:
Success Message **Downloading Completed** after succesful completion of downloading after resuming the downloading or the error if downloading not started first **Please Start Uploading First**.
#### Description:
Resumes the downloading if already paused or do nothing if downloading is going on.

## 8.POST /terminate
POST Method : <baseURL>/terminate
#### Result:
Success Message **File Terminated** after succesful termination of file or Error Message **Please Start downloading first** if no downloading is started
#### Description:
Deletes the currenty uploading file and stop downloading

## 9.GET /
GET Method : <baseURL>/
#### Result:
Displays a webpage with button corresponding to all of the above methods.
#### Description:
Button display for triggering the above post request and monitor the status at backend








## Approach:
#### Uploading
-Initialize file reading and file writing for the uplaoding and downlaoding proccess
-While downloading reading the .csv file line by line and writing the file simultaneosly on the downloads folder.
-If pause post route is triggered , stopping the file writing.
-If resume post route is triggered , then starting the file writing but skipping the already read lines.
-If termination post route is triggered , then deleting the file

#### Downloading is just like uploading , just changing the source and destination


