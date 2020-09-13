# send-emails
## Project description
Web app which accepts a TSV file with a list of customer names and 
their email addresses as an input. Data from file is pass to the back-end. 
Emails are sent to all users and the progress is shown in the app.   

Example customers_list.tsv file:
```
Name    Email
John    john@example.com
Stanley    stanley@example.com
Jim    jim@example.com
Pam    pam@example.com
Ryan    ryan@example.com
```

The following were used for implementation:
Front-end: Vue, Vuex
Back-end: Node.js, express.js, socket.io, nodemailer
DB: MongoDB

To run locally required `.env` file (in api folder) with:  
`mongoURI` - url to connect to DB,    
`mailUser` - login to gmail account,    
`mailPass` - password to gmail account


## Project setup
Clone project
```
git clone https://github.com/annatrzeciak/send-emails.git
```
Paste or create `.env` file to api folder

Install and run back-end
```
cd ~/send-emails/api/
npm install
npm run start
```
Install and run front-end
```
cd ~/send-emails/ui/
npm install
npm run serve
```
