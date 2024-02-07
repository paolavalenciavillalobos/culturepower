import multer, { diskStorage } from "multer"
import { randomUUID } from "crypto"

const multerConfig = diskStorage({
  name(req, file, callback) {
    const extension = file.mimetype.split("/")[1]
    const filename = `${randomUUID()}.${extension}`
    callback(null, filename)
  },
  folderDestination(req, file, callback) {
    callback(null, "../../uploads")
  }
})

export const multerMiddleware = multer({ storage: multerconfig })