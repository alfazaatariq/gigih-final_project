import { Router } from 'express';
import {
  getUserById,
  updateProfilePicture,
} from '../controllers/controllers.js';
import multer from 'multer';

const router = Router();

//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `/files/${file.originalname}`);
  },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
  if (
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
};

const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1024 * 1024, // 1mb
  },
  fileFilter: multerFilter,
});

router.post('/:_id', getUserById);
router.put(
  '/profile-picture/:_id',
  upload.single('profilePicture'),
  updateProfilePicture
);

export default router;
