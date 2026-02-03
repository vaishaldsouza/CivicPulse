const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Issue = require('../models/Issue');

router.post('/create', async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    await newIssue.save();

    // Gamification: Award 10 points for reporting an issue
    if (req.body.email) {
      await User.findOneAndUpdate(
        { email: req.body.email },
        { $inc: { points: 10 } }
      );
    }

    res.status(201).json(newIssue);
  } catch (err) {
    res.status(500).json({ msg: "Failed to create issue" });
  }
});

router.get('/all', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch issues" });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedIssue);
  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
});

router.post('/:id/message', async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ msg: "Issue not found" });

    issue.comments.push({
      text: req.body.text,
      sender: req.body.sender,
      timestamp: new Date()
    });

    await issue.save();
    res.json(issue);
  } catch (err) {
    res.status(500).json({ msg: "Messaging failed" });
  }
});

router.post('/:id/upvote', async (req, res) => {
  try {
    const { userId } = req.body;
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ msg: "Issue not found" });

    // Check if user already upvoted
    const index = issue.likedBy.indexOf(userId);
    if (index === -1) {
      // Upvote
      issue.upvotes += 1;
      issue.likedBy.push(userId);
    } else {
      // Undo Upvote (Toggle)
      issue.upvotes -= 1;
      issue.likedBy.splice(index, 1);
    }

    await issue.save();
    res.json(issue);
  } catch (err) {
    res.status(500).json({ msg: "Upvote failed" });
  }
});

module.exports = router;