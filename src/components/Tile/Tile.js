import React from "react";
import styles from "./Tile.module.css";

const Tile = ({ number, onClick, gridSize }) => {
  const emptyTile = gridSize ** 2;
  return (
    <div className={styles.tile} onClick={onClick}>
      {number === emptyTile ? "" : number}
    </div>
  );
};

export default Tile;
