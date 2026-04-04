const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');

// Access: admin only
const createAgent = async (req, res) => {
  try {
    const { name, email, password, skills } = req.body;
    if (!name || !email || !password || !skills) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const validSkills = [
      'network_issue',
      'billing_issue',
      'login_problem',
      'payment_issue',
      'technical_bug',
    ];

    const invalidSkills = skills.filter((s) => !validSkills.includes(s));
    if (invalidSkills.length > 0) {
      return res.status(400).json({
        message: `Invalid skills: ${invalidSkills.join(', ')}`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'agent',
      skills,
    });
    res.status(201).json({
      message: 'Agent created successfully',
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        role: agent.role,
        skills: agent.skills,
      },
    });

  } catch (error) {
    console.error('createAgent error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAgents = async (req, res) => {
  try {
    // fetch all agents, exclude password field
    const agents = await User.find({ role: 'agent' }).select('-password');

    res.status(200).json({
      count: agents.length,
      agents,
    });

  } catch (error) {
    console.error('getAllAgents error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createAgent, getAgents };