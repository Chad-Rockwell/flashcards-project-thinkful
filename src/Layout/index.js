import React from "react";
import ReactDOM from "react-dom";
import {
  listDecks,
  createDeck,
  updateDeck,
  updateCard,
  createCard,
  deleteDeck,
  deleteCard,
} from "../utils/api";
import { useState, useEffect } from "react";
import Home from "./Home";
import Study from "./Study";
import DeckList from "./DeckList";
import Deck from "./Deck";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateForm from "./CreateForm";

//this function will display the layout of the app and has the necessary functions and data to make the app work correctly
function Layout() {
  //setting a state for the decks data to be stored after a fetch in a useEffect function
  const [decks, setDecks] = useState([]);
  //declaring history so we can use that router function
  const history = useHistory();
  //the following functions are to be passed in as props to child components so actions in those components will behave as expected
  //each function will be called with the correct data passed in from the child component
  //that data will be used to run a function from the utils/api
  //functions that update the decks array will trigger the useEffect that fetches the decks to refresh
  //useHistory hook will be used to navigate to the right page after the function updates the data in the API
  function submitNewDeckHandler(deck) {
    createDeck(deck).then((data) => {
      fetchDecks();
      history.push(`/decks/${data.id}`);
    });
  }

  function editDeckHandler(updatedDeck) {
    updateDeck(updatedDeck).then((data) => {
      fetchDecks();
      history.push(`/decks/${data.id}`);
    });
  }

  function cardSubmitHandler(deckId, card, newCard) {
    newCard
      ? createCard(deckId, card)
      : updateCard(card).then((data) => history.push(`/decks/${deckId}`));
  }

  function deleteDeckHandler(deckId) {
    if (
      window.confirm("Delete this Deck?\n\nYou will not be able to recover it.")
    ) {
      deleteDeck(deckId).then((data) => {
        history.push("/");
        fetchDecks();
      });
    } else {
    }
  }

  function deleteCardHandler(cardId, deckId) {
    if (
      window.confirm("Delete this Card?\n\nYou will not be able to recover it.")
    ) {
      deleteCard(cardId).then((data) => history.push(`/decks/${deckId}`));
    } else {
    }
  }

  function fetchDecks() {
    listDecks().then((data) => setDecks(data));
  }

  useEffect(fetchDecks, []);
  //rendering all the child components when the correct route is accessed/inputted into the browser
  //paths also contain what is needed for child components to properly utilize useParams
  return (
    <React.Fragment>
      <Header />

      <div className="container-fluid">
        <Switch>
          <Route exact path="/">
            <React.Fragment>
              <Home />
              {decks.map((deck, i) => {
                return (
                  <DeckList
                    key={i}
                    deck={deck}
                    deleteDeckHandler={deleteDeckHandler}
                  />
                );
              })}
            </React.Fragment>
          </Route>
          <Route path={"/decks/:deckId/cards/:cardId/edit"}>
            <EditCard cardSubmitHandler={cardSubmitHandler} />
          </Route>
          <Route path={"/decks/:deckId/cards/new"}>
            <AddCard cardSubmitHandler={cardSubmitHandler} />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/new">
            <CreateForm submitNewDeckHandler={submitNewDeckHandler} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck editDeckHandler={editDeckHandler} />
          </Route>
          <Route path="/decks/:deckId">
            <Deck
              deleteDeckHandler={deleteDeckHandler}
              deleteCardHandler={deleteCardHandler}
            />
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
