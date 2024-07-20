const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Team = require('../models/TeamModel');

// Register a new team member
const registerTeam = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        // Check if team member already exists
        const existingTeamMember = await Team.findOne({ email });
        if (existingTeamMember) {
            return res.status(400).json({ message: 'Team member already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new team member
        const newTeamMember = new Team({
            name,
            email,
            password: hashedPassword,
            phone,
            role
        });

        await newTeamMember.save();
        res.status(201).json({ message: 'Team member registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login team member
const loginTeam = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if team member exists
        const teamMember = await Team.findOne({ email });
        if (!teamMember) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, teamMember.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { id: teamMember._id, name: teamMember.name, role: teamMember.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerTeam, loginTeam };
