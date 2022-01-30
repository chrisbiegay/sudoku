import "./Sudoku.css"
import {useState} from "react"
import Grid from "./Grid"
import NumberButtons from "./NumberButtons"
import {EASY_PUZZLES} from "./sudokuPuzzles"
import {BOX_INDEXES} from "./sudokuUtil"

// todo: optimize for mobile devices

/*
 * Terminology:
 *   - Grid: a 9x9 sudoku puzzle.
 *   - Cell/square: a square that holds a number in the grid.
 *   - Box: a 3x3 square containing 9 cells.
 *
 * Sample puzzles in easy50.txt and top95.txt pulled from norvig.com.
 */

/**
 * Top-level sudoku app component.
 */
export default function Sudoku() {
  const [gridArray, setGridArray] = useState(generateRandomSudokuPuzzle())
  const [gridArrayHistory, setGridArrayHistory] = useState([gridArray])
  const [selectedCellIndex, setSelectedCellIndex] = useState(null)

  function onNumberButtonClicked(numberClicked) {
    if (selectedCellIndex === null) {
      alert("You must select a square first.")
    } else {
      if (isNumberEntryValid(gridArray, selectedCellIndex, numberClicked)) {
        let newGridArray = [...gridArray]
        newGridArray[selectedCellIndex] = numberClicked
        setGridArray(newGridArray)

        let newGridArrayHistory = [...gridArrayHistory]
        newGridArrayHistory.push(newGridArray)
        setGridArrayHistory(newGridArrayHistory)

        setSelectedCellIndex(null)
      } else {
        alert(`That is not a valid square for the number ${numberClicked}.`)
      }
    }
  }

  function onUndoClicked() {
    if (gridArrayHistory.length > 1) {
      let newGridArrayHistory = [...gridArrayHistory]
      newGridArrayHistory.pop()
      setGridArrayHistory(newGridArrayHistory)

      const newGridArray = [...newGridArrayHistory[newGridArrayHistory.length - 1]]
      setGridArray(newGridArray)

      setSelectedCellIndex(null)
    }
  }

  function onResetClicked() {
    if (gridArrayHistory.length > 1) {
      const newGridArray = [...gridArrayHistory[0]]
      setGridArray(newGridArray)

      let newGridArrayHistory = [newGridArray]
      setGridArrayHistory(newGridArrayHistory)

      setSelectedCellIndex(null)
    }
  }

  return (
    <div className="Sudoku">
      <Grid gridArray={gridArray} selectedCellIndex={selectedCellIndex} setSelectedCellIndex={setSelectedCellIndex}/>
      <NumberButtons onNumberButtonClick={onNumberButtonClicked}/>
      <div className={"undo-buttons"}>
        <button onClick={onUndoClicked}>Undo</button>
        <button onClick={onResetClicked}>Reset</button>
      </div>
      <p className={"more-to-come"}>(More to come...)</p>
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

function isNumberEntryValid(gridArray, cellIndex, numberToEnter) {
  return !rowContainsNumber(gridArray, numberToEnter, cellIndex) &&
    !columnContainsNumber(gridArray, numberToEnter, cellIndex) &&
    !boxContainsNumber(gridArray, numberToEnter, cellIndex)
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
