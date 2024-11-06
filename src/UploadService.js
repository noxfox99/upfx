import React, { useState } from 'react';
import axios from 'axios';



const PINATA_API_KEY = 'd89b13f00fa146e1aa418ab686628494';  // Replace with your Infura Project ID
const PINATA_SECRET_API_KEY = 'a533bb896ff441f69c94dee9fdb76fbb';  // Replace with your Infura Project Secret

const UploadService = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length + files.length <= 10) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    } else {
      alert('You can only upload a maximum of 10 files.');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    if (droppedFiles.length + files.length <= 10) {
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    } else {
      alert('You can only upload a maximum of 10 files.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    setLoading(true);
    const urls = [];

    try {
      const promises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const metadata = JSON.stringify({
          name: file.name,
          keyvalues: {
            description: 'Uploaded with Pinata'
          }
        });
        formData.append('pinataMetadata', metadata);

        const response = await axios.post(
          'https://api.pinata.cloud/pinning/pinFileToIPFS',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              pinata_api_key: PINATA_API_KEY,
              pinata_secret_api_key: PINATA_SECRET_API_KEY,
            },
          }
        );

        urls.push(`https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`);
      });

      await Promise.all(promises);
      setUploadedUrls(urls);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files.');
    } finally {
      setLoading(false);
      setFiles([]);
    }
  };

  return (
    <div className="flex flex-col items-center p-10 bg-gradient-to-r from-gray-800 to-black text-white min-h-screen">
      {/* Header Section */}
      <header className="w-full flex md:justify-center justify-between items-center flex-col p-4 bg-gradient-to-r from-gray-700 to-gray-900 mb-6">
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full ">
        <div className="flex flex-[0.5] justify-дуае items-center">
          {/* "PhotoBunker" as a button-like text */}
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
          </div>
        </div>
          <p className="text-white text-base text-center mx-2 cursor-pointer hover:text-[#49bce6]">FAQ</p>
          <p className="text-white text-base text-center mx-2 cursor-pointer hover:text-[#49bce6]">Контакты</p>
        </div>
      </header>

      <h1 className="text-white text-4xl sm:text-5xl py-2 text-gradient ">Загрузите файлы в IPFS</h1>
      <div className="border-dashed border-4 border-white p-10 w-full max-w-lg text-center cursor-pointer bg-gray-900 rounded-lg shadow-lg hover:opacity-75 transition"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="block text-xl font-semibold">
          Перетащите файлы или кликните для загрузки
        </label>
      </div>
     <ul className="mt-4 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="vue-checkbox-list"
              type="checkbox"
              value="vue"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="vue-checkbox-list"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Продвинутое шифрование
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="react-checkbox-list"
              type="checkbox"
              value="react"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              htmlFor="react-checkbox-list"
              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Сжать и удалить Metadata
            </label>
          </div>
        </li>
      </ul>
      {files.length > 0 && (
        <div className="mt-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Ваши Файлы:</h2>
          <div className="grid grid-cols-2 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  {file.name}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">Your comment</label>
          <textarea
            id="comment"
            rows="4"
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Комментарий..."
            required
          ></textarea>
        </div>
             <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
           <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Post comment
           </button>
                  </div>  
      </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        className={`mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-6 rounded-lg transition ${
          loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-75'
        }`}
        disabled={loading || files.length === 0}
      >
        {loading ? 'Загрузка...' : 'Загрузить файлы'}
      </button>

      {loading && (
        <div className="mt-4 text-center text-lg font-semibold">
          <p>Загрузка... Ожидайте</p>
        </div>
      )}

      {uploadedUrls.length > 0 && (
        <div className="mt-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4">Загруженные Файлы:</h2>
          <div>
            {uploadedUrls.map((url, index) => (
              <div key={index} className="text-center mb-4">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {url}
                </a>
              </div>
            ))}
          </div>

        </div>
      )}
        <div>
      <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white"> </h3>
      <ul className="grid w-full gap-6 md:grid-cols-3">
        <li>
          <input type="checkbox" id="react-option" className="hidden peer" required />
          <label
            htmlFor="react-option"
            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="block">
                            <svg
                className="mb-2 w-7 h-7 text-green-400"
                fill="currentColor"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M356.9 64.3H280l-56 88.6-48-88.6H0L224 448 448 64.3h-91.1z..."></path>
              </svg>
              <div className="w-full text-lg font-semibold">Рекламный Блок</div>
              <div className="w-full text-sm">Отправте запрос на info@photobunker.xyz</div>
            </div>
          </label>
        </li>

        <li>
          <input type="checkbox" id="flowbite-option" className="hidden peer" />
          <label
            htmlFor="flowbite-option"
            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="block">
              <svg
                className="mb-2 w-7 h-7 text-green-400"
                fill="currentColor"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M356.9 64.3H280l-56 88.6-48-88.6H0L224 448 448 64.3h-91.1z..."></path>
              </svg>
              <div className="w-full text-lg font-semibold">Рекламный Блок</div>
              <div className="w-full text-sm">Отправте запрос на info@photobunker.xyz</div>
            </div>
          </label>
        </li>

        <li>
          <input type="checkbox" id="angular-option" className="hidden peer" />
          <label
            htmlFor="angular-option"
            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="block">
                  <svg
                className="mb-2 w-7 h-7 text-green-400"
                fill="currentColor"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M356.9 64.3H280l-56 88.6-48-88.6H0L224 448 448 64.3h-91.1z..."></path>
              </svg>
               <div className="w-full text-lg font-semibold">Рекламный Блок</div>
              <div className="w-full text-sm">Отправте запрос на info@photobunker.xyz</div>
            </div>
          </label>
        </li>
      </ul>
    </div>
   <section className="mt-20 w-full flex flex-col items-center bg-gray-800 p-10 text-white my-5 items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gradient">Почему IPFS?</h2>
        <p className="text-white text-base text-center mx-2 text-center mb-4 text-white py-2 text-gradient">
          IPFS (InterPlanetary File System) — это децентрализованный протокол, который позволяет эффективно хранить и делиться данными. Благодаря IPFS, ваши файлы будут доступны в любое время, из любой точки мира, без рисков утраты данных.
        </p>
      </section>
         <section className="mt-5 w-full flex flex-col items-center bg-gray-800 p-10 text-white my-20 items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gradient">Удаление Метаданных</h2>
        <p className="text-white text-base text-center mx-2 text-center mb-4 text-white py-2 text-gradient">
          Загружаемый файл отчищается от таких метаданных как геолокация, телефон, разрешение девайса и прочих дополнительных данных, гарантируя анонимность источника создания
        </p>
      </section>
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
            <p className="text-white text-base text-center mx-2 cursor-pointer hover:text-[#49bce6]">Загрузить</p>
            <p className="text-white text-base text-center mx-2 cursor-pointer hover:text-[#49bce6]">FAQ</p>
            <p className="text-white text-base text-center mx-2 cursor-pointer hover:text-[#49bce6]">Контакты</p>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col mt-5">
          <p className="text-white text-sm text-center">Загрузи фото в безопасное хранилище</p>
          <p className="text-white text-sm text-center font-medium mt-2">support@photobunker.com</p>
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

export default UploadService;
