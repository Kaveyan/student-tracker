const { User, Faculty, Admin, Parent } = require('../model/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};



const registerUser = async (req, res) => {
  const { firstName, department, roleNumber, batch, email, password } = req.body;

  try {
    const user = await User.create({
      firstName,
      department,
      roleNumber,
      batch,
      email,
      password,
      role: 'student', // Explicitly set role to student
    });

    const token = generateToken(user._id, user.role);
    res.status(201).json({ 
      user: { ...user.toObject() }, 
      token 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const userModels = [
      { model: User, role: 'student' },
      { model: Faculty, role: 'faculty' },
      { model: Admin, role: 'admin' },
      { model: Parent, role: 'parent' }
    ];

    let authenticatedUser = null;
    let userRole = null;

    for (const { model, role } of userModels) {
      const user = await model.findOne({ email });

      if (user && user.password === password) {
        authenticatedUser = user;
        userRole = role;
        break;
      }
    }

    if (!authenticatedUser) {
      return res.status(401).json({ message: 'Invalid credentials. Please check your email and password.' });
    }

    // Assign role if missing in DB
    if (!authenticatedUser.role) {
      authenticatedUser.role = userRole;
      await authenticatedUser.save();
    }

    const token = generateToken(authenticatedUser._id, userRole);

    res.status(200).json({
      user: {
        name: authenticatedUser.firstName,
        role: authenticatedUser.role
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An unexpected error occurred during login' });
  }
};

// Register Faculty
const registerFaculty = async (req, res) => {
  const { firstName, lastName, department, roleNumber, domain, email, password } = req.body;

  try {
    const faculty = await Faculty.create({
      firstName,
      lastName,
      department,
      roleNumber,
      domain,
      email,
      password, // No password hashing
      role: 'faculty', // Explicitly set role to faculty
    });

    const token = generateToken(faculty._id, faculty.role);
    res.status(201).json({ 
      faculty: { ...faculty.toObject() }, 
      token 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Register Admin
const registerAdmin = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      password, // No password hashing
      role: 'admin', // Explicitly set role to admin
    });

    const token = generateToken(admin._id, admin.role);
    res.status(201).json({ 
      admin: { ...admin.toObject() }, 
      token 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const registerParent = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const parent = await Parent.create({
      firstName,
      lastName,
      email,
      password, // No password hashing
      role: 'parent', // Explicitly set role to parent
    });

    const token = generateToken(parent._id, parent.role);
    res.status(201).json({ 
      parent: { ...parent.toObject() }, 
      token 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




module.exports = { registerUser, loginUser, registerFaculty, registerAdmin, registerParent };