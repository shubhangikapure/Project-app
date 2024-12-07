const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // Needed for parsing request bodies
const PORT = 6000;

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/projectDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Models
const ProjectSchema = new mongoose.Schema({
    referenceNumber: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    customer: { type: String, required: true },
});
const Project = mongoose.model('Project', ProjectSchema);

// Routes
// Get all projects
app.get('/ReadallProjects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Create a new project
app.post('/Createprojects', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create project', details: err });
    }
});

// Update an existing project
app.put('/UpdateProjects/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Return the updated document and validate
        );
        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update project', details: err });
    }
});

// Delete a project
app.delete('/DeleteProjects/:id', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete project', details: err });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
