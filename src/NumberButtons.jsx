import "./NumberButtons.css"

export default function NumberButtons(props) {
  const {onNumberButtonClick} = props

  return (
    <div className={"number-buttons"}>
      {
        [...new Array(9).keys()].map((index) => {
          const number = (index + 1).toString()
          return <button key={number} onClick={() => onNumberButtonClick(number)}>{number}</button>
        })
      }
    </div>
  )
}