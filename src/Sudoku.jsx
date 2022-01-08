import "./Sudoku.css"
import {useState} from "react"
import Grid from "./Grid"
import NumberButtons from "./NumberButtons"
import {EASY_PUZZLES} from "./sudokuPuzzles"
import {BOX_INDEXES} from "./sudokuUtil"

// TODO: Implement game play, undo

// easy50.txt and top95.txt pulled from norvig.com.

/**
 * Top-level sudoku app component.
 */
export default function Sudoku() {
  const [gridArray, setGridArray] = useState(generateRandomSudokuPuzzle())
  const [selectedCellIndex, setSelectedCellIndex] = useState(null)

  function onNumberButtonClick(numberClicked) {
    if (selectedCellIndex === null) {
      alert("You must select a square first.")
    } else {
      if (moveIsValid(gridArray, selectedCellIndex, numberClicked)) {
        let newGridArray = [...gridArray]
        newGridArray[selectedCellIndex] = numberClicked
        setGridArray(newGridArray)
        setSelectedCellIndex(null)
      } else {
        alert(`The number ${numberClicked} cannot be placed in that square.`)
      }
    }
  }

  return (
    <div className="Sudoku">
      <Grid gridArray={gridArray} setGridArray={setGridArray} selectedCellIndex={selectedCellIndex}
            setSelectedCellIndex={setSelectedCellIndex}/>
      <NumberButtons onNumberButtonClick={onNumberButtonClick}/>
    </div>
  );
}

/**
 * Returns an array of 81 numbers where each number represents a cell on a valid sudoku puzzle.
 * Null values represent empty/hidden cells.
 */
function generateRandomSudokuPuzzle() {
  const puzzleIndex = Math.floor(Math.random() * EASY_PUZZLES.length)
  return EASY_PUZZLES[puzzleIndex]
    .split("")
    .map((num) => num === "0" ? null : num)
}

function moveIsValid(gridArray, selectedCellIndex, numberClicked) {
  return !rowContainsNumber(gridArray, numberClicked, selectedCellIndex) &&
    !columnContainsNumber(gridArray, numberClicked, selectedCellIndex) &&
    !boxContainsNumber(gridArray, numberClicked, selectedCellIndex)
}

function rowContainsNumber(gridArray, numValue, cellIndexInRow) {
  const firstRowIndex = cellIndexInRow - (cellIndexInRow % 9)
  const lastRowIndex = firstRowIndex + 8

  for (let i = firstRowIndex; i <= lastRowIndex; i++) {
    if (gridArray[i] === numValue) {
      return true
    }
  }

  return false
}

function columnContainsNumber(gridArray, numValue, cellIndexInColumn) {
  const firstColumnIndex = cellIndexInColumn % 9

  for (let multiplier = 0; multiplier < 9; multiplier++) {
    const index = firstColumnIndex + multiplier * 9
    if (gridArray[index] === numValue) {
      return true
    }
  }

  return false
}

function boxContainsNumber(gridArray, numValue, cellIndexInBox) {
  for (let indexesForBox of BOX_INDEXES) {
    if (indexesForBox.includes(cellIndexInBox)) {
      for (let index of indexesForBox) {
        if (gridArray[index] === numValue) {
          return true
        }
      }
    }
  }

  return false
}
