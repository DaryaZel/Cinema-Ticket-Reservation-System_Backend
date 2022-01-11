import { processFileMiddleware } from "./middleware/middleware.js";
import { format } from "util";
import { Storage } from "@google-cloud/storage";

const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("cinema_images");

class Controller {
  async upload(req, res) {
    try {
      await processFileMiddleware(req, res);

      if (!req.file) {
        return res.status(400).json({ message: "Please upload a file!" });
      }

      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream.on("error", (err) => {
        res.status(500).json(error);
      });

      blobStream.on("finish", async () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        res.json(publicUrl);
      });

      blobStream.end(req.file.buffer);
    }
    catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new Controller();
