import React from "react";
import Nav from "./Nav";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";


//making the component function that will create a new deck and passing in the correct prop from the parent
function CreateForm({submitNewDeckHandler}) {
  //making a state for the new deck
    const [newDeck, setNewDeck] = useState({
        name: "",
        description: "",
    })
    //using state to determine if the new deck has been submitted
    const [submitted, setSubmitted] = useState(false);
    
    //this function prevents refresh on submit, takes in the input values of the form and updates the state of the new deck
    function makeNewDeckThenPass(event) {
        event.preventDefault();
        let newName = event.target.name.value;
        let newDescription = event.target.description.value;
        setNewDeck({
            name: newName,
            description: newDescription, 
        })
        //it will then set submitted to true so the useEffect condition to pass the new card info from the form will be met       
        setSubmitted(true);
    }
    //this will pass the new deck data into the prop of the component which will update the api with the new deck
    useEffect(() => {
        if(submitted) {
            submitNewDeckHandler(newDeck);
        }
    }, [newDeck]);
    //rendering the form and using onSubmit to run the proper functions
  return (
    <React.Fragment>
      <Nav create={true} />
      <div className="container">
        <h2 className="display-4 font-weight-normal">Create Deck</h2>
        <form onSubmit={(event => makeNewDeckThenPass(event))}>
            <div className="form-group">
            <label className="lead font-weight-normal" htmlFor="name">Name</label>
            <input className="form-control" type="text" id="name" name="name" placeholder="Deck name"></input>
            </div>
            <div className="form-group">
            <label className="lead font-weight-normal" htmlFor="description">Description</label>
            <textarea className="form-control form-control-lg" name="description" id="description" type="text" placeholder="Brief description of the deck"></textarea>
            </div>
            <Link className="btn btn-lg btn-secondary mr-2" to="/">Cancel</Link>
            <button className="btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default CreateForm;
