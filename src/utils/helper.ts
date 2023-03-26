import * as JWT from 'jsonwebtoken'
import * as CryptoJS from 'crypto-js'
const generateAccessToken = (user) => {
    return JWT.sign({ name: user.email, ...user },process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn : "1w"})
}
const generateRefreshToken = (user) => {
    return JWT.sign({ name: user.email, ...user },process.env.REFRESH_TOKEN_SECRET_KEY) 
}
const passwordToHash = (password) => {
    return CryptoJS.HmacSHA256(password, CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString()).toString();

}
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    passwordToHash
}