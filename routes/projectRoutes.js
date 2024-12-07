const express = require('express');
const Project = require('../models/Project');
const router = express.Router();

// Create a project
router.post('/', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('projectType', 'projectTypeName')
            .populate('customer', 'customerName');
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a project
router.put('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a project
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 