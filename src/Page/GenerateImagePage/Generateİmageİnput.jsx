import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './still.css';

const Generateİmageİnput = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      navigate(`/generate/${encodeURIComponent(name)}`);
    }
  };

  return (
      <div className='ser-containerr'>
        <h1 className='ser-title'>SERTİFİKANI İNDİR</h1>
        
        <div className='sertifika-desc'>
          <p>Gazze’de yaşanan zulüm, yıkım ve direniş yalnızca bir bölgenin değil, bütün insanlığın vicdanında açılan derin bir yaradır. Burada, o sessiz çığlığı duyan ve “Gazze’nin Sesi Ol” diyerek fırçalarını, renklerini ve yüreklerini ortaya koyan gençlerin eserleriyle buluşuyoruz.</p>
          <p>“Gazze’nin Sesi Ol, Zulmü Postala” temasıyla hayata geçirilen uluslararası posta sanatı sergisi; bir sanat çalışmasının ötesinde, gençlerin dünyaya ilettiği bir tanıklık, duyarlılığın estetik bir dili ve zulme karşı yükselen sessiz bir itirazdır.</p>
          <p>Siz de bu anlamlı sergide yer alan eseriniz için sertifikanızı buradan indirebilir, paylaşarak duyarlılığınızı daha geniş kitlelere ulaştırabilirsiniz. Sosyal medya paylaşımlarınızda <strong>#ZulmüPostala</strong> etiketiyle dayanışma zincirine katkı sunabilirsiniz.</p>
        </div>

        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adınız Soyadınız"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Resim Oluştur
          </button>
        </form>
      </div>
  );
};

export default Generateİmageİnput;