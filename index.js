const fs = require('fs');
const { google } = require('googleapis');

const credentials = require('./credentials.json');
const credentialsBothell = require('./credentialsB.json');
const credentialsTacoma = require('./credentials-tacoma.json');

const scopes = ['https://www.googleapis.com/auth/drive'];
const auth = new google.auth.JWT(
    credentials.client_email, null,
    credentials.private_key, scopes
);
// const authB = new google.auth.JWT(
//     credentialsBothell.client_email, null,
//     credentialsBothell.private_key, scopes
// );
// const authT = new google.auth.JWT(
//     credentialsTacoma.client_email, null,
//     credentialsTacoma.private_key, scopes
// );

const drive = google.drive({ version: "v3", auth });
// const driveB = google.drive({ version: "v3", authB });
// const driveT = google.drive({ version: "v3", authT });

let data = '';

const getFirstPage = (currentDrive, fileName) => {
    data = 'URL,File name\n';
    currentDrive.files.list({pageSize: 1000, fields: 'nextPageToken, files(id, name)'}, (err, res) => {
        if (err) throw err;
    
        console.log('length:',res.data.files.length);
    
        res.data.files.map(entry => {
            const { name, id } = entry;
            data += `https://drive.google.com/u/0/open?usp=forms_web&id=${id},${name}\n`;
        });
    
        if (res.data.nextPageToken){
            nextPage(currentDrive, fileName, res.data.nextPageToken);
        }
        else{
            fs.writeFile(`${fileName}.csv`, data, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            });
        }
    });
}

const nextPage = (currentDrive, fileName, nextPageToken) => {
    currentDrive.files.list({'pageToken': nextPageToken}, (err, res) => {
        console.log('Accessing next page. Current Length:', data.length);
        if (err) throw err;
    
        res.data.files.map(entry => {
            const { name, id } = entry;
            data += `https://drive.google.com/u/0/open?usp=forms_web&id=${id},${name}\n`;
        });
        if (res.data.nextPageToken){
            nextPage(currentDrive, fileName, res.data.nextPageToken);
        }
        else{
            console.log('End reached. Length:', data.length);
            fs.writeFile(`${fileName}.csv`, data, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            });
        }
    });
}

getFirstPage(drive, 'Data-Seattle');
// getFirstPage(driveB, 'Data-Bothell');
// getFirstPage(driveT, 'Data-Tacoma');

// driveB.files.list({}, (err, res) => {
//     if (err) throw err;
//     const files = res.data.files;
//     if (files.length) {
//     files.map((file) => {
//       console.log(file);
//     });
//     } else {
//       console.log('No files found');
//     }
//   });