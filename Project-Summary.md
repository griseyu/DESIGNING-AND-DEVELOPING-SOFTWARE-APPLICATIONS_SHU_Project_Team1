## Overview - An app to build a prescription for the user for their personal skincare and beauty products

### Team: @Hillryan95 @AlmostLorelai @heidiwilliams1 @jmin97


## Technology Stack:
 - HTML - Front-end of the website
 - CSS - Styling on the Front-end
 - JavaScript - Building functions of the website
 - MongoDB - Primary database
 - GitHub - Version Control and managing the workflow
 - Visual Studio Code - Environment for the development
 - Slack, Screen and Zoom - Team communication
 - Trello - planning and Kanban tool
 - Slack and Zoom - Team communication
 - Screen - Pair Programming
 - draw.io, canva, pexels, unsplash, Presentation - Design tools
 - Express, mongoose, node.js, NodeMailer, multiparty, bcrypt, jwt, bodyParser, cors, jQuery, bootstrap - Frameworks

## Stakeholders
Sheffield Hallam University (@LecturerMick)

## Main functions of the application:
The purpose of this application is to provide users with personalised recommendations for skin care, hair care and make up products based on a number of ingredient criteria selected by them; this is referred to as to as a prescription.

The user must first register to use these features but can access the home page without logging in. After the user is logged in, they will be directed to their profile page where they will be presented with the option to view their suggested products. On submitting the selections, the user is directed to a new page containing a table of results displaying the suggested product name and a link to purchase the product from. On this page the selections can be made again by clicking a ‘back’ button to return the user to the selection page.The user can then choose to log out and be redirected to the home screen.

The application is designed with a client side and server side. The server side handles interactions with the database including customer registration, login and product recommendation queries. The client side is used only to display this information to the customers ensuring a higher degree of security.
The application has been developed with mobile first usability ensuring the pages are responsive to the size of screen the user is viewing it from. 

## The concept
Individual companies have their own product matching functionalities but users are limited to viewing products specific to that company. We took this idea and innovated this principle by creating a database of products from different brands, which allows the user to access the wider market using their preferences.

## The design
We designed the app based on the mobile-first approach as well as modern HTML5 tags, css and JavaScript functionality to enable responsive design. Accessibility was implemented throughout.

## Security
The application uses JWT with httpOnly cookies which has a good level of security
- Checks user is logged in: the main functionality of the application is only available to logged in users.
- Checks user is admin: admin user can delete users.
- Password hashing: in the database, passwords are hashed
- Strong password requirements: Passwords must be minimum 8 characters long, with at least one lowercase letter, one upercase letter, one numeric digit and one special character

### Work Methodology - Agile, Scrum and Kanban
We used different Agile approaches, such as Pair Programming, Kanban board, Version Control, Git

### Work Strategy and communication
We palnned regular meetings to update the rest of the team on our individual progress and to tackle some issues together. We used zoom for our face-to-face meetings and slack for ongoing communication. We also used a Trello board to visualise the work.

## Story Board
https://drive.google.com/file/d/1dDqBYnwczbdaLq7alTSVg0JuiTVv54MN/view?usp=sharing

## Sequens Diagram

https://docs.google.com/document/d/1l5RY8Xbn_-rmWz6I-bYxac5J2zvNPaic9hNbPIv_Q4A/edit?usp=sharing

## Flowchart

https://drive.google.com/file/d/1Skc22oSz2fSPJ9cKN9JLeeTFm5oMihLY/view?usp=sharing


