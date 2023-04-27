import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import CardForm from "./CardForm";
import { readDeck } from "../utils/api";

function AddCard({cardSubmitHandler}) {
    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);

    useEffect(() => {
      readDeck(deckId).then((data) => setDeck(data));
    }, []);
  return (
    <React.Fragment>
      <Nav create={false} deck={deck} type="Add Card" />
      <div className="container">
        <h2 className="display-5 font-weight-normal">{deck.name}: Add card</h2>
        <CardForm newCard={true} deck={deck} cardSubmitHandler={cardSubmitHandler}/>
      </div>
    </React.Fragment>
  );
}

export default AddCard;
