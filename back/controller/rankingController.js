const { User } = require('../model/userModel');

// Update student ranking
const updateStudentRanking = async (req, res) => {
  try {
    const { studentId, rank, category } = req.body;

    if (!studentId || !rank || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Update the ranking directly in the database
    const user = await User.findById(studentId);
    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Initialize rankings if they don't exist
    if (!user.rankings) {
      user.rankings = new Map();
    }

    // Update the ranking
    user.rankings.set(category, rank);
    await user.save();

    res.json({ 
      message: 'Ranking updated successfully',
      rankings: Object.fromEntries(user.rankings)
    });
  } catch (error) {
    console.error('Error updating ranking:', error);
    res.status(500).json({ message: 'Error updating ranking' });
  }
};

// Get student rankings
const getStudentRankings = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await User.findById(studentId);
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ rankings: student.rankings || {} });
  } catch (error) {
    console.error('Error fetching rankings:', error);
    res.status(500).json({ message: 'Error fetching rankings' });
  }
};

module.exports = {
  updateStudentRanking,
  getStudentRankings
};
