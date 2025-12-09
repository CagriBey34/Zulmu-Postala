import React from 'react';
import { Eye, Download, FileText } from 'lucide-react';
import './ZulmuPostalaSergisi.css'; // CSS dosyasını aşağıda oluşturacağız

const ZulmuPostalaSergisi = () => {
  // Buraya kendi dosya yollarınızı yazın
  const pdfUrl = "https://ihamer.org.tr/wp-content/uploads/2025/12/zulmu-postala-dijital1.pdf"; 
  const coverImageUrl = "https://ihamer.org.tr/wp-content/uploads/2025/12/Gemini_Generated_Image_ly8fzply8fzply8f.png"; 

  return (
    <div className="sergi-wrapper">
      <div className="sergi-header">
        <h2>Zulmü Postala Sergisi</h2>
      </div>

      <div className="pdf-card-container">
        <div className="pdf-card">
          {/* Kapak Görseli */}
          <div className="image-wrapper">
            <img 
              src={coverImageUrl} 
              alt="Zulmü Postala Sergi Kataloğu" 
              className="cover-image" 
              // Resim yüklenemezse placeholder göster
              onError={(e) => {e.target.src = 'https://placehold.co/400x600?text=Katalog+Kapağı'}}
            />
            
            {/* Hover Olunca Çıkan Alan */}
            <div className="overlay">
              <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="action-btn view-btn"
                title="Görüntüle"
              >
                <Eye size={24} />
                <span>Görüntüle</span>
              </a>
              
              <a 
                href={pdfUrl} 
                download="Zulmu_Postala_Sergisi.pdf" 
                className="action-btn download-btn"
                title="İndir"
              >
                <Download size={24} />
                <span>İndir</span>
              </a>
            </div>
          </div>
          
          <div className="card-footer">
            <FileText size={18} />
            <span>Sergi Kataloğu (PDF)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZulmuPostalaSergisi;