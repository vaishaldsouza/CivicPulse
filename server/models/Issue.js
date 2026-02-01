const mongoose = require('mongoose');

const issueSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Infrastructure', 'Lighting', 'Sanitation', 'Water Supply', 'Public Amenities', 'Others']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved'],
        default: 'Open'
    },
    location: {
        type: String,
        default: 'Unknown Location'
    },
    priority: {
        type: String,
        enum: ['Critical', 'High', 'Medium', 'Low'],
        default: 'Medium'
    },
    coordinates: {
        type: [Number], // [lat, lng]
        required: false
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Issue', issueSchema);
