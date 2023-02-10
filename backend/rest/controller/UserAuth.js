const User = require('../models/user')
const crypto = require('crypto');
const short = require('short-uuid');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const refreshList = {};
dotenv.config();

const addToList = async (refreshToken, token) => {
  refreshList[refreshToken] = {
    status: 'loggedin',
    token: token,
    refreshtoken: refreshToken,
  };
}

const generateRefreshToken = async (username, email, level) => {
  return jwt.sign(
    { user: username, email: email, level: level },
    process.env.SECRET_RTOKEN,
    {
      expiresIn: '30d',
    }
  );
}

const generateAccessToken = async (username, email, level) => {
  // console.log(process.env.SECRET_TOKEN);

  return jwt.sign(
    { user: username, email: email, level: level },
    process.env.SECRET_TOKEN,
    {
      expiresIn: '4h',
    }
  );
}

module.exports = {
  async login(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    try {
      const user = await User.findOne({ where: { email } })
      hash = crypto.pbkdf2Sync(password, user.pass_salt, 1000, 64, `sha512`).toString(`hex`);

      if (hash === user.pass_hash) {
        const token = await generateAccessToken(user.username, user.email, user.level);
        req.token = token;
        const refreshToken = await generateRefreshToken(
          user.username,
          user.email,
          user.level
        );
        console.log(refreshToken);
        req.refreshToken = refreshToken;
        req.content = {
          user: user.username,
          email: user.email,
          level: user.level,
        };
        req.token = token;
        req.refreshToken = refreshToken;
        await addToList(refreshToken, token);

        const data = {
          "access_token": token,
          "expires_in": 14400,
          "token_type": "Bearer",
          "level": user.level,
          "entity_id": user.entity_id,
          "refresh_token": refreshToken
        }
        res.status(200).json(data)
      } else {
        res.status(201).json({ result: "password or user problem" })
      }
    } catch (e) {
      res.status(400).json({ result: false })
    }      
  },
  async verifyToken(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      console.log("token->", token);
      
      return res.status(403).send('A token is required for authentication');
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      req.decoded = decoded;
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }
  },
  
  async RefreshToken(req, res) {
    const postData = req.body;

    if (postData.refreshToken && postData.refreshToken in refreshList) {
      const decoded = jwt.verify(
        postData.refreshToken,
        process.env.SECRET_RTOKEN
      );

      const token = await generateAccessToken(
        decoded.user,
        decoded.email,
        decoded.level
      );
      const refreshToken = await generateRefreshToken(
        decoded.user,
        decoded.email,
        decoded.level
      );
      req.content = {
        user: decoded.user,
        email: decoded.email,
        level: decoded.level,
      };
      req.token = token;
      req.refreshToken = refreshToken;

      await addToList(refreshToken, token);

      const data = {
        "access_token": token,
        "expires_in": 14400,
        "token_type": "Bearer",
        "level": decoded.level,
        "refresh_token": refreshToken
      }
      res.status(200).json(data)
    } else {
      return res.status(401).send("Invalid Token");
    }
  }
}      