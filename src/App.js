import { useState } from 'react';
import './App.css';

export const App = () => {

  const [hole, setHole] = useState([{
    'column-0': [0, 1, 2, 3, 4, 5],
    'column-1': [0, 1, 2, 3, 4, 5],
    'column-2': [0, 1, 2, 3, 4, 5],
    'column-3': [0, 1, 2, 3, 4, 5],
    'column-4': [0, 1, 2, 3, 4, 5],
    'column-5': [0, 1, 2, 3, 4, 5],
    'column-6': [0, 1, 2, 3, 4, 5],
  }]);

  const mapper = [0, 1, 2, 3, 4, 5, 6];
  const [playerTurn, setPlayerTurn] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [pointsYellow, setPointsYellow] = useState(0);
  const [pointsRed, setPointsRed] = useState(0);
  let newArrayHole = [...hole];
  let color;

  const resetGame = (colorWinner) => {
    playerTurn ? setPointsYellow(pointsYellow + 1) : setPointsRed(pointsRed + 1);
    setClicks(0);
    alert(colorWinner + ' WINNER');
    setHole([{
      'column-0': [0, 1, 2, 3, 4, 5],
      'column-1': [0, 1, 2, 3, 4, 5],
      'column-2': [0, 1, 2, 3, 4, 5],
      'column-3': [0, 1, 2, 3, 4, 5],
      'column-4': [0, 1, 2, 3, 4, 5],
      'column-5': [0, 1, 2, 3, 4, 5],
      'column-6': [0, 1, 2, 3, 4, 5],
    }])
  }

  const handleColumn = (nro) => {

    if (hole[0][`column-${nro}`][0] === 0) {
      playerTurn ? color = 'yellow' : color = 'red';
      setPlayerTurn(!playerTurn);
      setClicks(clicks + 1);
    }

    if (hole[0][`column-${nro}`][5] === 5) {
      newArrayHole[0][`column-${nro}`][5] = color + ' animate__animated animate__fadeInDownBig';
    } else if (hole[0][`column-${nro}`][4] === 4) {
      newArrayHole[0][`column-${nro}`][4] = color + ' animate__animated animate__fadeInDownBig';
    } else if (hole[0][`column-${nro}`][3] === 3) {
      newArrayHole[0][`column-${nro}`][3] = color + ' animate__animated animate__fadeInDownBig';
    } else if (hole[0][`column-${nro}`][2] === 2) {
      newArrayHole[0][`column-${nro}`][2] = color + ' animate__animated animate__fadeInDownBig';
    } else if (hole[0][`column-${nro}`][1] === 1) {
      newArrayHole[0][`column-${nro}`][1] = color + ' animate__animated animate__fadeInDownBig';
    } else if (hole[0][`column-${nro}`][0] === 0) {
      newArrayHole[0][`column-${nro}`][0] = color + ' animate__animated animate__fadeInDownBig';
    }
    setHole(newArrayHole)

    for (let i = 0; i < 3; i++) {
      if (
        hole[0][`column-${nro}`][i + 3] !== 5 &&
        hole[0][`column-${nro}`][i + 3] === hole[0][`column-${nro}`][i + 2] &&
        hole[0][`column-${nro}`][i + 2] === hole[0][`column-${nro}`][i + 1] &&
        hole[0][`column-${nro}`][i + 1] === hole[0][`column-${nro}`][i]
      ) {
        return setTimeout(() => { resetGame(color) }, 50);
      }
    }
    for (let i = 0; i < 6; i++) {
      for (let x = 0; x < 4; x++) {
        if (
          hole[0][`column-${x}`][i] !== i &&
          hole[0][`column-${x}`][i] === hole[0][`column-${x + 1}`][i] &&
          hole[0][`column-${x + 1}`][i] === hole[0][`column-${x + 2}`][i] &&
          hole[0][`column-${x + 2}`][i] === hole[0][`column-${x + 3}`][i]
        ) {
          return setTimeout(() => { resetGame(color) }, 50);
        }
      }
    }

    if (clicks >= 41) {
      resetGame('No one is the');
    }
  }

  return (
    <div className="game">
      <h1>Four in a row</h1>
      <h3 className=''><div className='yellowText'>Yellow {pointsYellow}</div> - <div className='redText'>{pointsRed} Red</div></h3>
      <div className='board'>
        {
          mapper.map(numberHorizontal => (
            <div className={'column ' + numberHorizontal} key={'column ' + numberHorizontal} onClick={() => handleColumn(numberHorizontal)}>
              {
                mapper.map(numberVertical => {
                  if (numberVertical >= 6) {
                    return false
                  }
                  return (
                    <div className={`hole ${hole[0][`column-${numberHorizontal}`][numberVertical]}`} key={'hole' + numberHorizontal + numberVertical}></div>
                  )
                })
              }
            </div>
          ))
        }
        <h3>Turn of: <div className={playerTurn ? 'yellowText' : 'redText'}>{playerTurn ? 'yellow' : 'red'}</div></h3>
      </div>
    </div>
  );
}