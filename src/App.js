import React from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { wonEggForDay, wonChickenForDay, wonChickenSinceDay } from "./helpers";

import {createSelector} from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { egg, chickenWin, chickenLose } from "./eggAndChickenSlice";

const App = ({ state, totalWon, meanWon, egg, chickenWin, chickenLose }) => {
  const [notice, setNotice] = React.useState("Fai la tua scelta :3");

  const dispatchEgg = () => {
    setNotice("Hai preso i soldi sicuri ;) Vuoi provare ancora?");
    egg();
  };

  const dispatchChicken = () => {
    if (Math.random() < 0.53) {
      setNotice(
        "Hai scelto di scommettere e ti è andata bene :) Che cosa scegli oggi?"
      );
      chickenWin();
    } else {
      setNotice("Hai scelto di scommettere ma ti è andata male :( Ritenta!");
      chickenLose();
    }
  };
  return (
    <Container className="p-3">
      <h1>Un vostro amico matematico vuole farvi un regalo</h1>
      <p>Vi lascia la possibilità di scegliere tra un euro e venti euro.</p>
      <p>
        La scelta sarebbe scontata se non fosse per questa regola ulteriore:
      </p>
      <blockquote>
        "se sceglierai la cifra minore avrai il 53% di possibilità che io ti
        faccia la stessa proposta domani, ma con il doppio delle cifre, ed il
        gioco proseguirà ad libitum. Nel 47% delle volte invece il gioco
        terminerà immediatamente e tu intascherai un euro. Se sceglierai invece
        la cifra superiore il gioco si concluderà immantinente."
      </blockquote>
      <p>Cosa sceglierete? Quali riflessioni fareste?</p>

      <h2>Gioco del mese</h2>
      <p>Mese: {state.month}</p>
      <p>Giorno: {state.day}</p>
      <p>Vincite attuali: {wonChickenSinceDay(state.day - 1)}</p>

      <button className="btn btn-primary" onClick={dispatchEgg}>
        Scegli {wonEggForDay(state.day)}€ oggi
      </button>
      <button className="btn btn-secondary" onClick={dispatchChicken}>
        Scegli {wonChickenForDay(state.day)}€ oggi e forse questo gioco
        raddoppiato domani
      </button>
      <Alert variant="info">{notice}</Alert>

      {state.history.length > 0 ? <h2>Storico (vincite totali: {totalWon}€. Media: {meanWon}€)</h2> : null}
      {state.history.map(({ month, day, won }) => (
        <p key={month}>
          Mese {month}: hai vinto {won}€ ({day} giorn{day === 1 ? "o" : "i"})
        </p>
      ))}
    </Container>
  );
};

const selectHistory = state => state.history
const selectTotalWon = createSelector(
  [selectHistory],
  (history) => history.map(({won}) => won).reduce((t, i) => t + i, 0)
)
const selectMeanWon = createSelector(
  [selectHistory, selectTotalWon],
  (history, totalWon) => {
    if (!history.length) return null
    return (totalWon / history.length).toFixed(1)
  }
)

const mapState = (state) => ({ state, totalWon: selectTotalWon(state), meanWon: selectMeanWon(state) });

const mapDispatch = { egg, chickenWin, chickenLose };

export default connect(mapState, mapDispatch)(App);
