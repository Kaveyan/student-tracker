const { User } = require('../model/userModel');
const { sendMessage } = require('../config/kafka');

// Update student points
const updatePoints = async (req, res) => {
  try {
    const { studentId, category, points } = req.body;

    // Validate request
    if (!studentId || !category || points === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Update points in database
    const user = await User.findById(studentId);
    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update points in the specific category
    user.points[category] = (user.points[category] || 0) + points;
    
    // Recalculate total points
    const totalPoints = user.points.achievement + 
                       user.points.project + 
                       user.points.language + 
                       user.points.communication + 
                       user.points.certificate;

    // Save to database
    await user.save();

    // Send to Kafka for real-time updates
    await sendMessage('student-points-updates', {
      studentId,
      category,
      points,
      totalPoints,
      timestamp: new Date().toISOString()
    });

    // Send activity notification
    await sendMessage('student-activities', {
      studentId,
      type: 'points_update',
      details: {
        category,
        points,
        newTotal: totalPoints
      },
      timestamp: new Date().toISOString()
    });

    // Send performance tracking data
    await sendMessage('performance-tracking', {
      studentId,
      metrics: {
        category,
        pointsChange: points,
        newTotal: totalPoints
      },
      timestamp: new Date().toISOString()
    });

    res.json({
      message: 'Points updated successfully',
      points: user.points,
      total: totalPoints
    });

  } catch (error) {
    console.error('Error updating points:', error);
    res.status(500).json({ message: 'Error updating points' });
  }
};

// Get student performance summary
const getPerformanceSummary = async (req, res) => {
  try {
    const { studentId } = req.params;
    const user = await User.findById(studentId);
    
    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Calculate total points
    const totalPoints = user.points.achievement + 
                       user.points.project + 
                       user.points.language + 
                       user.points.communication + 
                       user.points.certificate;

    // Send activity for performance check
    await sendMessage('student-activities', {
      studentId,
      type: 'performance_check',
      timestamp: new Date().toISOString()
    });

    res.json({
      points: user.points,
      total: totalPoints
    });

  } catch (error) {
    console.error('Error getting performance:', error);
    res.status(500).json({ message: 'Error getting performance summary' });
  }
};

module.exports = {
  updatePoints,
  getPerformanceSummary
};
