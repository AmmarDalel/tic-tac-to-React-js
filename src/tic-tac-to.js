import { useState } from "react";

function Square({value , handlechange , iswinner }){
    return <button className={`square ${iswinner? 'squarewinner' :''}`} onClick={handlechange} id="btn" >
                {value}
            </button>
          
}

function Board({squares,xIsNext,onPlay}){
  let squareswinner =Array(3).null ;
  
    
    function handlechange(index){
       
        if (squares[index] || calculateWinner(squares) ) {
            return;
          }
        const nextSquares = squares.slice();
        xIsNext?  nextSquares[index]='X'  : nextSquares[index]='O' ;
     
        onPlay(nextSquares) ;
        return ;
    }

    const winner=calculateWinner(squares ) ;
    let status ;
   
    let isnull=0 ; 
    let gameover=false ;
    for(let i=0;i<9;i++){
      if(squares[i]!=null){ isnull+=1 ; }
      if(isnull===9)gameover=true ;
    }
    if(winner){
        status="Winner : "+squares[winner[0]] ;
        squareswinner=winner;

    }
    else if(!winner && gameover ){
      status="Game Over : No winner !"
    }
    else {
        status="Next player : "+(xIsNext?  "X" : "O")
    }
  

    return <>

        { [0,1,2].map(row=>(
            <div className="square-row" key={row}>
                {
                    [0,1,2].map(

                        column=>{
                            let iswinner=false ;
                            const index = row * 3 + column;
                           for(let i=0;i<3;i++){
                              if (squareswinner!=undefined && squareswinner[i]==index){ 
                                iswinner=true ;
                              }
                            }
                           return(
                                <Square value={squares[index]} handlechange={()=>handlechange(index)} key={index} iswinner={iswinner} />
                            ) } ) 
                }
            </div>
            
            
        ) ) }
         <div className="status">{status}</div>


       </>

}




  export default function Game(){
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove , setCurrentMove]=useState(0);
    const xIsNext=currentMove %2===0 ;
    const currentSquares = history[currentMove];


    function handlePlay(nextSquares) {
       const nextHistory=[...history.slice(0,currentMove+1),nextSquares];
       setHistory(nextHistory) ;
       setCurrentMove(nextHistory.length-1);
      }

      function jumpTo(nextMove){
        setCurrentMove(nextMove) ;

      }

      const moves=history.map((squares , move)=>{
        let description;
        if(move>0){
            description='Go to move #'+move ;
        }
        else{
            description='Go to game start ' ;
        }
        return(
            <li key={move}>
                <button onClick={()=>jumpTo(move)}>{description}</button>
            </li>

        )
      });

    return (
        <div className="game">
          <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
            
          </div>
        </div>
      )
    

  }


  function calculateWinner(squares ) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        
        return [a,b,c] ;
      }
    }
    return null;
  }