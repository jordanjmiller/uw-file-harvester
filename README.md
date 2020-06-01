# uw-file-harvester
This program takes data from google drive files and saves wanted information (Link to the file and the file's name) into csv.

### Installation

Certain programs are needed to be able to run the script. These instructions are for a windows machine.

#### 1: Install programs

1a: Install git bash for windows: https://gitforwindows.org/ 

This is the terminal, different from the windows terminal. Attempting to run the following commands in the windows command prompt will not work.

1b: Install npm/node: https://www.npmjs.com/get-npm

Node.js is what runs the code, npm allows downloading of packages that are used within projects to use external tools (such as the google apis used in this project)

#### 2: Downloading the project:

Go to https://github.com/jordanjmiller/uw-filename-harvester and click the green Clone or download button. Click download zip and extract it in your desired location.

#### 3: Install dependencies

These are the external tools used by the project. Double click the Install.sh folder to run a script I included to install the files.
> Alternatively, the terminal command would be npm i or npm install

#### 4: Setting up google drive files

The program works by checking the filenames and ids of all files that have been shared with the gmail account. 

Credentials should never be shared publicly, so I will walk you through setting up google drive credentials instead of having it provided for download.

##### 4a: Creating credentials.json

Go to the [Google developer dashboard](https://console.developers.google.com) Log in and create a project.

Go to the dashboard, select your project, and then click on Enable Apis and Services. Search for the [Google Drive API](https://console.developers.google.com/apis/library/drive.googleapis.com?id=e44a1596-da14-427c-9b36-5eb6acce3775) and enable it.

Go to the [credentials tab](https://console.developers.google.com/apis/credentials) and click Create Credentials and the the Service account option from the dropdown.

Type in a name (can be anything), save the email (xxx@xxx.iam.gserviceaccount.com) (This is the email you will share files with.), and then click on create.

Skip the service account permissions by clicking continue.

On the next page you should see a Create Key option. Click it, click on key type JSON, and click create. It will download a file containing the credentials for the email. Do not share this publicly.

Take the file, move it into the project folder containing the code, and rename it credentials.json

#### 5: Running the script

Share the folder of images on google drive with the service account gmail (xxxx@xxxx.iam.gserviceaccount.com). Keep the gmail private so other people can't share things with it.

Once files have been shared, double click RunScript.sh
>Alternatively, the terminal command would be   node .

If there are no errors a bash terminal should pop up, run the script, and then save the output as Output.csv

#### 6: Uploading the csv results to google sheets

Go into the spreadsheet on google sheets you want to import data into, then File -> Import -> Upload -> Select from device -> choose the Output.csv file -> Import location new sheets, separator type comma, Convert text no.

Done! To run the script on a different batch of images, unshare everything with the service account and share the new files, then run the script again. You wont need to redo any of the setup steps.