import multer from 'fastify-multer';
import path from 'path/win32';
export const profileUpload = multer(
    {storage: multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // directory to save
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
})});