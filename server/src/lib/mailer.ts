const nodemailer = require("nodemailer");

 export const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'navaneetha2006krishnan@gmail.com', 
            pass: 'gfcy heas esur lyye'
        }
    });