import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import CardForm from "./CardForm";
import { readDeck, readCard } from "../utils/api";

function EditCard({cardSubmitHandler}) {
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});

    useEffect(() => {
      readDeck(deckId).then((data) => setDeck(data));
      readCard(cardId).then((data) => setCard(data)); 
    }, []);
  return (
    <React.Fragment>
      <Nav create={false} deck={deck} type={`Edit Card ${cardId}`} />
      <div className="container">
        <h2 className="display-4 font-weight-normal">Edit card</h2>
        <CardForm newCard={false} deck={deck} card={card} cardSubmitHandler={cardSubmitHandler}/>
      </div>
    </React.Fragment>
  );
}

export default EditCard;