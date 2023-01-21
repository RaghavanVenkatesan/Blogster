module.exports = {
    // googleClientID:
    // '577129237751-a12d41r0c7moj03ukru4gs0603mtcoj8.apps.googleusercontent.com',
    // googleClientSecret: 'IE4qvOzcljxwpKei7CJJBTvj',
    // mongoURI: 'mongodb+srv://Rock:Rock3160@first.pfkl6c5.mongodb.net/advance?retryWrites=true&w=majority',
    // cookieKey: '123123123',
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
  };