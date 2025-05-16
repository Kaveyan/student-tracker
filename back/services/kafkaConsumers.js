// Kafka functionality is commented out
// const { subscribeToTopic } = require('../config/kafka');
// const { User } = require('../model/userModel');

// Dummy function that always returns true
const initializeKafkaConsumers = async () => true;

module.exports = {
  initializeKafkaConsumers
};
