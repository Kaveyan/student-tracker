const { subscribeToTopic } = require('../config/kafka');
const { User } = require('../model/userModel');

// Initialize all Kafka consumers
const initializeKafkaConsumers = async () => {
  const topics = [
    {
      name: 'student-points-updates',
      handler: async (message) => {
        const { studentId, category, points } = message;
        await User.findByIdAndUpdate(studentId, {
          [`points.${category}`]: points
        });
        console.log(`Updated points for student ${studentId} in ${category}`);
      }
    },
    {
      name: 'performance-tracking',
      handler: async (message) => {
        const { studentId, metrics } = message;
        console.log(`Tracked performance for student ${studentId}:`, metrics);
      }
    },
    {
      name: 'notifications',
      handler: async (message) => {
        const { type, recipients, data, message: notificationMessage } = message;
        console.log(`Sending ${type} notification to ${recipients.join(', ')}: ${notificationMessage}`);
      }
    },
    {
      name: 'document-processing',
      handler: async (message) => {
        const { uploadId, studentId, status } = message;
        console.log(`Processing document ${uploadId} for student ${studentId}, status: ${status}`);
      }
    },
    {
      name: 'batch-processing',
      handler: async (message) => {
        const { type, rankings } = message;
        if (type === 'ranking_update') {
          for (const ranking of rankings) {
            await User.findByIdAndUpdate(ranking.studentId, {
              [`rankings.${ranking.category}`]: ranking.rank
            });
          }
          console.log(`Updated rankings for ${rankings.length} students`);
        }
      }
    },
    {
      name: 'student-activities',
      handler: async (message) => {
        const { studentId, type, details } = message;
        console.log(`Logged activity for student ${studentId}: ${type}`);
      }
    }
  ];

  let successCount = 0;
  for (const topic of topics) {
    try {
      const success = await subscribeToTopic(topic.name, topic.handler);
      if (success) {
        successCount++;
        console.log(`Successfully subscribed to ${topic.name}`);
      }
    } catch (error) {
      console.error(`Failed to subscribe to ${topic.name}:`, error);
    }
  }

  if (successCount === topics.length) {
    console.log('All Kafka consumers initialized successfully');
    return true;
  } else if (successCount > 0) {
    console.log(`Partially initialized Kafka consumers (${successCount}/${topics.length} topics)`);
    return true;
  } else {
    console.error('Failed to initialize any Kafka consumers');
    return false;
  }
};

module.exports = {
  initializeKafkaConsumers
};
