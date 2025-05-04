const mongoose = require('mongoose');
const User = require('./userModel');
const projectSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    domain: {
        type: String,
        required: [true, 'Please add a domain']
    },
    proof: {
        type: String,
        required: [true, 'Please add proof']
    },
    verify: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const languageSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    proof: {
        type: String,
        required: [true, 'Please add proof']
    },
    verify: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const psSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    verify: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const certificateSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    domain: {
        type: String,
        required: [true, 'Please add a domain']
    },
    proof: {
        type: String,
        required: [true, 'Please add proof']
    },
    verify: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const clanguageSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    proof: {
        type: String,
        required: [true, 'Please add proof']
    },
    verify: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const achievementSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventname: {
        type: String,
        required: [true, 'Please add an event name']
    },
    proof: {
        type: String,
        required: [true, 'Please add proof']
    },
    verify: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const project = mongoose.model('project', projectSchema);
const language = mongoose.model('language', languageSchema);
const ps = mongoose.model('ps', psSchema);
const certificate = mongoose.model('certificate', certificateSchema);
const clanguage = mongoose.model('clanguage', clanguageSchema);
const achivement = mongoose.model('achivement', achievementSchema);

module.exports = { project, language, ps, certificate, clanguage, achivement };
