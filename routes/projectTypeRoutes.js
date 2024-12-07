const express = require('express');
const ProjectType = require('../models/ProjectType');
const router = express.Router();

// Get all project types
router.get('/project-types', async (req, res) => {
    try {
        const projectTypes = await ProjectType.find();
        res.json(projectTypes);
    } catch (err) {
        console.error('Error fetching project types:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
