const fs = require("fs") // sistema de arquivos ler, criar, atualizar, exc e renomear
const path = require("path")
const uploadConfig = require("../configs/upload")

class DiskStorage {
  async saveFile(file) {    
    await fs.promises.rename(   //rename pode ser usado para renomear ou mover arquivos
      path.resolve(uploadConfig.TMP_FOLDER, file), 
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )

    return file
  }
  
  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

    try {
      await fs.promises.stat(filePath) // retora o status do arquivo
    } catch (error) {
      return
    }

    await fs.promises.unlink(filePath) // remove o arquivo
  }
}

module.exports = DiskStorage
