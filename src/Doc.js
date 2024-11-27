import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PinataSDK } from "pinata";
import QRCode from 'qrcode.react'; // Импортируем компонент QRCode
import imageCompression from 'browser-image-compression';

const PINATA_API_KEY = 'd89b13f00fa146e1aa418ab686628494';  // Replace with your Infura Project ID
const PINATA_SECRET_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZWY3N2NlNC1lYjRkLTQ3NmQtYjc3ZC0yZjQwMWQwZTdhMmMiLCJlbWFpbCI6InNxYWltZXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjY1YmJiYmI3YzJjMjE1NGI3YzIwIiwic2NvcGVkS2V5U2VjcmV0IjoiZTdjZDA4ZTZkZGQyNGM4NzEyZTgwZmIzMjgzNDU4MjBlZTYxNWEwNTFlNjViMTViZTdlMTgwNDFmZTczMmM2YyIsImV4cCI6MTc2MjQ1NTExM30.PC3g9CarhHwxVynKXoqQwsqC9qZoEEKZdm2EY0L7HZk';  // Replace with your Infura Project Secret
const pinata = new PinataSDK({
  pinataJwt: PINATA_SECRET_API_KEY,
  pinataGateway: "https://chocolate-internal-scorpion-907.mypinata.cloud/",
});

const UploadServicedoc = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [comment, setComment] = useState('');
  const [galleryJsonUrl, setGalleryJsonUrl] = useState(null); // URL for the gallery JSON file
  const [expirationTime, setExpirationTime] = useState(2); // Default to 2
  const [expirationUnit, setExpirationUnit] = useState('d'); // Default to days
  const [removeMetadata, setRemoveMetadata] = useState(false);
  const [loadingx, setLoadingx] = useState(true); 
  const [filesUploaded, setFilesUploaded] = useState(false);
  const [isdelChecked, setIsdelChecked] = useState(false);
  const [error, setError] = useState(""); // Error message state

  const [textContent, setTextContent] = useState(""); // State to hold user input
  const [uploadStatus, setUploadStatus] = useState(null); // State to track upload status

  const handleCreateAndUpload = async () => {
    if (!textContent.trim()) {
      alert("Введите текст перед загрузкой!");
      return;
    }

    try {
      // Create a .txt file from the input
      const file = new File([textContent], "UserInput.txt", { type: "text/plain" });

      // Upload the file to Pinata
      const upload = await pinata.upload.file(file);

      // Handle success
      setUploadStatus(`Файл успешно загружен: ${upload.IpfsHash}`);
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
      setUploadStatus("Ошибка при загрузке файла. Попробуйте снова.");
    }
  };

   const handleExpirationChange = (event) => {
    const value = event.target.value;

    // Validate the input value based on the selected unit
    let maxAllowedValue;
    switch (expirationUnit) {
      case "h": // Hours
        maxAllowedValue = 24;
        break;
      case "d": // Days
        maxAllowedValue = 365;
        break;
      case "w": // Weeks
        maxAllowedValue = 52;
        break;
      case "M": // Months
        maxAllowedValue = 12;
        break;
      default:
        maxAllowedValue = Infinity;
    }

    if (value === "" || (Number(value) > 0 && Number(value) <= maxAllowedValue)) {
      setExpirationTime(value); // Update input if valid
      setError(""); // Clear error
    } else {
      setError(
        `Максимально допустимое значение для "${getUnitLabel(
          expirationUnit
        )}" - ${maxAllowedValue}.`
      );
    }
  };

  const handleUnitChange = (event) => {
    setExpirationUnit(event.target.value);
    setError(""); // Reset error when unit changes
  };

  const getUnitLabel = (unit) => {
    switch (unit) {
      case "h":
        return "Часы";
      case "d":
        return "Дни";
      case "w":
        return "Недели";
      case "M":
        return "Месяцы";
      default:
        return "";
    }
  };

  
  
    // Simulate page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingx(false);
    }, 3000); // Simulate a 3-second page load

    return () => clearTimeout(timer); // Cleanup timer
  }, []);
   const handleCheckboxChange = (event) => {
    setIsdelChecked(event.target.checked);
  };
  // Loader component
  const Loader = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-lg">
        <span className="text-2xl font-semibold">PhotoBunker</span>
        <div className="flex space-x-1">
          <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
          <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "1.2s" }}></span>
          <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "1.4s" }}></span>
        </div>
      </div>
      <p className="mt-4 text-sm">Загрузка... Ожидайте</p>
    </div>
  );

  
  
    const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://photobunker.pro/gallery?bunker=${encodeURIComponent(galleryJsonUrl)}`);
    alert("Ссылка скопирована в буфер обмена!");
  };

  const handleDeleteNow = () => {
    window.location.reload();
  };
  
  const Loaderx = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-lg">
        <span className="text-2xl font-semibold">PhotoBunker</span>
        <div className="flex space-x-1">
          <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
          <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
          <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
        </div>
      </div>
      <p className="mt-4 text-sm">Загрузка... Ожидайте</p>
    </div>
  );
   return (
    <div className="flex flex-col items-center p-6 bg-gray-900 text-white min-h-screen">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-2xl font-semibold mb-4">Создание и загрузка текстового файла</h1>
        <textarea
          rows="6"
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="Введите ваш текст здесь..."
          className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg"
        ></textarea>
        <button
          onClick={handleCreateAndUpload}
          className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Создать и загрузить .txt файл
        </button>
      </div>

      {/* Upload Status */}
      {uploadStatus && (
        <div className="mt-6 w-full max-w-lg text-center">
          <p className="text-sm text-gray-300">{uploadStatus}</p>
        </div>
      )}
    </div>
  );
};

export default UploadServicedoc;
