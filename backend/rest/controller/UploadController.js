const upload = require("../middlewares/upload-middleware");
const util = require("util");
const fs = require('fs');
const crypto = require('crypto');

exports.uploadSingle = (req, res) => {
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
  } catch (e) {
    console.error(e)
  }
}

exports.downloadSingle = (req, res) => {
  try {
    const file = req.params.file
    const targget = "./public/uploads" + '/' + file
    res.download(targget, function (err) {

      if (err) {
        console.log(err);
        return res.status(400).json({
          erro: true,
          mensagem: "Erro: Arquivo não pode ser encontrado!"
        });
      }
    })
  } catch (e) {
    console.error(e)
  }
}

