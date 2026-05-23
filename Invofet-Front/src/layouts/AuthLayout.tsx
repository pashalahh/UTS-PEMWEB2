import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (

    <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-screen bg-gray-50 text-gray-800">
      
      {/* SISI KIRI: Panel Logo & Maskot (Hanya muncul di desktop, otomatis sembunyi di HP) */}
      <div className="hidden md:flex bg-pink-100 h-screen flex-col items-center justify-center p-8 border-r border-pink-200/50">
        <div className="flex flex-col items-center gap-8 max-w-md">
          <img 
            src="https://www.invofest-harkatnegeri.com/assets/nav-logo.png" 
            alt="Invofest Logo"
            className="w-72 lg:w-80 object-contain drop-shadow-sm" 
          />
          
          <img 
            src="https://www.invofest-harkatnegeri.com/assets/Maskot-Hero.png" 
            alt="Invofest Maskot"
            className="w-80 lg:w-96 object-contain animate-bounce-slow" 
          />
        </div>
      </div>

      {/* SISI KANAN: Tempat Form Login / Register (Outlet) */}
      <div className="p-6 sm:p-12 lg:p-16 flex items-center justify-center w-full h-full">

        <div className="w-full max-w-md mx-auto">
          {/* Logo tambahan khusus mobile di atas form agar user HP tahu ini aplikasi apa */}
          <div className="flex justify-center mb-6 md:hidden">
            <img 
              src="https://www.invofest-harkatnegeri.com/assets/nav-logo.png" 
              alt="Invofest Logo"
              className="h-10 w-auto object-contain" 
            />
          </div>
          
          <Outlet />
        </div>
      </div>

    </div>
  );
}