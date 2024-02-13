import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS } from './constant'
import { checkWinnerFrom,checkEndGames } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { BoardTable } from './components/BoardTable.jsx'
import { saveGameToStorage,resetGameStorage} from './logic/storage/index.js'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })
  const [turn,setTurn]=useState(()=>{
    const turnFromStorage=window.localStorage.getItem('turn')
    return turnFromStorage?? TURNS.x
  })

  const [winner,setWinner]=useState(null)


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)

    resetGameStorage()
  }


  const updateBoard=(index)=>{
    if(board[index] || winner) return
    const newBoard=[...board]
    newBoard[index]=turn
    setBoard(newBoard)

    const newTurn=turn===TURNS.x? TURNS.o:TURNS.x
    setTurn(newTurn)
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    const newWinner=checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner((newWinner))
    }else if(checkEndGames(newBoard)){
      setWinner(false)
    }
  }
  return (
   <main className='board'>
      <h1>tic tac toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <BoardTable board={board} updateBoard={updateBoard}/>
      <section className='turn'>
          <Square isSelected={turn===TURNS.x}>{TURNS.x}</Square>
          <Square isSelected={turn===TURNS.o}>{TURNS.o}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame}/>

   </main>
  )
}

export default App
