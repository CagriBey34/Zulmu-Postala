import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Share, Download } from 'lucide-react';
import './generateimage.css';

const GenerateImagePage = () => {
  const { name } = useParams();
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(0);
  
  const canvasRef = useRef(null);
  // Dosya yolunuzun doğru olduğundan emin olun
  const backgroundImageSrc = '../assets/sertifika zulmü postala.jpg'; 

  useEffect(() => {
    const generateImages = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Faculty Glyphic fontunu yüklemeyi bekle
        try {
            // Font Google Fonts'tan geldiği için yüklenmesini bekliyoruz
            await document.fonts.load('400 100px "Faculty Glyphic"');
        } catch (e) {
            console.log("Font ön yükleme uyarısı:", e);
        }

        setStep(1); 
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStep(2); 
        
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const backgroundImage = await loadImage(backgroundImageSrc);

        canvas.width = backgroundImage.width;
        canvas.height = backgroundImage.height;
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // --- İsim ve Font Ayarları ---
        const decodedName = decodeURIComponent(name);
        
        // Başlangıç font boyutu
        let fontSize = 100; 
        
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000000'; // Tam Siyah (En net görünüm için)

        // FONT AYARI: Faculty Glyphic, İtalik
        ctx.font = `italic 400 ${fontSize}px "Faculty Glyphic", sans-serif`;

        // --- Tek Satıra Sığdırma Mantığı ---
        const maxTextWidth = canvas.width * 0.8; // Kenarlardan boşluk
        let textWidth = ctx.measureText(decodedName).width;

        // Yazı sığmıyorsa fontu küçült
        while (textWidth > maxTextWidth && fontSize > 30) {
            fontSize -= 2;
            ctx.font = `italic 400 ${fontSize}px "Faculty Glyphic", sans-serif`;
            textWidth = ctx.measureText(decodedName).width;
        }

        // --- Konumlandırma ---
        // Görselin dikey eksende yaklaşık %39'una denk gelen yer
        const yPosition = canvas.height * 0.42;

        ctx.fillText(decodedName, canvas.width / 2, yPosition);

        setGeneratedImage(canvas.toDataURL());
        setStep(3); 

      } catch (err) {
        console.error('Error generating image:', err);
        setError(err.message);
      }
    };

    generateImages();
  }, [name]);

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(new Error(`Görsel yüklenemedi: ${src}`));
      img.src = src;
    });
  };

  const shareImage = async () => {
    if (!generatedImage) return;

    if (navigator.share) {
      try {
        const blob = await (await fetch(generatedImage)).blob();
        const file = new File([blob], 'filistin_hatira.png', { type: 'image/png' });
        await navigator.share({
          title: 'Filistin Hatırası',
          text: 'Zulmü Postala Sergisi Katılım Hatırası',
          files: [file]
        });
      } catch (error) {
        console.error('Paylaşım hatası:', error);
      }
    } else {
      downloadImage();
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'filistin_hatira.png';
    link.click();
  };

  if (error) {
    return <div className="error-container">Hata oluştu: {error}</div>;
  }

  return (
    <div className="generate-image-container">
      <h1 className="generate-image-title">Katılım Sertifikası</h1>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {step < 3 ? (
        <div className="loading-container">
          <div className="loading-bar">
            <div className="loading-progress" style={{width: `${(step / 3) * 100}%`}}></div>
          </div>
          <p className="loading-text">
            {step === 1 ? 'Sertifika hazırlanıyor...' : 'İsminiz işleniyor...'}
          </p>
        </div>
      ) : generatedImage ? (
        <div className="images-container">
            <div className="image-container single-image">
              <img src={generatedImage} alt="Oluşturulan Sertifika" className="certificate-image" />
              <div className="button-container">
                <button onClick={shareImage} className="button">
                  <Share size={16} className="button-icon" />
                  Paylaş
                </button>
                <button onClick={downloadImage} className="button download-button">
                  <Download size={16} className="button-icon" />
                  İndir
                </button>
              </div>
            </div>
        </div>
      ) : (
        <div className="loading-text">Lütfen bekleyin...</div>
      )}
    </div>
  );
};

export default GenerateImagePage;