const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

// @desc    Get all issues
// @route   GET /api/issues
// @access  Public
router.get('/', async (req, res) => {
    try {
        const issues = await Issue.find().sort({ createdAt: -1 }); // Newest first
        res.json(issues);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a new issue
// @route   POST /api/issues
// @access  Public
router.post('/', async (req, res) => {
    const { title, category, description, coordinates, location, priority } = req.body;

    // Basic validation
    if (!title || !description || !category) {
        return res.status(400).json({ message: 'Please provide title, category, and description' });
    }

    try {
        const issue = new Issue({
            title,
            category,
            description,
            coordinates, // Expecting [lat, lng]
            location,    // Expecting string address
            status: 'Open',
            priority: priority || 'Medium',
            image: req.body.image
        });

        const createdIssue = await issue.save();
        res.status(201).json(createdIssue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update issue status
// @route   PATCH /api/issues/:id/status
// @access  Public (should be Admin/Official in future)
router.patch('/:id/status', async (req, res) => {
    const { status } = req.body;

    try {
        const issue = await Issue.findById(req.params.id);

        if (issue) {
            issue.status = status;
            const updatedIssue = await issue.save();
            res.json(updatedIssue);
        } else {
            res.status(404).json({ message: 'Issue not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
