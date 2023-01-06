const upload = require("../middlewares/upload-middleware");
const util = require("util");
const fs = require('fs');
const crypto = require('crypto');

exports.uploadSingle = (req, res) => {
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
}

exports.downloadSingle = (req, res) => {
    const file = req.params.file

    // Download function provided by express
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
}

// exports.uploadMultiple = (req, res) => {
//     if (req.files.length) {
//         console.log(req.files)

//         req.flash('success', 'Files Uploaded.');
//     }
//     return res.redirect('/');
// }

// exports.uploadSingleV2 = async (req, res) => {
//     const uploadFile = util.promisify(upload.single('file'));
//     try {
//         await uploadFile(req, res);
//         console.log(req.file)
        
//         req.flash('success', 'File Uploaded.');
//     } catch (error) {
//         console.log(error)
//     }
//     return res.redirect('/');
// }