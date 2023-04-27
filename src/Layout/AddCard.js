import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import CardForm from "./CardForm";
import { readDeck } from "../utils/api";


//making the component function that will take in a submit handler as a prop
function AddCard({cardSubmitHandler}) {
  //getting the deck id from useParams
    const { deckId } = useParams();
    //using a state to store the data of the deck that matches the deckId
    const [deck, setDeck] = useState([]);
    //running readDeck function from utils to setState of the deck that matches the Id
    useEffect(() => {
      readDeck(deckId).then((data) => setDeck(data));
    }, []);
    //building what the component will render
  return (
    <React.Fragment>
    {/* inserting the nav component I built, that takes in props */}
      <Nav create={false} deck={deck} type="Add Card" />
    {/* making a container to hold the page/component content and display the name of the deck in the header*/}
      <div className="container">
        <h2 className="display-5 font-weight-normal">{deck.name}: Add card</h2>
        {/* using a form component and passing in props to make the component behave correctly for adding a card */}
        <CardForm newCard={true} deck={deck} cardSubmitHandler={cardSubmitHandler}/>
      </div>
    </React.Fragment>
  );
}

export default AddCard;
