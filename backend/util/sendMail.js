import nodemailer from "nodemailer"

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        type:"OAuth2",
        user:process.env.MAIL_USERNAME,
        pass:process.envMAIL_PASSWORD,
        clientId:process.env.OAUTH_CLIENTID,
        clientSecret:process.env.OAUTH_CLIENT_SECRET,
        accessUrl:"https://developers.google.com/oauthplayground",
        accessToken:process.env.ACCESS_TOKEN,
        refreshToken:process.env.OAUTH_REFRESH_TOKEN

    }
})

transporter.sendMail({
    from:"agyanimitsolusions@gmail.com",
    to:`gideonokaiboateng@gmail.com`,
    subject:"space-note-app",
    text:`welcome`
},(err)=>{
    if (err){
        console.log(err.message);
    }
    else
    console.log("success");
})