import multer, { diskStorage } from "multer"
import { randomUUID } from "crypto"
console.log('mensage')
const multerConfig = diskStorage({
  filename(req, file, callback) {
    const extension = file.mimetype.split("/")[1]
    const filename = `${randomUUID()}.${extension}`
    console.log(extension, filename)
    callback(null, filename)
  },
  destination(req, file, callback) {
    callback(null, './uploads')
  }
})

export const multerMiddleware = multer({ storage: multerConfig })