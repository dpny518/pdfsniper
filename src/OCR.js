import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const OCR = ({ image }) => {
  const [text, setText] = useState('');

  const extractText = async () => {
    try {
      const result = await Tesseract.recognize(
        image,
        'eng', // Language: English
        { logger: (m) => console.log(m) }
      );
      setText(result.text);
    } catch (error) {
      console.error('Error extracting text:', error);
    }
  };

  return (
    <div>
      <button onClick={extractText}>Extract Text</button>
      {text && <div>{text}</div>}
    </div>
  );
};

export const extractTextFromHighlights = async (highlights) => {
  try {
    // Combine text from all highlights
    const allText = highlights.map((highlight) => highlight.text).join(' ');

    // Use Tesseract to extract text from the combined highlights
    const result = await Tesseract.recognize(allText, 'eng');
    return result.text;
  } catch (error) {
    console.error('Error extracting text from highlights:', error);
    return '';
  }
};

export default OCR;
