const User = require('../models/user')
module.exports = {
  async create(req, res) {
    try {
      const { name, email, type, image, pass_hash, pass_salt } = req.body
      const user = await User.findOne({ where: { email } })
      if (user) {
        res.status(401).json({ message: "Já existe um usuario com este email" })
      } else {
        const user = await User.create({ name, email, type, image, pass_hash, pass_salt, create_at, update_at, last_login })
        res.status(200).json({ user })
      }
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  async update(req, res) {
    try {
      const { entityId } = req.params
      const { name, email, type, image, pass_hash, pass_salt, last_login } = req.body
      const user = await User.findOne({ where: { entityId } })
      if (!user) {
        res.status(401).json({ message: "Nenhum usuario encontrado" })
      } else {
        const user = await User.update({ name, email, type, image, pass_hash, pass_salt, last_login }, { where: { entityId } })
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
        res.status(401).json({ message: 'Não existe usuario cadastros' })
      }
      res.status(200).json({ usuarios })
    } catch (error) {
      res.status(400).json({ error })
    }
  },
  async delete(req, res) {
    const { entityId } = req.params
    const user = await User.findOne({ where: { entityId } })
    if (!user) {
      res.status(401).json({ message: 'Usuario não encontrado' })
    } else {
      await User.destroy({ where: { entityId } })
      res.status(200).json({ ok: true })
    }
  }
}