interface SpeakerProps { 
  name: string; 
  role: string; 
  imageUrl: string; 
} 
 
export const SpeakerCard = ({ name, role, imageUrl }: SpeakerProps) => { 
  return ( 
    <div className="cursor-pointer flex flex-col items-center gap-4 group w-full max-w-sm mx-auto">
      
      {/* SISI FOTO */}
      <div className="relative z-10">
        <img
          src={imageUrl}
          alt={name}
          className="h-48 w-48 sm:h-60 sm:w-60 rounded-full border-8 sm:border-10 border-pink-800 mx-auto group-hover:scale-105 transition-transform duration-300 object-cover shadow-md"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placeholder.co/300x300?text=No+Photo";
          }}
        />
      </div>

      {/* SISI DETAIL */}
      <div className="w-full border-4 border-pink-800 p-6 rounded-xl relative shadow-lg shadow-black/10 group-hover:shadow-xl group-hover:shadow-black/20 transition-all duration-300 bg-white flex flex-col items-center justify-center min-h-35">
        
        <div className="absolute inset-0 rounded-lg w-full h-full bg-transparent group-hover:bg-pink-100/70 backdrop-blur-xs transition-all duration-300 z-0" />
        
        {/* Konten Teks */}
        <div className="relative z-10 flex flex-col items-center gap-1 text-center w-full">
          <h3 className="text-xl sm:text-2xl text-pink-800 font-bold tracking-tight line-clamp-2 wrap-break-words w-full px-2">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 font-medium line-clamp-2 w-full px-2">
            {role}
          </p>
        </div>

      </div>

    </div>
  ); 
}; 

export default SpeakerCard;