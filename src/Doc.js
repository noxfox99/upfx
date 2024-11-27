import React, { useState, useEffect } from 'react';
import { PinataSDK } from "pinata";

const PINATA_API_KEY = 'd89b13f00fa146e1aa418ab686628494';  // Replace with your Infura Project ID
const PINATA_SECRET_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZWY3N2NlNC1lYjRkLTQ3NmQtYjc3ZC0yZjQwMWQwZTdhMmMiLCJlbWFpbCI6InNxYWltZXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjY1YmJiYmI3YzJjMjE1NGI3YzIwIiwic2NvcGVkS2V5U2VjcmV0IjoiZTdjZDA4ZTZkZGQyNGM4NzEyZTgwZmIzMjgzNDU4MjBlZTYxNWEwNTFlNjViMTViZTdlMTgwNDFmZTczMmM2YyIsImV4cCI6MTc2MjQ1NTExM30.PC3g9CarhHwxVynKXoqQwsqC9qZoEEKZdm2EY0L7HZk';  // Replace with your Infura Project Secret
const pinata = new PinataSDK({
  pinataJwt: PINATA_SECRET_API_KEY,
  pinataGateway: "https://chocolate-internal-scorpion-907.mypinata.cloud/",
});

const Doc = () => {
  const [expirationTime, setExpirationTime] = useState(2); // Default to 2
  const [expirationUnit, setExpirationUnit] = useState('d'); // Default to days
  const [textContent, setTextContent] = useState(""); // State to hold user input
  const [uploadStatus, setUploadStatus] = useState(null); // State to track upload status

  const handleCreateAndUpload = async (pinata) => {
    if (!textContent.trim()) {
      alert("Введите текст перед загрузкой!");
      return;
    }

    try {
      // Create a .txt file from the input
    console.log('start');
    if (!pinata || !pinata.upload || !pinata.upload.file) {
      console.error("Ошибка: Pinata не настроен или отсутствует метод `upload.file`.");
      setUploadStatus("Ошибка: Сервис загрузки недоступен.");
      return;
    }
 // Create a .txt file from the textarea content
      const file = new File([textContent], "UserInput.txt", { type: "text/plain" });

      if (!file) {
        throw new Error("Файл не создан. Убедитесь, что текст введён.");
      }     
      console.log(file);
      // Upload the file to Pinata
      const uploadx = await pinata.upload.file(file);
      console.log(uploadx);
      // Handle success
      setUploadStatus(`Файл успешно загружен: `);
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
      setUploadStatus("Ошибка при загрузке файла. Попробуйте снова.");
    }
  };
  
   return (
     
    <div className="flex flex-col items-center p-1 bg-gradient-to-r from-gray-800 to-black text-white min-h-screen">
           <header className="w-full flex md:justify-center justify-between items-center flex-col p-2 bg-gradient-to-r from-gray-700 to-gray-900 mb-4">
        <div className="flex flex-1 justify-center items-center flex-wrap sm:mt-0 mt-5 w-full ">
        <div className="flex flex-[0.4] justify-center items-center">
          {/* "PhotoBunker" as a button-like text */}
          <a href="/">
          <div className="flex items-center space-x-2 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow-lg hover:opacity-75">
            <span className="text-2xl font-semibold">PhotoBunker</span>
            {/* Upload Icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 20"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v6.586l3.707-3.707a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 10.586V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
              <path d="M10 13a7 7 0 100-14 7 7 0 000 14z" />
            </svg>
          </div></a>
        </div>
        </div>
      </header>
      <div className="w-full max-w-lg text-center">
        <h1 className="text-2xl font-semibold mb-4">Создание Записки</h1>
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
          Создать Записку
        </button>
      </div>

      {/* Upload Status */}
      {uploadStatus && (
        <div className="mt-6 w-full max-w-lg text-center">
          <p className="text-sm text-gray-300">{uploadStatus}</p>
        </div>
      )}
 {/* Footer Section */}
      <footer className="w-full flex md:justify-center justify-between items-center flex-col p-4 bg-gradient-to-r from-gray-700 to-gray-900 mt-10">
        <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
          <div className="flex flex-[0.5] justify-center items-center">
          <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full ">

          <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#2952E3]">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              fontSize="21"
              className="text-white"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"
              ></path>
            </svg>
                        <p className="text-white text-4xl sm:text-5xl py-2 text-gradient">Фото Бункер</p>

          </div>
          </div>
          </div>
          <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full ">
          </div>
        </div>
        <div className="flex justify-center items-center flex-col mt-5">
          <p className="text-white text-sm text-center">Бесплатное хранилище нового поколения для ваших медиафайлов</p>
          <p className="text-white text-sm text-center font-medium mt-2">support@photobunker.pro</p>
        </div>
        <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 "></div>
        <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
          <p className="text-white text-left text-xs">Фото Бункер 2024</p>
          <p className="text-white text-right text-xs">All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Doc;
