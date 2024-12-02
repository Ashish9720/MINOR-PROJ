import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './cta.css';

const CTA1 = (props) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); 
  const fileInputRef = React.useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleOpenStreamlitApp = () => {
    const streamlitUrl = 'http://localhost:8501'; 
    window.open(streamlitUrl, '_blank'); 
  };

  return (
    <div className="thq-section-padding">
      <div className="thq-section-max-width">
        <div className="cta-accent2-bg">
          <div className="cta-accent1-bg">
            <div className="cta-container2">
              <div className="cta-content">
                <span className="thq-heading-2">{props.heading1}</span>
                <p className="thq-body-large">{props.content1}</p>
              </div>
              <div className="cta-actions">
                <input 
                  type="file" 
                  onChange={handleFileChange} 
                  ref={fileInputRef} 
                  className="file-input"
                  style={{ display: 'none' }} 
                />
                <button 
                  type="button" 
                  className="thq-button-filled cta-button" 
                  onClick={handleOpenStreamlitApp} // Opens the Streamlit app when clicked
                >
                  Check Database
                </button>

                {/* File preview section */}
                {previewUrl && (
                  <div className="file-preview">
                    {/* Handling image and PDF preview */}
                    {file?.type?.startsWith('image/') && (
                      <img src={previewUrl} alt="File Preview" className="preview-image" />
                    )}
                    {file?.type === 'application/pdf' && (
                      <iframe
                        src={previewUrl}
                        title="PDF Preview"
                        className="preview-pdf"
                        width="100%"
                        height="500px"
                      ></iframe>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CTA1.defaultProps = {
  content1: 'Check details about existing patients and their medical history',
  action1: 'Check database',
  heading1: 'Get Instant Analysis',
};

CTA1.propTypes = {
  content1: PropTypes.string,
  action1: PropTypes.string,
  heading1: PropTypes.string,
};

export default CTA1;
