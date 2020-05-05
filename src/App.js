import React from 'react';
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

const wonEggForDay = day => 20 * 2**(day - 1)
const wonChickenForDay = day => 2**(day - 1)

const wonChickenSinceDay = day => {
  if (day === 0) return 0
  return wonChickenForDay(day) + wonChickenSinceDay(day - 1)
}

const initialState = {
  month: 1,
  day: 1,
  history: []
}

function reducer(state, action) {
  switch (action.type) {
    case 'egg':
      return {
        month: state.month + 1,
        day: 1,
        history: [{
          month: state.month,
          day: state.day,
          won: wonEggForDay(state.day) + wonChickenSinceDay(state.day - 1)
        }, ...state.history]
      };
    case 'chicken-win':
        return {
          month: state.month,
          day: state.day + 1,
          history: state.history
        };
    case 'chicken-lose':
        return {
          month: state.month + 1,
          day: 1,
          history: [{
            month: state.month,
            day: state.day,
            won: wonChickenSinceDay(state.day)
          }, ...state.history]
        };
    default:
      throw new Error();
  }
}

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const [notice, setNotice] = React.useState('Fai la tua scelta :3')

  const dispatchEgg = () => {
    setNotice('Hai preso i soldi sicuri ;) Vuoi provare ancora?')
    dispatch({type: 'egg'})
  }

  const dispatchChicken = () => {
    if (Math.random() < 0.53) {
      setNotice('Hai scelto di scommettere e ti è andata bene :) Che cosa scegli oggi?')
      dispatch({type: 'chicken-win' })
    } else {
      setNotice('Hai scelto di scommettere ma ti è andata male :( Ritenta!')
      dispatch({type: 'chicken-lose' })
    }
  }
  return (
  <Container className="p-3">
        <h1>Un vostro amico matematico vuole farvi un regalo</h1>
      <p>
        Vi lascia la possibilità di scegliere tra un euro e venti euro.
      </p>
      <p>
        La scelta sarebbe scontata se non fosse per questa regola ulteriore:
      </p>
        <blockquote>

        "se sceglierai la cifra minore avrai il 53% di possibilità che io ti faccia la stessa proposta domani,
        ma con il doppio delle cifre, ed il gioco proseguirà ad libitum.
        Nel 47% delle volte invece il gioco terminerà immediatamente e tu intascherai un euro.
        Se sceglierai invece la cifra superiore il gioco si concluderà immantinente."
        </blockquote>
        <p>

        Cosa sceglierete? Quali riflessioni fareste?
        </p>

      <h2>Gioco del mese</h2>
      <p>Mese: {state.month}</p>
      <p>Giorno: {state.day}</p>
      <p>Vincite attuali: {wonChickenSinceDay(state.day - 1)}</p>


      <button className="btn btn-primary" onClick={dispatchEgg}>Scegli {wonEggForDay(state.day)}€ oggi</button>
      <button className="btn btn-secondary" onClick={dispatchChicken}>Scegli {wonChickenForDay(state.day)}€ oggi e forse questo gioco raddoppiato domani</button>
      <Alert variant="info">{notice}</Alert>

      {state.history.length > 0 ? <h2>Storico</h2> : null }
      {state.history.map(({month, day, won}) => <p key={month}>Mese {month}: hai vinto {won}€ ({day} giorn{day === 1 ? 'o' : 'i'})</p>)}
    </Container>
  );
}

export default App;
