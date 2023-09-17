import dotenv from "dotenv"
import passport from "passport"
import  passportGoogleOauth20 from "passport-google-oauth20"
const GoogleStrategy=passportGoogleOauth20.Strategy
dotenv.config()
// console.log(GoogleStrategy);
passport.use(new GoogleStrategy(
    {
    clientID: process.env.GOOGLE_AUTH_CLIENTID,
    clientSecret: process.env.GOOGLE_AUTH_SECRET,
    callbackURL: "http://127.0.0.1:5000/auth/google/callback",
    passReqToCallback   : true
},
(req, accessToken, refreshToken, profile, done)=> {
     done(null, profile);
}
));

passport.serializeUser((user, done) =>{
    done(null, user);
    });
    
    passport.deserializeUser((user, done) =>{
     done(null, user);
    });