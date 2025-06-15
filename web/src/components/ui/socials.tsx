
import Image from "next/image"

export default function Socials() {
    return (
        <div className="flex gap-3">
        <a 
          href="https://youtube.com/@vakalatnama_official" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 transition-all duration-300 border-2 rounded-full border-white/20 hover:border-white/100 group"
        >
          <Image 
            src="/icons/youtube.svg" 
            alt="YouTube"
            width={20}
            height={20}
            className="transition-opacity duration-300 opacity-100"
          />
        </a>
        
        <a 
          href="https://instagram.com/core0.legal" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 transition-all duration-300 border-2 rounded-full border-white/20 hover:border-white/100 group"
        >
          <Image 
            src="/icons/instagram.svg" 
            alt="Instagram"
            width={20}
            height={20}
            className="transition-opacity duration-300 opacity-60"
          />
        </a>
        </div>
    )
}