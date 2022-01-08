import "./Grid.css"
import {BOX_INDEXES} from "./sudokuUtil"

export default function Grid(props) {
  const {gridArray, selectedCellIndex, setSelectedCellIndex} = props

  return (
    <div className={"sudoku-grid"}>
      {
        BOX_INDEXES.map((boxIndexes) => {
          return <SudokuBox key={boxIndexes[0]} gridArray={gridArray} boxIndexes={boxIndexes}
                            selectedCellIndex={selectedCellIndex} setSelectedCellIndex={setSelectedCellIndex}/>
        })
      }
    </div>
  )
}

/**
 * Sudoku box containing 9 cells.
 */
function SudokuBox(props) {
  const {gridArray, boxIndexes, selectedCellIndex, setSelectedCellIndex} = props

  function onCellClick(gridIndex) {
    if (gridArray[gridIndex] !== null) {
      return
    }

    if (gridIndex === selectedCellIndex) {
      setSelectedCellIndex(null)
    } else {
      setSelectedCellIndex(gridIndex)
    }
  }

  return (
    <div className={"sudoku-box"}>
      {
        boxIndexes.map((gridIndex) => {
          let className = "sudoku-cell"
          if (gridIndex === selectedCellIndex) {
            className += " selected"
          }
          return (
            <div key={gridIndex} className={className} onClick={() => onCellClick(gridIndex)}>
              {gridArray[gridIndex]}
            </div>)
        })
      }
    </div>
  )
}
