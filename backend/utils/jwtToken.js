// export const generateToken = (user, message, statusCode, res) => {
//   const token = user.generateJsonWebToken();
//   res
//     .status(statusCode)
//     .cookie("token", token, {
//       expires: new Date(
//         Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//       ),
//       httpOnly: true,
//       sameSite: "None",
//       secure: "true",
//     })
//     .json({
//       success: true,
//       message,
//       user,
//       token,
//     });
// };



import jwt from "jsonwebtoken";

export const generateToken = (user, message, statusCode, res) => {
 
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE || "7d", 
  });

  
  const cookieExpire = process.env.COOKIE_EXPIRE
    ? Number(process.env.COOKIE_EXPIRE)
    : 7;

  
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "None",
      secure: "true",
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
