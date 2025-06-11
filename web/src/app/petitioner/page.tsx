'use client';

import Link from "next/link"
import TextPressure from '../../components/TextPressure';
import Squares from '../../components/Squares';
import PixelCard from '../../components/PixelCard';

export default function PetitionerPage() {


  const cards = [
    {
      id: 1,
      title: "4th Phase Coll. [GForm]",
      href: "https://forms.gle/6f5ZH5JhvAmWHqoW9",
      type: "y",
    },
    {
      id: 2,
      title: "Notice [Defaulters]",
      href: "https://drive.google.com/file/d/1wDldvUDtaDjj5-PCThdf7Z49hWVUhEE9/view?usp=drive_link",
      type: "n",
    },
    {
      id: 3,
      title: "Expense Sheet",
      href: "https://docs.google.com/spreadsheets/d/1bFkV3uIhbLYh0AYfxZ4ivm6B9o9AtXDqiMPmVb5g6DY/edit?usp=sharing",
      type: "x",
    },
    {
      id: 4,
      title: "Balance Sheet",
      href: "https://docs.google.com/spreadsheets/d/12jr-KDq2fCsH4uk0SctHet205nLxX-h-65wzVwkB2-k/edit?usp=drive_link",
      type: "x",
    },
  ];

  // Maps card types to PixelCard variants
  const variantMap: Record<string, "default" | "yellow" | "pink"> = {
    n: "default", // Uses default settings but allows custom colors/speed
    x: "pink",    // Uses pink variant base, can be overridden by specific props
    y: "yellow",  // Uses yellow variant base, can be overridden by specific props
  };
  
  // Maps card types to border classes
  const borderClassMap: Record<string, string> = {
    n: "border-neutral-500", // Default gray border
    x: "border-red-500",     // Red border for 'x' type
    y: "border-yellow-400",  // Yellow border for 'y' type
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="m-[clamp(1.5rem,2.5dvw,1dvw)]">
        <span className="font-major text-[clamp(1.5rem,1.5vw,3rem)] inline-flex items-baseline">
          <Link href="/" className="text-white no-underline">VAKALATNAMA</Link>
        </span>
      </div>


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
                <div className={`relative h-32 border ${borderClassMap[card.type] || borderClassMap.n} rounded-lg`}>
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

      <div className="flex justify-end items-baseline px-4 pb-4 text-[clamp(1rem,1vw,1.5rem)] text-neutral-400">
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