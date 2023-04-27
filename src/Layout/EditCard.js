import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import CardForm from "./CardForm";
import { readDeck, readCard } from "../utils/api";


//making the component function that will take in a submit handler as a prop
function EditCard({cardSubmitHandler}) {
  //getting the deck id from useParams
    const { deckId, cardId } = useParams();
    //using a state to store the data of the deck that matches the deckId
    const [deck, setDeck] = useState({});
    //using a state to store the data of the card that matches the cardId
    const [card, setCard] = useState({});
    //running readDeck and read card functions from utils to setState of the deck and card that matches the respective Ids
    useEffect(() => {
      readDeck(deckId).then((data) => setDeck(data));
      readCard(cardId).then((data) => setCard(data)); 
    }, []);
  return (
    <React.Fragment>
      <Nav create={false} deck={deck} type={`Edit Card ${cardId}`} />
      <div className="container">
        <h2 className="display-4 font-weight-normal">Edit card</h2>
        {/* using a form component and passing in props to make the component behave correctly for adding a card */}
        <CardForm newCard={false} deck={deck} card={card} cardSubmitHandler={cardSubmitHandler}/>
      </div>
    </React.Fragment>
  );
}

export default EditCard;