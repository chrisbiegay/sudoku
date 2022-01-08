import "./Grid.css"

export default function Grid(props) {
  const {gridArray, setGridArray, selectedCellIndex, setSelectedCellIndex} = props

  return (
    <div className={"sudoku-grid"}>
      {
        // todo: use BOX_INDEX_ARRAYS
        [0, 3, 6, 27, 30, 33, 54, 57, 60].map((index) => {
          return <SudokuBox key={index} gridArray={gridArray} startIndex={index}
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
  const {gridArray, startIndex, selectedCellIndex, setSelectedCellIndex} = props

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
        [0, 1, 2, 9, 10, 11, 18, 19, 20].map((indexInBox) => {
          const gridIndex = startIndex + indexInBox
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
