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
    });

    const token = generateToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;
    switch (role) {
      case 'student':
        user = await User.findOne({ email });
        break;
      case 'faculty':
        user = await Faculty.findOne({ email });
        break;
      case 'admin':
        user = await Admin.findOne({ email });
        break;
      case 'parent':
        user = await Parent.findOne({ email });
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user || password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Include the role when generating the token
    const token = generateToken(user._id, role);

    res.status(200).json({ user: { name: user.firstName }, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    });

    const token = generateToken(faculty._id);
    res.status(201).json({ faculty, token });
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
    });

    const token = generateToken(admin._id);
    res.status(201).json({ admin, token });
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
    });

    const token = generateToken(parent._id);
    res.status(201).json({ parent, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




module.exports = { registerUser, loginUser, registerFaculty, registerAdmin, registerParent };