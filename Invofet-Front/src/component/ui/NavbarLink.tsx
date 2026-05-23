import { type ReactNode } from 'react'; 
import { NavLink } from 'react-router-dom'; // Menghapus Link yang tidak terpakai

interface NavLinkProps { 
  label: string; 
  href: string; 
  icon?: ReactNode; 
  onClick?: () => void; 
} 

export const NavbarLink = ({ label, href, icon, onClick }: NavLinkProps) => { 
  const activeStyle = "text-pink-800 border-b-2 border-pink-800 bg-pink-50/50 md:bg-transparent md:border-b-2"; 
  const defaultStyle = "text-slate-600 hover:text-pink-800 hover:bg-gray-50 md:hover:bg-transparent border-b-2 border-transparent"; 

  return ( 
    <NavLink
      to={href}  
      onClick={onClick} 
      className={({ isActive }) => 
        `flex items-center gap-2 px-4 md:px-3 py-3 md:py-2 text-sm font-semibold md:font-medium
        transition-all duration-150 rounded-xl md:rounded-none w-full md:w-auto
        ${isActive ? activeStyle : defaultStyle}`
      }
    >
     
      {icon && <span className="w-5 h-5 flex items-center justify-center shrink-0">{icon}</span>} 

      <span className="truncate">{label}</span> 
    </NavLink> 
  ); 
};

export default NavbarLink;