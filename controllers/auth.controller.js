const User = require('../models/user.model');
const Token = require('../models/token.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_SECRET,
        { expiresIn: '7d' }
    );
    return { accessToken, refreshToken };
};

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userExist = await User.findOne({ username });
        if (userExist) return res.status(400).json({ message: 'Usuario ya existe' });
        const hash = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hash });
        await user.save();
        res.status(201).json({ message: 'Usuario creado' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Credenciales invalidas' });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: 'Credenciales invalidas' });
        const tokens = generateTokens(user);
        await Token.create({
            userId: user._id,
            refreshToken: tokens.refreshToken,
            expiresAt: new Date(Date.now() + 7*24*60*60*1000)
        });
        res.json({ ...tokens, user: { username: user.username, role: user.role }});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.sendStatus(401);
        const tokenDoc = await Token.findOne({ refreshToken });
        if (!tokenDoc) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, userData) => {
            if (err) return res.sendStatus(403);
            const user = await User.findById(userData.id);
            const tokens = generateTokens(user);
            await Token.create({
                userId: user._id,
                refreshToken: tokens.refreshToken,
                expiresAt: new Date(Date.now() + 7*24*60*60*1000)
            });
            res.json({ ...tokens });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        await Token.findOneAndDelete({ refreshToken });
        res.json({ message: 'Logout exitoso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

