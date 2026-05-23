import { Link } from "react-router-dom"; // Pastikan route sesuai dengan package yang kamu pakai
import Button from "../component/ui/Button";
import { Card } from '../component/ui/CardProduct';

export default function Competition() {
  const competitions = [
    {
      title: "Web Design Competition",
      category: "IT Competition",
      description: "Web Design Competition ini adalah kompetisi untuk menciptakan suatu perangkat lunak berbasis website yang menggunakan desain menarik, unik, dan responsive pada semua device serta sesuai dengan tema kompetisi.",
      image: "https://www.invofest-harkatnegeri.com/assets/competition-card/web_design.png"
    },
    {
      title: "UI/UX Design Competition",
      category: "IT Competition",
      description: "UI/UX Design Competition ini adalah kompetisi untuk menciptakan dan merancang inovasi sebuah produk digital yang dapat berupa website maupun mobile apps serta dapat membuat nyaman calon pengguna.",
      image: "https://www.invofest-harkatnegeri.com/assets/competition-card/ui_ux.png"
    },
    {
      title: "Poster Design Competition",
      category: "IT Competition",
      description: "Poster Design Competition ini adalah kompetisi untuk menciptakan suatu karya dalam bentuk poster digital yang komunikatif dan inspiratif, guna menyuarakan gagasan atau solusi visual terhadap permasalahan yang ada sekarang ini.",
      image: "https://www.invofest-harkatnegeri.com/assets/competition-card/software_dev.png"
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* HERO SECTION */}
      <section
        id='competition'
        className='py-12 md:py-20 flex flex-col-reverse md:flex-row gap-10 justify-between items-center px-6 md:px-16 max-w-7xl mx-auto'
      >
        <div className='w-full md:w-2/3 flex flex-col gap-6 text-center md:text-left items-center md:items-start'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl text-pink-700 font-bold'>IT Competition</h1>
          <p className='text-sm sm:text-base lg:text-xl text-slate-600 leading-relaxed'>
            <b>"From Creation to Innovation"</b> adalah sebuah kompetisi IT yang dirancang untuk menjembatani jurang antara ide kreatif dan inovasi nyata. Ajang ini menantang para talenta digital untuk tidak hanya menciptakan sesuatu yang baru, tetapi juga mengembangkannya menjadi solusi yang berdampak, berkelanjutan, dan bernilai guna tinggi.
          </p>
          <div className='flex gap-3 w-full sm:w-auto'> 
            <Link to="/register/event" className="w-full sm:w-auto">
              <Button label="Daftar IT Competition" variant="primary" className="w-full" type="button" />
            </Link>
          </div>
        </div>
        
        <div className='w-3/5 md:w-1/3 max-w-xs md:max-w-none'>
          <img
            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Lomba.png"
            alt="Maskot Lomba"
            className="w-full h-auto object-contain animate-pulse-slow"
          />
        </div>
      </section>

      {/* TENTANG SECTION */}
      <section className="w-full bg-[#FDF2F7] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-pink-800 mb-6 uppercase tracking-wider">Tentang IT Competition</h2>
          <p className="text-slate-700 leading-relaxed text-base md:text-lg">
            Kompetisi atau perlombaan yang ada dalam kegiatan <b>INVOFEST (Informatics Vocational Festival) 2025</b> ini 
            bertujuan mengajak generasi muda untuk mengembangkan inovasi dan kreativitas guna membentuk kelompok yang memiliki 
            potensi luar biasa. Melalui pendekatan ini, diharapkan generasi ini akan berperan dalam menciptakan solusi-solusi baru 
            untuk tantangan masa kini dan mendatang.
          </p>
        </div>
      </section>

      {/* LIST CARD SECTION */}
      <section className="w-full py-16 md:py-24 px-6 sm:px-12 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-pink-800 mb-12 uppercase tracking-wide">DAFTAR KOMPETISI</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            {competitions.map((item, index) => (
              <Card 
                key={index} 
                image={item.image}
                className="hover:-translate-y-2 transition-all duration-300"
              >
                <div className="mb-4">
                  <span className="text-[10px] font-black text-pink-600 uppercase tracking-widest">
                    {item.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-1">{item.title}</h2>
                </div>
                
                <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">
                  {item.description}
                </p>

                <div className="mt-auto">
                  <Button 
                    label="Detail Lomba" 
                    variant="primary" 
                    className="w-full"
                    onClick={() => window.location.href = `/competition/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}