import Waves from "../components/Wave";
import "./home.css"; 
export default function Home() {
  return (
    <div className="app-container">
      <div className="content">
        <div className="title font-major text-3xl">VAKALATNAMA</div>
      </div>
      
      <Waves
        lineColor="rgb(255, 255, 255)"
        waveSpeedX={0.03}
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

