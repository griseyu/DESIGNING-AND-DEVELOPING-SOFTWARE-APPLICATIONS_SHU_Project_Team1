# Designing and developing Software applications - Sheffield Hallam University - NS2 BF-2020/1

**An app to build a prescription for the user for their personal skincare and beauty products.**



- [x] Things need to run the application: 
* Node 
* MongoDB 
* IDE/Shell

- [x] Copy code:
To copy code locally, in your shell/terminal copy the following:
 **git clone https://github.com/jmin97/DESIGNING-AND-DEVELOPING-SOFTWARE-APPLICATIONS_SHU_Project_Team1.git**
 
- [x] To install node:
Run in your shell/terminal 
**npm install**

- [x] Install dependencies: 
**npm install**

- [x] To set up a database in MongoDB:
1. Drag from our code or download backup.zip from our repository 
2. Then unzip it on your Desktop (so it is a folder called backup)
3. In your terminal/shell copy the code below, substitute "Name" and "Users" with your higher-level path to Desktop 

**mongorestore --db=ddsa-project --dir=/Users/!Name!/Desktop/backup/ddsa-project**

Alternatively : download JSONS from jsonsBackup folder in this ropository and populate your MongoDB manually 

- [x] To run the application:
1. Make sure you have the above installed (check node version by putting **node -v** into terminal), 
2. Open project in IDE or terminal/shell 
3. run **node server.js** into terminal/shell or terminal section of IDE
4. navigate to localhost:3000 on your browser
