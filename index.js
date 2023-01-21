const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('dotenv').config();
const keys = require('./config/keys');

// const cors = require('cors');
// const session = require('express-session');
// const proxy = require('./services/proxy');


require('./models/User');
require('./models/Blog');
require('./services/passport');
require('./services/cache');

const authRoute = require('./routes/authRoutes');
const blogRoute = require('./routes/blogRoutes');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { }, () => {
    console.log('mongodb connected')
});

const app = express();

// app.use(
//     cors({
//         origin: "*",
//         methods: "GET,POST,PUT,DELETE",
//         credentials: true
//     })
// )

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
      name: "session",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
  })  
)

// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: keys.cookieKey,
//   resave: false,
//   saveUninitialized: true
// }))

app.use(passport.initialize());
app.use(passport.session());


// require('./routes/authRoutes')(app);
// require('./routes/blogRoutes')(app);

// app.use('/', proxy);
app.use('/auth', authRoute);
app.use('/api', blogRoute);


// when we build the application of client end we need to
// specify it here
if (['production', 'ci'].includes(process.env.NODE_ENV)) {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port: `, PORT);
})