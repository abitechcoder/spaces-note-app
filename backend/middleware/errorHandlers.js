export class APIErrors extends Error{
    constructor(message,status){
        super(message)
        this.status=status
    }

    static notFound=(message)=>{
        return new this(message ||"Not Found!",404)
    }
    static invalidRequest(message){
        return new this(message||"You have entered invalid credentials!",400)
    }
    static unAuthorize(message){
        return new this(message||"You are not allowed to access this route!",401)
    }
    static unAuthenticated(message){
        return new this(message||"You are not a valid user!",403)
    }
    // static duplicatePossible(message){
    //     return new this(message||"Account Already exist",404)
    // }
    static customError(message){
        return new this(message||"Unknown error!",500)
    }
}

