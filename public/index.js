const form = document.getElementById("contact-form");

const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  let mail = new FormData(form);
  sendMail(mail);
});

const sendMail = (mail) => {
  fetch("/ContactUsTutorial/send", {
    method: "post",
    body: mail,
    redirect: 'follow',
  }).then((response) => {
  
     if(response.status === 200) {
       // Good path
         window.location.href = "/ContactUsTutorial";
         //create submitted page here with link to home
     } else {
       //Bad path
       window.location.href = "/bad-submit";
       //create something has gone wrong page
     }
    
  
  });
};



