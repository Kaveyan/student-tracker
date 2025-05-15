const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'student-tracker-admin',
  brokers: ['localhost:9092']
});

// Define all topics and their configurations
const topics = [
  {
    topic: 'student-points-updates',
    numPartitions: 3,  // For parallel processing
    replicationFactor: 1,  // Using 1 for local development
    config: {
      'retention.ms': '604800000' // 7 days retention
    }
  },
  {
    topic: 'student-activities',
    numPartitions: 3,
    replicationFactor: 1,
    config: {
      'retention.ms': '2592000000' // 30 days retention
    }
  },
  {
    topic: 'notifications',
    numPartitions: 3,
    replicationFactor: 1,
    config: {
      'retention.ms': '86400000' // 1 day retention
    }
  },
  {
    topic: 'performance-tracking',
    numPartitions: 3,
    replicationFactor: 1,
    config: {
      'retention.ms': '7776000000' // 90 days retention
    }
  },
  {
    topic: 'document-processing',
    numPartitions: 2,
    replicationFactor: 1,
    config: {
      'retention.ms': '2592000000' // 30 days retention
    }
  },
  {
    topic: 'batch-processing',
    numPartitions: 2,
    replicationFactor: 1,
    config: {
      'retention.ms': '2592000000' // 30 days retention
    }
  }
];

const setupTopics = async () => {
  const admin = kafka.admin();

  try {
    console.log('Connecting to Kafka...');
    await admin.connect();
    console.log('Connected to Kafka');

    // Get existing topics
    const existingTopics = await admin.listTopics();
    console.log('Existing topics:', existingTopics);

    // Filter out topics that already exist
    const topicsToCreate = topics.filter(t => !existingTopics.includes(t.topic));

    if (topicsToCreate.length === 0) {
      console.log('All topics already exist!');
      return;
    }

    console.log('Creating topics:', topicsToCreate.map(t => t.topic));
    await admin.createTopics({
      topics: topicsToCreate,
      waitForLeaders: true
    });

    console.log('Topics created successfully!');
  } catch (error) {
    console.error('Error setting up topics:', error);
    throw error;
  } finally {
    await admin.disconnect();
  }
};

// Export for use in server.js
module.exports = setupTopics;

// If running directly, execute setup
if (require.main === module) {
  setupTopics()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Failed to set up topics:', error);
      process.exit(1);
    });
}
