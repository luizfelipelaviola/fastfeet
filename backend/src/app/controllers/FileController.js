import File from '../models/File';

class FileController {
  async store(req, res) {
    // Get information from original file sent by user
    const { originalname: name, filename: path } = req.file;

    // Create database reference to storage file
    const file = await File.create({
      name,
      path,
    });

    // Return new data
    return res.json(file);
  }
}

export default new FileController();
