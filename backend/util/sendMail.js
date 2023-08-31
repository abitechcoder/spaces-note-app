import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

export const sendEmail=async(userEmail)=>{
    
    const USER=process.env.MAIL_USERNAME
    const PASS=process.env.MAIL_PASSWORD
    const CLIENTID=process.env.OAUTH_CLIENTID
    const CLIENTSECRET=process.env.OAUTH_CLIENT_SECRET
    const ACCESSTOKEN=process.env.ACCESS_TOKEN
    const REFRESHTOKEN=process.env.OAUTH_REFRESH_TOKEN
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            type:"OAuth2",
            user:USER,
            pass:PASS,
            clientId:CLIENTID,
            clientSecret:CLIENTSECRET,
            accessToken:ACCESSTOKEN,
            refreshToken:REFRESHTOKEN
    
        }
    })
    const mailMessage={
        from:"agyanimitsolusions@gmail.com",
        to:`${userEmail}`,
        subject:"space-note-app",
        text:`Hi, you have successfully created an account with us.`
    }
   transporter.sendMail(mailMessage,(err,mail)=>{
        if (err){
            console.log(err.message);
        }
        console.log("email notification sent successfully");
    })
}

    