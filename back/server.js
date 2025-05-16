const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./router/userRouter');
const UploadRouter = require("./router/uploadRouter");
const rankingRouter = require('./router/rankingRouter');
const cors = require('cors');

require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
require('./config/passport'); // import passport config


const app = express();
const port = process.env.PORT || 3001; // Changed to 3001 to avoid conflicts

app.use(express.json());
app.use(cors());


// Start server function
const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://kaveyanb:0FIB2MYl2jW5MT2e@cluster0.5zq3aju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB Atlas');

    // Start the server
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);

    });

    // Handle server errors
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        process.exit(1);
      } else {
        console.error('Server error:', error);
      }
    });

    // Handle process termination
    process.on('SIGTERM', () => {
      console.log('Received SIGTERM. Performing graceful shutdown...');
      server.close();
      process.exit(0);
    });

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};


app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth route
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback URL
app.get('/auth/google/callback',
  passport.authenticate('google', { 
    failureRedirect: 'http://localhost:3000/login',
    session: false 
  }),
  (req, res) => {
    try {
      const { token, user } = req.user;
      
      // Redirect to frontend with token & role
      res.redirect(`http://localhost:3000/oauth-success?token=${token}&role=${user.role}&name=${encodeURIComponent(user.name)}`);
    } catch (error) {
      console.error('Callback error:', error);
      res.redirect('http://localhost:3000/login?error=auth_failed');
    }
  }
);

// Set up routes
app.use('/users', userRouter);
app.use('/upload', UploadRouter);
app.use('/rankings', rankingRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
startServer();
