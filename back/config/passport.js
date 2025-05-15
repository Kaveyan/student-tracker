const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User, Faculty, Admin, Parent } = require('../model/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;

  const userModels = [
    { model: User, role: 'student' },
    { model: Faculty, role: 'faculty' },
    { model: Admin, role: 'admin' },
    { model: Parent, role: 'parent' }
  ];

  let foundUser = null;
  let userRole = null;

  for (const { model, role } of userModels) {
    const user = await model.findOne({ email });
    if (user) {
      foundUser = user;
      userRole = role;
      break;
    }
  }

  if (!foundUser) return done(null, false); // Not found

  const jwtToken = generateToken(foundUser._id, userRole);

  const userInfo = {
    token: jwtToken,
    user: {
      name: foundUser.firstName,
      role: userRole,
      email,
    }
  };

  done(null, userInfo);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
