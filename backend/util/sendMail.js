import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { google } from "googleapis";
dotenv.config();

// sending email notification function
export const sendEmail = async (userEmail) => {
	const USER = process.env.MAIL_USERNAME;
	const PASS = process.env.MAIL_PASSWORD;
	const CLIENTID = process.env.OAUTH_CLIENTID;
	const CLIENTSECRET = process.env.OAUTH_CLIENT_SECRET;
	const REFRESHTOKEN = process.env.OAUTH_REFRESH_TOKEN;
	const REDIRECTURL = process.env.REDIRECT_URL;
	try {
		// setting up google oauth2 credentiala to get an access token
		const oAuth2Client = new google.auth.OAuth2(
			CLIENTID,
			CLIENTSECRET,
			REDIRECTURL
		);
		// getting the access token function
		const accessToken = oAuth2Client.setCredentials({
			refresh_token: REFRESHTOKEN,
			
		});
		// setting up email transport
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: USER,
				pass: PASS,
				clientId: CLIENTID,
				clientSecret: CLIENTSECRET,
				accessToken: accessToken,
				refreshToken: REFRESHTOKEN,
			},
		});
		// email message
		const mailMessage = {
			from: "spacenoteapp7@gmail.com",
			to: `${userEmail}`,
			subject: "space-note-app",
			text: `Hi, you have successfully created an account with us.`,
		};
		// sending email
		transporter.sendMail(mailMessage, (err) => {
			if (err) {
				console.log(err.message);
			} else console.log("email notification sent successfully");
		});
	} catch (error) {
		console.log(error.message);
	}
};
