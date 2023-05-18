const mongoose = require('mongoose');
const { Schema } = mongoose;

const portfolioSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  currentPosition: {
    type: String,
    required: true,
  },
  skills: [
    {
      skill: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

const portfolioModel = mongoose.model('bio', portfolioSchema);
module.exports = portfolioModel;
