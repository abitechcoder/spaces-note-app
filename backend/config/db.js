import {connect} from "mongoose"
//function to get connection from mongodb database
const connection= async(url)=>{
   try {
    await connect(url)
    console.log("database connection successful");
   } catch (error) {
    console.log(error.message);
   }

}

export default connection