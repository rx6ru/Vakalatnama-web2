import Waves from "../components/Wave";
import CountUp from '../components/CountUp'
import { Button } from "@/components/ui/button"
import Socials from "@/components/ui/socials"

import "./home.css";

export default async function Home() {

  return (
    <div className="app-container">
      <div className="fixed z-10 top-6 right-6">
        <Socials />
      </div>

      <div className="content">
        <div className="font-major title">VAKALATNAMA</div>
       
        <div className="h-8 sm:h-2"></div>
       
        <div className="flex flex-col items-center justify-center gap-6 font-oswald sm:flex-row sm:gap-6">

          <a href="/petitioner">
            <Button
              variant="normal"
              b="white"
              t="black"
              className="text-xl sm:text-2xl w-[80vw] sm:w-[15dvw] h-[6dvh] sm:h-[5dvh] min-w-[140px] max-w-[320px] sm:max-w-none hover:scale-105 transition-transform duration-200 ease-out"
            >
              PETITIONER
            </Button>
          </a>

          <a href="/core">
            <Button
              variant="outline"
              b="white"
              t="white"
              ht="black"
              className="text-xl sm:text-2xl w-[80vw] sm:w-[15dvw] h-[6dvh] sm:h-[5dvh] min-w-[140px] max-w-[320px] sm:max-w-none hover:scale-105 transition-transform duration-200 ease-out"
            >
              Core0
            </Button>
          </a>

        </div>

      </div>

      <div className="text-zinc-500 pcount-container">
        <CountUp
          from={0}
          to={432}
          separator=","
          direction="up"
          duration={2}
          className="count-up-text font-oswald"
        />
        <span className="text-[4dvw] font-[400] font-space">
          PETITIONERS
        </span>
      </div>

      <Waves
        lineColor="rgba(255, 255, 255, 0.2)"
        waveSpeedX={0.04}
        waveSpeedY={0.01}
        waveAmpX={30}
        waveAmpY={20}
        friction={0.5}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={40}
      />

    </div>
  );
}