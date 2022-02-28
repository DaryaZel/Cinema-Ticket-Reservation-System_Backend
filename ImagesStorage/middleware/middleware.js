import util from 'util';
import multer from 'multer';

const maxSize = 3 * 1024 * 1024;

let processFile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single("file");

export let processFileMiddleware = util.promisify(processFile);

