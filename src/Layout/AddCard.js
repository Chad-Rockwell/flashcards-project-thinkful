import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import CardForm from "./CardForm";

function AddCard() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);

    useEffect(() => {
      readDeck(deckId).then((data) => setDeck(data));
    }, []);
  return (
    <React.Fragment>
      <Nav create={false} deck={deck} type="Add Card" />
    </React.Fragment>
  );
}

export default AddCard;
