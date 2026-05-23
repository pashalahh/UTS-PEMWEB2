import { useState } from 'react';
import { Home, Users, Trophy, Monitor, Mic, UserCircle, Menu, X } from 'lucide-react'; 
import { NavLink } from 'react-router-dom';
 
export const Header = () => { 
  // State untuk mengontrol buka/tutup menu navigasi di mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const menuItems = [ 
    { label: 'Beranda', href: '/', icon: <Home size={18} /> }, 
    { label: 'Competition', href: '/competition', icon: <Trophy size={18} /> }, 
    { label: 'Seminar', href: '/seminar', icon: <Users size={18} /> }, 
    { label: 'Workshop', href: '/workshop', icon: <Monitor size={18} /> }, 
    { label: 'Talkshow', href: '/talkshow', icon: <Mic size={18} /> }, 
  ]; 

  const activeStyle = "text-pink-800 border-b-2 border-pink-800 bg-pink-50/50 md:bg-transparent"; 
  const defaultStyle = "text-slate-600 hover:text-pink-800 hover:bg-gray-50 md:hover:bg-transparent"; 
 
  return ( 
    <header className="bg-white shadow-sm px-4 sm:px-6 py-3 sticky top-0 z-50"> 
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO UTAMA */}
        <div className="flex items-center shrink-0">
          <img 
            src="https://www.invofest-harkatnegeri.com/assets/nav-logo.png" 
            alt="Invofest Logo" 
            className="h-9 w-auto object-contain"
          />
        </div>

        {/* BUTTON MOBILE TOGGLE */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Tombol Profile khusus mobile di samping hamburger */}
          <NavLink to="/login" className="p-2 text-slate-600 hover:text-pink-800">
            <UserCircle size={22} />
          </NavLink>
          
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-600 hover:text-pink-800 hover:bg-gray-100 rounded-lg focus:outline-none cursor-pointer"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/*  NAV MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2"> 
          {menuItems.map((item) => ( 
            <NavLink            
              key={item.href}
              to={item.href}  
              className={({ isActive }) => 
                `flex items-center gap-2 px-3 py-2 font-medium text-sm transition-all duration-150
                ${isActive ? activeStyle : defaultStyle}`
              }
            >
              {item.icon && <span className="flex items-center justify-center shrink-0">{item.icon}</span>} 
              <span>{item.label}</span> 
            </NavLink> 
          ))} 

          {/* Tombol Login Desktop */}
          <NavLink            
            to="/login"  
            className={({ isActive }) => 
              `flex items-center gap-2 px-3 py-2 font-medium text-sm transition-all duration-150 ml-2
              ${isActive ? "text-pink-800" : "text-slate-600 hover:text-pink-800"}`
            }
          > 
            <UserCircle size={20} />
            <span>Masuk</span>
          </NavLink>
        </nav> 

      </div>

      {/* DROPDOWN MENU MOBILE  */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 pt-2 border-t border-gray-100 animate-fadeIn">
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setIsMenuOpen(false)} // Otomatis tutup menu setelah link diklik
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all
                  ${isActive ? activeStyle : defaultStyle}`
                }
              >
                {item.icon && <span className="text-slate-500">{item.icon}</span>}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header> 
  ); 
}; 

export default Header;