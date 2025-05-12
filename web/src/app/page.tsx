import Waves from "../components/Wave";
import "./home.css"; 
export default function Home() {
  return (
    <div className="app-container">
      <div className="content">
        <div className="title font-major"> VAKALATNAMA </div>
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

