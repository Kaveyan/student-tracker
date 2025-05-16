const { project, language, ps, certificate, clanguage, achivement } = require('../model/upload');
const authMiddleware = require('../middleware/authMiddleware');
const { User,Faculty } = require('../model/userModel');
// Ensure authconst { Faculty } = require('../model/userModel');Middleware is applied to these routes to set req.userId

const uploadproject = async (req, res) => {
    const { title, description, domain, proof } = req.body;
    const userId = req.userId; // From auth middleware

    try {
        const newProject = await project.create({ userId, title, description, domain, proof });
        res.status(201).json(newProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const uploadlanguage = async (req, res) => {
    const { name, proof } = req.body;
    const userId = req.userId; 

    try {
        const newLanguage = await language.create({ userId, name, proof });
        res.status(201).json(newLanguage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const uploadps = async (req, res) => {
    const { name } = req.body;
    const userId = req.userId; 
    try {
        const newPs = await ps.create({ userId, name });
        res.status(201).json(newPs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const uploadcertificate = async (req, res) => {
    const { title, domain, proof } = req.body;
    const userId = req.userId; // From auth middleware

    try {
        const newCertificate = await certificate.create({ userId, title, domain, proof });
        res.status(201).json(newCertificate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const uploadclanguage = async (req, res) => {
    const { name, proof } = req.body;
    const userId = req.userId; // From auth middleware

    try {
        const newClanguage = await clanguage.create({ userId, name, proof });
        res.status(201).json(newClanguage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const uploadachivement = async (req, res) => {
    const { eventname, proof } = req.body;
    const userId = req.userId; // This should now be correctly set by authMiddleware
  
    try {
      const newAchivement = await achivement.create({ userId, eventname, proof });
      res.status(201).json(newAchivement);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

 
const list = async (req, res) => {
  const { sortBy = 'total' } = req.query;

  try {
    // Fetch all users and sort by the chosen category
    const users = await User.find({})
      .select('firstName lastName email roleNumber points') // Select only needed fields
      .lean();

    // Sort users by requested category (descending order)
    users.sort((a, b) => (b.points?.[sortBy] || 0) - (a.points?.[sortBy] || 0));

    // Assign ranks based on sorted position
    const rankedUsers = users.map((user, index) => ({
      ...user,
      rank: index + 1
    }));

    res.json(rankedUsers);
  } catch (error) {
    console.error('Error fetching user rankings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getFacultyDomainData = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.userId).select('domain');
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    let data;
    switch (faculty.domain) {
      case 'language':
        data = await language.find({ verify: false }).populate('userId', 'firstName roleNumber');
        break;
      case 'project':
        data = await project.find({ verify: false }).populate('userId', 'firstName roleNumber');
        break;
      case 'achievement':
        data = await achivement.find({ verify: false }).populate('userId', 'firstName roleNumber');
        break;
      case 'communication language':
        data = await clanguage.find({ verify: false }).populate('userId', 'firstName roleNumber');
        break;
      case 'certificate':
        data = await certificate.find({ verify: false }).populate('userId', 'firstName roleNumber');
        break;
      default:
        return res.status(400).json({ message: 'Invalid domain' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching domain-specific data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// In your backend (uploadcontroller.js or relevant controller file)

const updateVerificationStatus = async (req, res) => {
  console.log('req.user:', req.user); // Add this line to debug

  if (!req.user || !req.user.domain) {
    return res.status(400).json({ message: 'Invalid user domain' });
  }

  const { id } = req.params;
  const { verify } = req.body;

  try {
    const model = determineModel(req.user.domain);
    const updatedData = await model.findByIdAndUpdate(id, { verify }, { new: true });

    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.json({ message: 'Verification status updated successfully', data: updatedData });
  } catch (error) {
    console.error('Error updating verification status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// A helper function to determine the correct model based on the domain
function determineModel(domain) {
  switch (domain) {
    case 'language':
      return language;
    case 'project':
      return project;
    case 'achievement':
      return achivement;
    case 'communication language':
      return clanguage;
    case 'certificate':
      return certificate;
    default:
      throw new Error('Invalid domain');
  }
}

const Rank=async (req, res) => {
  const sortBy = req.query.sortBy || 'total'; // Default to total points if not specified

  try {
    // Find all users and sort by the specified category (achievement, certificate, etc.)
    const users = await User.find().sort({ [`points.${sortBy}`]: -1 });
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server Error' });
  }
}



module.exports = { uploadachivement, uploadcertificate, uploadclanguage, uploadlanguage, uploadproject, uploadps, list,getFacultyDomainData,updateVerificationStatus,Rank };
