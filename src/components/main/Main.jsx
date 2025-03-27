import React, { useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import removeBackground from '../../utils/removeBackground'; // Import the removeBackground function
import ImageModal from './ImageModal';
import Footer from '../footer/Footer'; // Import the modal component

function Main() {
  const [selectedCategory, setSelectedCategory] = useState('People');
  const [originalImage, setOriginalImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const imageMap = {
    'People': assets.img2,
    'Product': assets.img3,
    'Animal': assets.img4,
    'Car': assets.img5
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      // Create an image element to use with BodyPix
      const imageElement = new Image();
      imageElement.src = URL.createObjectURL(file);
      imageElement.onload = async () => {
        // Use the removeBackground function to get the processed image
        const resultUrl = await removeBackground(imageElement);
        setResultImage(resultUrl);
        setOriginalImage(imageElement.src);
        setLoading(false);
      };
    } catch (error) {
      console.error('Error:', error);
      alert('Error removing background. Please try again.');
      setLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="main-wrapper">
      <div className="main-container">
        <div className="img">
          <img src={assets.img1} alt="" />
          <p className='p1'>Remove Image Background?</p>
          <p>100% Free</p>
        </div>

        <div className="sub-container">
          <div className="upload-interface">
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              hidden
              id="upload-input"
            />
            <label htmlFor="upload-input" className="upload-btn">
              {loading ? 'Processing...' : 'Upload Image'}
            </label>
            <p className="drop-text">Drop image here</p>

            {resultImage && (
              <div className="result-container">
                <div className="image-comparison">
                  {originalImage && <img src={originalImage} alt="Original" className="comparison-image" />}
                  <img
                    src={resultImage}
                    alt="Result"
                    className="comparison-image"
                    onClick={openModal} // Open modal on click
                    style={{ cursor: 'pointer' }} // Change cursor to pointer
                  />
                </div>
                <a href={resultImage} download="no-bg.png" className="download-btn">
                  Download Result
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="main-cont">
        <div className="cont">
          <p>Best Quality</p>
          <ul>
            {['People', 'Product', 'Animal', 'Car'].map((category) => (
              <li
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'active' : ''}
              >
                {category}
              </li>
            ))}
          </ul>
          <div className="cont">
            <img src={imageMap[selectedCategory]} alt={selectedCategory} />
          </div>
        </div>
      </div>

      {/* Image Modal for displaying the result image in larger view */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc={resultImage}
      />
      <Footer />
    </div>
  );
}

export default Main;
