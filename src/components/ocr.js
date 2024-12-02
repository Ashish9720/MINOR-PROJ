// src/components/OCRScanner.js

import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const OCRScanner = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleExtractText = () => {
    if (!image) return;

    setLoading(true);
    Tesseract.recognize(
      image,
      'eng',
      {
        logger: (m) => console.log(m), // Log progress
      }
    )
      .then(({ data: { text } }) => {
        setText(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Upload Medical Report</h2>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={handleExtractText} disabled={loading}>
        {loading ? 'Extracting...' : 'Extract Text'}
      </button>
      {text && (
        <div>
          <h3>Extracted Text:</h3>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default OCRScanner;
