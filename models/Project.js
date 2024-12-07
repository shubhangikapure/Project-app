const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectReferenceNumber: { type: String, required: true },
    projectName: { type: String, required: true },
    projectType: { type: mongoose.Schema.Types.ObjectId, ref: 'ProjectType', required: true },
    status: { type: String, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
});

module.exports = mongoose.model('Project', projectSchema);
