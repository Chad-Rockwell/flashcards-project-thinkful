import React from "react";
import ReactDOM from "react-dom";
import { listDecks, createDeck, updateDeck } from "../utils/api";
import { useState, useEffect } from "react";
import Home from "./Home";
import Study from "./Study";
import Deck from "./Deck";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateForm from "./CreateForm";

function Layout() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  function submitNewDeckHandler(deck) {
    createDeck(deck).then((data) => history.push(`/decks/${data.id}`));
  }

  function editDeckHandler(updatedDeck) {
    updateDeck(updatedDeck).then((data) => history.push(`/decks/${data.id}`))
  }

  useEffect(() => {
    listDecks().then((data) => setDecks(data));
  }, []);

  return (
    <React.Fragment>
      <Header />

      <div className="container-fluid">
        <Switch>
          <Route exact path="/">
            <Home decks={decks} />
          </Route>
          <Route path={"/decks/:deckId/cards/new"}>
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/new">
            <CreateForm submitNewDeckHandler={submitNewDeckHandler} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck editDeckHandler={editDeckHandler}/>
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;
