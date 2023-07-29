import * as JWT from 'jsonwebtoken'
import * as CryptoJS from 'crypto-js'
import { User } from '../entity/User';
class Helpers {
     generateAccessToken (user : User)  {
        return JWT.sign({ name: user.email, ...user },process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn : "365d"})
    }
     generateRefreshToken (user : User) {
        return JWT.sign({ name: user.email, ...user },process.env.REFRESH_TOKEN_SECRET_KEY) 
    }
     passwordToHash  (password : string) {
        return CryptoJS.HmacSHA256(password, CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString()).toString();
    
    }
}

export default new Helpers()