const User = require('../models/user');
const crypto = require('crypto');
const short = require('short-uuid');

module.exports = {
  async create(req, res) {
    try {

      let username = req.body.username;
      let email = req.body.email;
      let type = req.body.type;
      let image = req.body.image;
      let password = req.body.password;
      let level = req.body.level;

      const user = await User.findOne({ where: { email } })
      if (user) {
        res.status(401).json({ message: "Já existe um usuario com este email" })
      } else {
        
        //    const entity_id = String(crypto.randomUUID());

        let entity_id  = String(short.generate());

        const pass_salt = crypto.randomBytes(12).toString('hex');       
        const pass_hash = crypto.pbkdf2Sync(password, pass_salt, 1000, 64, `sha512`).toString(`hex`);

        const user = await User.create({ username, email, type, image, pass_hash, pass_salt, entity_id, level })
        res.status(200).json({ user })
      }
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  async update_password(req, res) {
    try {
      const { id } = req.params
      let password = req.body.password;
      const user = await User.findOne({ where: { id } })
      if (!user) {
        res.status(401).json({ message: "Nenhum usuario encontrado" })
      } else {
        const pass_salt = crypto.randomBytes(12).toString('hex');   
        const pass_hash = crypto.pbkdf2Sync(password, pass_salt, 1000, 64, `sha512`).toString(`hex`);
        const user = await User.update({ pass_salt, pass_hash }, { where: { id } })
        res.status(200).json({ result:true })
      }
    } catch (error) {
      res.status(400).json({ result:false })
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params
      const { username, email, type, image, level } = req.body
      const user = await User.findOne({ where: { id } })
      if (!user) {
        res.status(401).json({ message: "Nenhum usuario encontrado" })
      } else {
        const user = await User.update({ username, email, type, image, level }, { where: { id } })
        res.status(200).json({ user })
      }
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  async list(req, res) {
    try {
      const usuarios = await User.findAll()
      if (!usuarios) {
        res.status(401).json({ message: 'Não existe usuario cadastrado' })
      }
      res.status(200).json({ usuarios })
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  async search(req, res) {
    const { entity_id } = req.params
    const usuario = await User.findOne({ where: { entity_id } })
    if (!usuario) {
      res.status(401).json({ message: 'Usuario não encontrado' })
    } else {
      res.status(200).json({ usuario })
    }
  },
  async delete(req, res) {
    const { id } = req.params
    const user = await User.findOne({ where: { id } })
    if (!user) {
      res.status(401).json({ message: 'Usuario não encontrado' })
    } else {
      await User.destroy({ where: { id } })
      res.status(200).json({ ok: true })
    }
  },
  async test(req, res) {
    let id = req.body.id;
    let password = req.body.password;
    const user = await User.findOne({ where: { id } })
    hash = crypto.pbkdf2Sync(password, user.pass_salt, 1000, 64, `sha512`).toString(`hex`);

    if (hash === user.pass_hash) {
      res.status(200).json({result : true})
    } else {
      res.status(200).json({result : false})
    }
  }
}