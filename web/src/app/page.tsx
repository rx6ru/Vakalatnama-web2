import Waves from "../components/Wave";
import CountUp from '../components/CountUp'
import Link from "next/link";
import "./home.css"; 
export default function Home() {
  return (
    <div className="app-container">
      <div className="content">
        <div className="font-major title">VAKALATNAMA</div>
        <Link href="/petitioner">
          <span className="text-3xl font-oswald">PETITIONER</span>
        </Link>

      </div>

      <div className=" text-zinc-500 pcount-container">
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
