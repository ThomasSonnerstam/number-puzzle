import "./App.css";
import GameGrid from "./pages/GameGrid/GameGrid";

function App() {
  return (
    <div className="App">
      <h2>Sliding puzzle game!</h2>
      <p style={{ marginBottom: "20px" }}>Try to order the tiles in order</p>
      <GameGrid />
    </div>
  );
}

export default App;
