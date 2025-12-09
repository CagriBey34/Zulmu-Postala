import { useState } from 'react'
import './style.css' // CSS dosya ismin neyse onu kullan

import Tarihce from '../../../pages/Tarihce'
import BizKimiz from '../../../pages/BizKimiz'
import Hedeflerimiz from '../../../pages/Hedeflerimiz'
import Misyon from '../../../pages/Misyon'
import Vizyon from '../../../pages/Vizyon'
import GenerateImagePage from '../../GenerateImagePage/Generateİmageİnput'
import ZulmuPostalaSergisi from '../../../pages/ZulmuPostalaSergisi' 

const OnderNavigation = () => {
    const [activeItem, setActiveItem] = useState('generateImage');
  
    const renderContent = () => {
      switch (activeItem) {
        case 'generateImage': return <GenerateImagePage />;
        case 'sergi': return <ZulmuPostalaSergisi />;
        case 'tarihce': return <Tarihce />;
        case 'kimiz': return <BizKimiz />;
        case 'hedefler': return <Hedeflerimiz />;
        case 'misyon': return <Misyon />;
        case 'vizyon': return <Vizyon />;
        default: return <Tarihce />;
      }
    };
  
    // Menü elemanlarını bir array olarak tanımlamak kod tekrarını azaltır
    const menuItems = [
      { id: 'generateImage', label: 'Sertifika Oluştur' },
      { id: 'sergi', label: 'Zulmü Postala Sergisi' },
      { id: 'kimiz', label: 'Biz Kimiz?' },
      { id: 'hedefler', label: 'Hedeflerimiz' },
      { id: 'misyon', label: 'Misyon' },
      { id: 'vizyon', label: 'Vizyon' },
      { id: 'tarihce', label: 'Tarihçe' },
    ];
  
    return (
        <div className="onder-container">
          <nav className="onder-nav">
            <ul className="onder-nav-list">
              {menuItems.map((item) => (
                <li key={item.id} className="onder-nav-item">
                  <button
                    onClick={() => setActiveItem(item.id)}
                    className={`onder-nav-btn ${activeItem === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <main className="onder-content">
            {renderContent()}
          </main>
        </div>
      );
    };

export default OnderNavigation