const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const filePath = req.file.path;
  
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }
  
      let extractedText = '';
  
      if (req.file.mimetype.startsWith('image/')) {
        const result = await Tesseract.recognize(filePath, 'eng');
        extractedText = result.data.text;
      } else {
        return res.status(400).json({ success: false, message: 'Unsupported file type' });
      }
  
      // Clean up uploaded file
      fs.unlinkSync(filePath);
  
      // Send back the extracted text
      res.json({ success: true, text: extractedText });
    } catch (error) {
      console.error('Error processing file:', error); // Log the error for debugging
      res.status(500).json({ success: false, message: 'Error processing file', error: error.message });
    }
  });
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
