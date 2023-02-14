
const uploadFile = require('../middlewares/uploadFiles');
const fs = require('fs');

module.exports = {

async download(req, res) {
  try {
    const file = req.params.file
    // Download function provided by express
    const targget = "../public" + '/' + file
    res.download(targget, function (err) {

      if (err) {
        console.log(err);
        return res.status(400).json({
          erro: true,
          mensagem: "Erro: Arquivo não pode ser encontrado!"
        });
      }
    })
    res.status(200).send(badge_identificado);
  } catch (e) {
      console.error(e)
  }      
},

async upload(req, res) {
  try {
    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);
      const hash = crypto.createHash('sha256');
      const finalHex = hash.update(fileBuffer).digest('hex');

      return res.json({
        erro: false,
        path: req.file.path,
        file: req.file.filename,
        hash_file: finalHex
      });
    }

    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Upload não realizado com sucesso!"
    });
  } catch (e) {
    console.error(e)
  }  
  }
}  
