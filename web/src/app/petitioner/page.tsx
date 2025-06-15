
import Link from "next/link"
import TextPressure from '@/components/TextPressure';
import Squares from '@/components/Squares';
import PixelCard from '@/components/PixelCard';
import cardsData from '@/fdata/cards.json'; 
import Socials from "@/components/ui/socials"


interface Card {
  id: number;
  title: string;
  href: string;
  type: string;
}

export default async function PetitionerPage() {
  const cards: Card[] = cardsData; 
  
  const variantMap: Record<string, "default" | "yellow" | "pink"> = {
    n: "default",
    x: "pink",
    y: "yellow",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed z-10 top-6 right-6">
        <Socials />
      </div>
      <div className="m-[clamp(1.5rem,2.5dvw,1dvw)]">
        <span className="font-major text-[clamp(1.5rem,1.5vw,3rem)] inline-flex items-baseline">
          <Link href="/" className="text-white no-underline">VAKALATNAMA</Link>
        </span>
      </div>

      {/* New wrapper div with flex-grow to push contact info to bottom */}
      <div className="flex flex-col flex-grow">
        <div>
          <div className="h-10 sm:h-12 md:h-16 lg:h-24 xl:h-28">
            <Squares
              speed={0.5}
              squareSize={30}
              direction="diagonal"
              borderColor="rgba(255, 255, 255, 0.2)"
              hoverFillColor="#222"
            />
          </div>

          {/* Adjusted container for "Welcome Petitioner" */}
          <div
            className="
              px-4 w-full max-w-screen-xl mx-auto flex items-center justify-center
              min-h-[5rem] max-h-[8rem]
              sm:min-h-[7rem] sm:max-h-[10rem]
              md:min-h-[8rem] md:max-h-[12rem]
              mt-2 md:mt-8 lg:mt-10
              mb-1 md:mb-10 lg:mb-12
            "
          >
            <TextPressure
              text="Welcome   Petitioner"
              flex
              alpha={false}
              stroke={false}
              width={false}
              weight
              italic={false}
              textColor="#ffffff"
              strokeColor="#ff0000"
              minFontSize={12}
            />
          </div>
        </div>

        <div className="flex justify-center px-4">
          <div className="grid w-full max-w-screen-xl grid-cols-1 gap-6 mt-5 mb-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cards.map(card => (
              <Link
                key={card.id}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative h-32">
                  <PixelCard
                    variant={variantMap[card.type] || variantMap.n}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 flex items-center justify-center p-2 text-center">
                      <h3 className="font-mono text-lg text-white">{card.title}</h3>
                    </div>
                  </PixelCard>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end items-baseline px-4 pb-4 text-[clamp(0.85rem,1vw,2rem)] text-neutral-400">
        <span className="mr-1 font-semibold">Contact</span>
        <a
          href="mailto:core0legalteam@gmail.com"
          className="font-semibold text-white underline transition-colors duration-200 underline-offset-2 hover:text-yellow-300"
        >
          core0legalteam@gmail.com
        </a>
        <span className="ml-1">to request Sheet Access</span>
      </div>
    </div>
  );
}