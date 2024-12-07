const mongoose = require('mongoose');

const projectTypeSchema = new mongoose.Schema({
    projectTypeName: { type: String, required: true },
});

module.exports = mongoose.model('ProjectType', projectTypeSchema);
