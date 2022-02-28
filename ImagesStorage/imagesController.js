import { processFileMiddleware } from "./middleware/middleware.js";
import { Storage } from "@google-cloud/storage";
import { AppError } from '../Errors/AppError.js';
import { BadRequestParametersError } from '../Errors/BadRequestParametersError.js';

const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("cinema_images");

class ImagesController {

  async upload(req, res) {
    try {
      await processFileMiddleware(req, res);

      if (!req.file) {
        throw new BadRequestParametersError('Please upload a file');
      }

      const file = bucket.file(req.file.originalname);
      const fileStream = file.createWriteStream({
        resumable: false,
      });

      fileStream.on("error", (err) => {
        res.status(500).json(err);
      });

      fileStream.on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
        res.json(publicUrl);
      });

      fileStream.end(req.file.buffer);
    }
    catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json(error.message);
    }
    else {
        return res.status(500).json(error);
    }
    }
  }
}

export default new ImagesController();
