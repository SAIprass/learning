const SendOtp = require('sendotp');

const mailotp = async() =>{
var otp = Math.random();
otp = otp*1000000;
otp = parseInt(otp)
//console.log("OTP",otp)
return otp
}
module.exports = { mailotp }