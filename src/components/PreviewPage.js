import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Tesseract from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';
import './PreviewPage.css';
import { analyzeHealthData } from './HealthAnalysis'; 
import axios from 'axios';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PreviewPage = () => {
  const location = useLocation();
  const { previewUrl, fileType } = location.state || {};
  const [extractedText, setExtractedText] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    sex: '',
    hemoglobin: '',
    sugarLevel: '',
    age: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [healthAnalysis, setHealthAnalysis] = useState(null);

  // Helper function for text preprocessing
  const preprocessText = (text) => text.replace(/\s+/g, ' ').replace(/[\n\r]+/g, ' ').trim();

  // Function to extract relevant data using regex
  const extractRelevantData = (text) => {
    const cleanedText = preprocessText(text.toLowerCase());

    const sexOrGenderMatch = cleanedText.match(/(?:sex|gender)[:\s]*(male|female)/i);
    const hemoglobinMatch = cleanedText.match(/hemoglobin\s*\(photometry\)\s*(\d{1,2}\.\d{2})\s*g\/dl/i);
    const nameMatch = cleanedText.match(/name[:\s]*([a-z\s]+)/i);
    const sugarMatch = cleanedText.match(/(?:sugar level|blood sugar|glucose)[:\s]*([\d.]+)\s?mg\/?dl/i);
    const ageMatch = cleanedText.match(/age[:\s]*(\d+)/i);

    setFormData({
      name: nameMatch ? nameMatch[1].trim() : '',
      sex: sexOrGenderMatch ? sexOrGenderMatch[1] : '',
      hemoglobin: hemoglobinMatch ? hemoglobinMatch[1] : '',
      sugarLevel: sugarMatch ? sugarMatch[1] : '',
      age: ageMatch ? ageMatch[1] : '',
    });
  };

  // Function to upload the file and extract text via the backend API
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        setExtractedText(response.data.text);
        extractRelevantData(response.data.text); 
      } else {
        throw new Error('File upload failed');
      }
    } catch (err) {
      setError('Failed to process the file. Please try again.');
    }
  };

  // OCR processing based on the file type
  const startOCR = () => {
    setIsLoading(true);
    setError('');

    if (fileType.startsWith('image/')) {
      handleFileUpload(previewUrl);
    } else if (fileType === 'application/pdf') {
      handlePdfToText(previewUrl);
    } else {
      setError('Unsupported file type.');
      setIsLoading(false);
    }
  };

  // PDF to text conversion using Tesseract
  const handlePdfToText = async (url) => {
    try {
      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const canvas = document.createElement('canvas');
        const viewport = page.getViewport({ scale: 1.5 });
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        const imgData = canvas.toDataURL();
        const ocrResult = await Tesseract.recognize(imgData, 'eng');
        fullText += ocrResult.data.text + ' ';
      }

      setExtractedText(fullText);
      extractRelevantData(fullText);
    } catch (err) {
      setError('Failed to process PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Form data validation
  const validateFormData = () => {
    let validationErrors = {};

    if (!formData.name) validationErrors.name = 'Name is required';
    if (!formData.sex) validationErrors.sex = 'Sex is required';
    if (formData.hemoglobin && (formData.hemoglobin < 3 || formData.hemoglobin > 18))
      validationErrors.hemoglobin = 'Hemoglobin level should be between 3 and 18 g/dL';
    if (formData.sugarLevel && (formData.sugarLevel < 40 || formData.sugarLevel > 250))
      validationErrors.sugarLevel = 'Sugar level should be between 40 and 250 mg/dL';
    if (!formData.age || isNaN(formData.age) || formData.age < 0 || formData.age > 120)
      validationErrors.age = 'Please enter a valid age between 0 and 120';

    return validationErrors;
  };

  // Health analysis via SerpAPI and fallback local function
  // Function to analyze health using Serp API
  const analyzeHealth = async () => {
    try {
      const medicalCondition = `${formData.hemoglobin} hemoglobin and ${formData.sugarLevel} blood sugar`;
      const serpApiKey = 'YOUR_SERP_API_KEY';
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';  // Public CORS proxy
      const url = `https://serpapi.com/search.json?q=${encodeURIComponent(medicalCondition)}+treatment&api_key=${serpApiKey}`;
      
      const response = await axios.get(proxyUrl + url);
  
      if (response.data) {
        setHealthAnalysis({
          diagnosis: response.data.organic_results[0]?.title || 'Diagnosis not available',
          medicines: response.data.organic_results.map(result => result.snippet).slice(0, 3),
          dietPlan: response.data.organic_results[1]?.snippet || 'Diet plan not available',
        });
      } else {
        throw new Error('Failed to get health analysis from Serp API');
      }
    } catch (error) {
      console.error('Serp API call failed. Using local analysis.', error);
      const analysisResult = analyzeHealthData(formData); 
      setHealthAnalysis(analysisResult);
    }
  };
  


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFormData();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      analyzeHealth();
      setErrors({});
    }
  };

  // Download health analysis summary
  const downloadSummary = () => {
    if (!healthAnalysis) return;

    const summaryContent = `
      Name: ${formData.name}
      Age: ${formData.age}
      Sex: ${formData.sex}
      Hemoglobin: ${formData.hemoglobin} g/dL
      Sugar Level: ${formData.sugarLevel} mg/dL
      
      Health Recommendations:
      Diagnosis: ${healthAnalysis.diagnosis || 'N/A'}
      Recommended Medicines: ${healthAnalysis.medicines ? healthAnalysis.medicines.join(', ') : 'N/A'}
      Diet Plan: ${healthAnalysis.dietPlan || 'N/A'}
    `;

    const blob = new Blob([summaryContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'health_summary.txt';
    link.click();
  };

  return (
    <div className="preview-page-container">
  <div className="preview-left">
    {fileType.startsWith('image/') && <img src={previewUrl} alt="File Preview" className="preview-image" />}
    {fileType === 'application/pdf' && <iframe src={previewUrl} title="PDF Preview" className="preview-pdf" width="100%" height="500px"></iframe>}
    <button onClick={startOCR} disabled={isLoading} className="ocr-button">{isLoading ? 'Processing OCR...' : 'Start OCR'}</button>
    {error && <div className="error-message">{error}</div>}
  </div>

  <div className="preview-right">
    <h3>Extracted Information (Editable)</h3>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name"><strong>Name:</strong></label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="sex"><strong>Sex/Gender:</strong></label>
        <input type="text" id="sex" name="sex" value={formData.sex} onChange={handleChange} />
        {errors.sex && <span className="error-message">{errors.sex}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="hemoglobin"><strong>Hemoglobin (g/dL):</strong></label>
        <input type="text" id="hemoglobin" name="hemoglobin" value={formData.hemoglobin} onChange={handleChange} />
        {errors.hemoglobin && <span className="error-message">{errors.hemoglobin}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="sugarLevel"><strong>Sugar Level (mg/dL):</strong></label>
        <input type="text" id="sugarLevel" name="sugarLevel" value={formData.sugarLevel} onChange={handleChange} />
        {errors.sugarLevel && <span className="error-message">{errors.sugarLevel}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="age"><strong>Age:</strong></label>
        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} />
        {errors.age && <span className="error-message">{errors.age}</span>}
      </div>

      <button type="submit" className="submit-button">Analyze Health</button>
    </form>

    {healthAnalysis && (
      <div className="health-analysis">
        <h4>Health Analysis Summary</h4>
        <p><strong>Diagnosis:</strong> {healthAnalysis.diagnosis}</p>
        <p><strong>Recommended Medicines:</strong> {healthAnalysis.medicines.join(', ')}</p>
        <p><strong>Diet Plan:</strong> {healthAnalysis.dietPlan}</p>
        <button onClick={downloadSummary} className="download-button">Download Summary</button>
      </div>
    )}
  </div>
</div>

  );
};

export default PreviewPage;
