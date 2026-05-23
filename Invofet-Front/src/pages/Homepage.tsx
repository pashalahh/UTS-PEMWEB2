import Button from '../component/ui/Button';
import { Card } from '../component/ui/CardProduct';
import Collapse from '../component/ui/Collapse';
import { SpeakerCard } from '../component/ui/SpeakerCard';
import { Link } from "react-router-dom";

export default function Homepage() {
  const speakers = [ 
    { id: 1, name: "Lemon", role: "Mid Laner", img: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/fc004fd37dd0b6c0c7d4be2934e7d7c55ec093573e60b86fe81c7381eba55fd4.png" }, 
    { id: 2, name: "R7", role: "Exp Laner", img: "https://dafunda.com/wp-content/uploads/2023/01/rrq-r7-rehat-mpl-id-s11.jpeg" }, 
    { id: 3, name: "Albert", role: "Jungler", img: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/8f43c5d837f893e7376d0faf30752d53c63990a832fd4332763ae83966c4d332.png" }, 
  ];

  const CollapseData = [
    { title: "Apa itu Invofest?", description: "Invofest (Informatics Vocational Festival) adalah festival tahunan yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia dalam menghadapi era digital. Dengan mengusung tema “Beyond Limits, Beyond Intelligence: Innovate for a Smarter Tomorrow ”." },
    { title: "Siapa saja yang bisa ikut?", description: "Invofest terbuka untuk seluruh mahasiswa, pelajar, serta penggiat teknologi di seluruh Indonesia yang ingin mengembangkan inovasi dan wawasan digitalnya." },
    { title: "Bagaimana cara mendaftarnya?", description: "Kamu bisa menekan tombol pendaftaran pada setiap event yang tersedia di bawah ini dan mengisi form data tim maupun individu secara online." },
  ];

  const cardItems = [
    { title: "IT Seminar", description: "Seminar nasional ini membahas “Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif” untuk mengembangkan potensi diri." },
    { title: "IT Talkshow", description: "Talkshow “Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan” membahas peran manusia dalam memanfaatkan AI." },
    { title: "IT Competition", description: "Kompetisi “From Creation to Innovation” mengajak generasi muda untuk mengembangkan inovasi dan kreativitas kelompok." },
    { title: "IT Workshop", description: "Workshop 'AI for a Sustainable Future' membekali Gen Z dengan keterampilan praktis AI untuk solusi masa depan." },
  ];

  return (
    <div className="w-full overflow-hidden">
      
      {/*  HERO SECTION */}
      <section id='hero' className='py-12 md:py-24 flex flex-col md:flex-row gap-10 justify-between items-center px-6 md:px-16 max-w-7xl mx-auto relative'>
        <div className='w-full md:w-3/5 flex flex-col gap-6 text-center md:text-left items-center md:items-start relative z-10'>
          <img src="https://www.invofest-harkatnegeri.com/assets/text-image.png" alt="Invofest Logo" className='w-72 sm:w-96 object-contain' />
          <p className='text-sm sm:text-base lg:text-xl text-slate-600 leading-relaxed'>
            Invofest (Informatics Vocational Festival) adalah festival tahunan yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia dalam menghadapi era digital. Dengan mengusung tema <b>“Beyond Limits, Beyond Intelligence: Innovate for a Smarter Tomorrow”</b>.
          </p>
          <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto z-20'> 
            <Button label="Info Selengkapnya" variant="primary" className="w-full sm:w-auto" />
            <Button label="Hubungi Panitia" variant="outline" className="w-full sm:w-auto" />
          </div>
        </div>
        <div className='w-3/5 md:w-2/5 max-w-xs md:max-w-none relative z-0'>
          <img src="https://www.invofest-harkatnegeri.com/assets/Maskot-Hero.png" alt="Maskot Hero" className="w-full h-auto object-contain" />
        </div>
      </section>

      {/* ABOUT & CARDS SECTION */}
      <section id='cards' className='w-full bg-[#FDF2F7] py-16 md:py-24 px-6 sm:px-12 md:px-20'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-3xl md:text-5xl mb-6 text-pink-700 font-bold text-center md:text-left'>Tentang INVOFEST</h1>
          <p className='text-sm sm:text-base lg:text-xl text-slate-700 leading-relaxed text-center md:text-left'>
            Invofest 2025, yang diselenggarakan oleh sarjana terapan Teknik Informatika Universitas Harkat Negeri, adalah festival tahunan yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia.
          </p>
          
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12'>
            {cardItems.map((item, index) => (
              <Card key={index} className='hover:-translate-y-2 transition-all duration-300'>
                <h3 className='text-xl md:text-2xl text-pink-700 mb-2 font-bold'>{item.title}</h3>
                <p className='text-xs sm:text-sm text-slate-600 flex-1 leading-relaxed'>{item.description}</p>
                <div className="flex justify-center mt-4"> 
                  <Button label='Info Selengkapnya' variant='primary' className='w-full text-xs py-2' />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SPEAKERS SECTION */}
      <section id='speaker' className='py-16 md:py-24 max-w-7xl mx-auto px-6'>
        <h2 className="text-center text-3xl md:text-4xl font-bold text-pink-800 mb-12 uppercase tracking-wide">Pembicara Utama</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 w-full'>
          {speakers.map((speaker, index) => (
            <SpeakerCard key={index} name={speaker.name} role={speaker.role} imageUrl={speaker.img} />
          ))}
        </div>
      </section>

      {/* DETAIL EVENTS (SEMINAR, TALKSHOW, WORKSHOP, LOMBA) */}
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col gap-16 md:gap-24 py-10">
        
        {/* SEMINAR */}
        <section id='seminar' className='flex flex-col md:flex-row gap-10 items-center justify-between'>
          <div className='w-1/2 md:w-1/3 max-w-xs'><img src="https://www.invofest-harkatnegeri.com/assets/Maskot-Seminar.png" alt="Seminar" className="w-full" /></div>
          <div className='w-full md:w-2/3 flex flex-col gap-4 text-center md:text-left items-center md:items-start'>
            <h1 className='text-3xl md:text-5xl text-pink-700 font-bold'>IT Seminar</h1>
            <p className='text-sm sm:text-base text-slate-600 leading-relaxed'>Seminar Nasional ini mengangkat tema <b>"Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif.”</b></p>
            <Link to="/register/event" className="w-full sm:w-auto"><Button label="Daftar IT Seminar" variant="primary" className="w-full" /></Link>
          </div>
        </section>

        {/* TALKSHOW */}
        <section id='talkshow' className='flex flex-col-reverse md:flex-row gap-10 items-center justify-between'>
          <div className='w-full md:w-2/3 flex flex-col gap-4 text-center md:text-left items-center md:items-start'>
            <h1 className='text-3xl md:text-5xl text-pink-700 font-bold'>IT Talkshow</h1>
            <p className='text-sm sm:text-base text-slate-600 leading-relaxed'>Talkshow berskala nasional: <b>“Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan.”</b></p>
            <Link to="/register/event" className="w-full sm:w-auto"><Button label="Daftar IT Talkshow" variant="primary" className="w-full" /></Link>
          </div>
          <div className='w-1/2 md:w-1/3 max-w-xs'><img src="https://www.invofest-harkatnegeri.com/assets/Maskot-Talkshow.png" alt="Talkshow" className="w-full" /></div>
        </section>

        {/* WORKSHOP */}
        <section id='workshop' className='flex flex-col md:flex-row gap-10 items-center justify-between'>
          <div className='w-1/2 md:w-1/3 max-w-xs'><img src="https://www.invofest-harkatnegeri.com/assets/Maskot-Workshop.png" alt="Workshop" className="w-full" /></div>
          <div className='w-full md:w-2/3 flex flex-col gap-4 text-center md:text-left items-center md:items-start'>
            <h1 className='text-3xl md:text-5xl text-pink-700 font-bold'>IT Workshop</h1>
            <p className='text-sm sm:text-base text-slate-600 leading-relaxed'>Workshop <b>"AI for a Sustainable Future: The Role of Z Generation in the Digital Era”</b> ini menjembatani potensi Gen Z dan kekuatan AI.</p>
            <Link to="/register/event" className="w-full sm:w-auto"><Button label="Daftar IT Workshop" variant="primary" className="w-full" /></Link>
          </div>
        </section>

        {/* COMPETITION */}
        <section id='competition' className='flex flex-col-reverse md:flex-row gap-10 items-center justify-between'>
          <div className='w-full md:w-2/3 flex flex-col gap-4 text-center md:text-left items-center md:items-start'>
            <h1 className='text-3xl md:text-5xl text-pink-700 font-bold'>IT Competition</h1>
            <p className='text-sm sm:text-base text-slate-600 leading-relaxed'>Ajang ini menantang para talenta digital dengan tema besar <b>"From Creation to Innovation"</b>.</p>
            <Link to="/register/event" className="w-full sm:w-auto"><Button label="Daftar IT Competition" variant="primary" className="w-full" /></Link>
          </div>
          <div className='w-1/2 md:w-1/3 max-w-xs'><img src="https://www.invofest-harkatnegeri.com/assets/Maskot-Lomba.png" alt="Lomba" className="w-full" /></div>
        </section>

      </div>

      {/* COLLAPSE / FAQ SECTION */}
      <section id='Collapse' className="py-16 md:py-24 bg-gray-50 border-t border-gray-100 px-6">
        <div className='max-w-6xl mx-auto'>
          <div className="text-center mb-12">
            <h2 className='text-2xl md:text-4xl font-bold text-slate-800'>Punya Pertanyaan? Lihat Di Sini</h2>
            <p className='text-sm text-gray-500 mt-3 max-w-xl mx-auto'>Ada banyak informasi terkait INVOFEST, Anda dapat melihat daftar pertanyaan di bawah ini.</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start'>
            {CollapseData.map((item, index) => (
              <Collapse key={index} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}