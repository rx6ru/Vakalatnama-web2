"use client"

import Link from "next/link"

import TextPressure from '../../components/TextPressure';
import Squares from '../../components/Squares';
import PixelCard from '../../components/PixelCard';

export default function PetitionerPage() {
  const cards = [
    {
      id: 1,
      title: "Expense Sheet",
      href: "https://docs.google.com/spreadsheets/d/1bFkV3uIhbLYh0AYfxZ4ivm6B9o9AtXDqiMPmVb5g6DY/edit?usp=sharing",
      type: "x", // normal
    },
    {
      id: 2,
      title: "Balance Sheet",
      href: "https://docs.google.com/spreadsheets/d/12jr-KDq2fCsH4uk0SctHet205nLxX-h-65wzVwkB2-k/edit?usp=drive_link",
      type: "x", // yellow
    },
    {
      id: 3,
      title: "Notice [Defaulters]",
      href: "https://drive.google.com/file/d/1wDldvUDtaDjj5-PCThdf7Z49hWVUhEE9/view?usp=drive_link",
      type: "n", // red
    },
  ];

  // Map type to PixelCard variant and border styling
  const variantMap: Record<string, "default" | "yellow" | "pink"> = {
    n: "default",  // normal
    x: "pink",     // red-themed
    y: "yellow",   // yellow-themed
  };
  const borderClassMap: Record<string, string> = {
    n: "border-neutral-500",
    x: "border-red-500",
    y: "border-yellow-400",
  };

  return (
    <div className="flex flex-col h-screen">
      <Link href="/">
        <span className="font-major text-[clamp(1.5rem,1.5vw,3rem)] m-[clamp(1.5rem,2.5dvw,1dvw)] inline-flex items-baseline">
          VAKALATNAMA
        </span>
      </Link>

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
            mt-2 sm:mt-3 md:mt-4 lg:mt-5
            mx-auto flex items-center justify-center
            w-[70vw] sm:w-[80vw] md:w-[65vw] lg:w-[50vw] xl:w-[40vw] 2xl:w-[35vw]
            min-h-[8rem] max-h-[12rem]
          "
        >
          <TextPressure
            text="Welcome   Petitioner"
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

      <div className="flex items-center justify-center flex-grow p-4">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {cards.map(card => (
            <Link
              key={card.id}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={`relative w-full h-32 border ${borderClassMap[card.type] || borderClassMap.n} rounded-lg`}>
                <PixelCard
                  variant={variantMap[card.type] || variantMap.n}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 flex items-center justify-center p-2 text-center">
                    <h3 className="text-lg font-semibold text-white">
                      {card.title}
                    </h3>
                  </div>
                </PixelCard>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
