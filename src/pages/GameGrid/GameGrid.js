import React, { useCallback, useEffect, useState } from "react";
import Tile from "../../components/Tile/Tile";
import styles from "./GameGrid.module.css";
import { Button, useMediaQuery } from "@mui/material";
import WinModal from "../../components/WinModal/WinModal";

const GameGrid = () => {
  const [gridSize, setGridSize] = useState(4);
  const [tiles, setTiles] = useState([]);
  const [hasCheated, setHasCheated] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const buttonStyling = {
    margin: isMobile ? "5px 0" : "0 5px",
    fontFamily: "Open Sans",
  };

  const hasUserWon = useCallback(() => {
    const winningArrangement = Array.from(
      { length: gridSize ** 2 },
      (_, i) => i + 1
    );
    return tiles.every((tile, index) => tile === winningArrangement[index]);
  }, [gridSize, tiles]);

  const setNearWinArrangement = useCallback(() => {
    const nearWinArrangement = Array.from(
      { length: gridSize ** 2 },
      (_, i) => i + 1
    );
    const lastIndex = nearWinArrangement.length - 1;
    [nearWinArrangement[lastIndex - 1], nearWinArrangement[lastIndex]] = [
      nearWinArrangement[lastIndex],
      nearWinArrangement[lastIndex - 1],
    ];
    setTiles(nearWinArrangement);
    setHasCheated(true);
  }, [gridSize]);

  const shuffleTiles = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    setHasCheated(false);
    return shuffledArray;
  };

  const isSolvable = useCallback(
    (tiles) => {
      let inversions = 0;
      for (let i = 0; i < tiles.length; i++) {
        for (let j = i + 1; j < tiles.length; j++) {
          if (
            tiles[i] !== tiles.length &&
            tiles[j] !== tiles.length &&
            tiles[i] > tiles[j]
          ) {
            inversions++;
          }
        }
      }
      const blankRow = Math.floor(tiles.indexOf(tiles.length) / gridSize);
      return (inversions + blankRow) % 2 === 0;
    },
    [gridSize]
  );

  const shuffleGameGrid = useCallback(() => {
    const initialTiles = Array.from({ length: gridSize ** 2 }, (_, i) => i + 1);
    let shuffledTiles;
    do {
      shuffledTiles = shuffleTiles(initialTiles);
    } while (!isSolvable(shuffledTiles));
    setTiles(shuffledTiles);
  }, [gridSize, isSolvable]);

  useEffect(() => {
    shuffleGameGrid();
  }, [gridSize, shuffleGameGrid]);

  const handleTileClick = (index) => {
    const emptyIndex = tiles.indexOf(tiles.length);
    const row = Math.floor(index / gridSize);
    const column = index % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyColumn = emptyIndex % gridSize;

    if (
      (row === emptyRow && Math.abs(column - emptyColumn) === 1) ||
      (column === emptyColumn && Math.abs(row - emptyRow) === 1)
    ) {
      const newTiles = tiles.slice();
      // Här byter jag plats på den tile man klickar på och den som är tom
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      // Här sätter vi den nya arrayen med tiles
      setTiles(newTiles);
    }
  };

  return (
    <section className={styles.gameGridWrapper}>
      {hasUserWon() && (
        <WinModal hasUserWon={hasUserWon} hasCheated={hasCheated} />
      )}
      <div className={styles.gameBoard} style={{ "--grid-size": gridSize }}>
        {tiles.map((number, index) => (
          <Tile
            key={index}
            number={number}
            onClick={() => handleTileClick(index)}
            gridSize={gridSize}
          />
        ))}
      </div>
      <h3 style={{ marginBottom: "20px" }}>Select grid size</h3>
      <div className={styles.buttonWrapper}>
        <Button
          onClick={() => setGridSize(3)}
          variant="contained"
          className={styles.button}
          sx={buttonStyling}
        >
          3x3
        </Button>
        <Button
          onClick={() => setGridSize(4)}
          variant="contained"
          className={styles.button}
          sx={buttonStyling}
        >
          4x4
        </Button>
        <Button
          onClick={() => setGridSize(5)}
          variant="contained"
          className={styles.button}
          sx={buttonStyling}
        >
          5x5
        </Button>
        <Button
          variant="contained"
          onClick={shuffleGameGrid}
          className={styles.button}
          sx={buttonStyling}
        >
          Shuffle
        </Button>
      </div>
      <p>Cheat mode</p>
      <Button
        variant="contained"
        onClick={setNearWinArrangement}
        className={styles.button}
        sx={buttonStyling}
      >
        Don't click me
      </Button>
    </section>
  );
};

export default GameGrid;
