import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Home from './views/home';
import CTA from './components/cta';
import PreviewPage from './components/PreviewPage';  
import ReactDOM from 'react-dom';
import './style.css';

// Main App Component
const App = () => {
  const [uploadedFile, setUploadedFile] = useState(null);  // Holds uploaded file info
  const [previewUrl, setPreviewUrl] = useState('');        // URL for file preview
  const [fileType, setFileType] = useState('');            // File type (image/pdf)

  // Handle file upload and preview (this could be from CTA or any other component)
  const handleFileUpload = (file) => {
    const url = URL.createObjectURL(file);
    setUploadedFile(file);
    setPreviewUrl(url);
    setFileType(file.type);
  };

  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={<Home />} />
        
        {/* CTA Page with File Upload */}
        <Route path="/cta" element={<CTA handleFileUpload={handleFileUpload} />} />
        
        {/* Preview Page Route - passing file info as state */}
        <Route 
          path="/preview" 
          element={<PreviewPage previewUrl={previewUrl} fileType={fileType} />} 
        />
        
        {/* Default route (redirects to home if no matching route found) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

// Render the App
ReactDOM.render(<App />, document.getElementById('app'));

