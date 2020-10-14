import React from 'react';
import { withAuthorization } from '../Session';
import Heading from '../General/Heading';

const nodemailer = require('nodemailer');


function Mail_send(){
  let transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
        user: 'testnodemailercssg@gmail.com', // generated ethereal user
        pass: 'Test123!'  // generated ethereal password
    },

  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <testnodemailercssg@gmail.com>', // sender address
      to: 'calciumphosphate0@gmail.com', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body

  };

  // send mail with defined transport object
   transporter.sendMail(mailOptions).then(function(response){
     console.log("email sent");
   })
   .catch(function(error){
     console.log("Error: ",error);
   });
}

function ContactUs() {


  return (
    <div>
      <section className="section is-white">
        <Heading>Contact Us</Heading>

    </section>
    </div>
  );
}

const condition = (authUser) => authUser != null;

export default withAuthorization(condition)(ContactUs);
