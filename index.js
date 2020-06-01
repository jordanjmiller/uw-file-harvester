const fs = require('fs');
const { google } = require('googleapis');

const credentials = require('./credentials.json');

const scopes = ['https://www.googleapis.com/auth/drive'];
const auth = new google.auth.JWT(
    credentials.client_email, null,
    credentials.private_key, scopes
);

const drive = google.drive({ version: "v3", auth });

let data = '';

const getFirstPage = (fileName) => {
    data = 'URL,File name\n';
    drive.files.list({pageSize: 1000, fields: 'nextPageToken, files(id, name)'}, (err, res) => {
        if (err) throw err;
    
        console.log('length:',res.data.files.length);
    
        res.data.files.map(entry => {
            const { name, id } = entry;
            data += `https://drive.google.com/u/0/open?usp=forms_web&id=${id},${name}\n`;
        });
    
        if (res.data.nextPageToken){
            nextPage(fileName, res.data.nextPageToken);
        }
        else{
            fs.writeFile(`${fileName}.csv`, data, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            });
        }
    });
}

const nextPage = (fileName, nextPageToken) => {
    drive.files.list({'pageToken': nextPageToken}, (err, res) => {
        console.log('Accessing next page. Current Length:', data.length);
        if (err) throw err;
    
        res.data.files.map(entry => {
            const { name, id } = entry;
            data += `https://drive.google.com/u/0/open?usp=forms_web&id=${id},${name}\n`;
        });
        if (res.data.nextPageToken){
            nextPage(fileName, res.data.nextPageToken);
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

getFirstPage(drive, 'Output');