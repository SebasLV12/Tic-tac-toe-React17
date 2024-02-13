
import {WINNER_COMBOS}  from "../constant"

export const checkWinnerFrom=(boardToCheck)=>{
    for(const combo of WINNER_COMBOS){
      const [a,b,c]=combo
      if(boardToCheck[a] && 
        boardToCheck[a]===boardToCheck[b] &&
        boardToCheck[a]===boardToCheck[c] )
        {
          return boardToCheck[a]
        }
    }
    return null
  }

export   const checkEndGames=(newBoard)=>{

    return newBoard.every((Square)=>Square!=null)
  }