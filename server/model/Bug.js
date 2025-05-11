const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: { type: String, enum: ['Pending', 'Fixed'], default: 'Pending' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    project: { type: String, required: true, trim: true },
    assignedTo: { type: String, trim: true }  // or ObjectId ref in the future
  }, { timestamps: true });
  

const Bug = mongoose.model('Bug', bugSchema);
module.exports = Bug;