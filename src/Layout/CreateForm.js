import React from "react";
import Nav from "./Nav";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function CreateForm({submitNewDeckHandler}) {
    const [newDeck, setNewDeck] = useState({
        name: "",
        description: "",
    })
    const [submitted, setSubmitted] = useState(false);

    function makeNewDeckThenPass(event) {
        event.preventDefault();
        let newName = event.target.name.value;
        let newDescription = event.target.description.value;
        setNewDeck({
            name: newName,
            description: newDescription, 
        })        
        setSubmitted(true);
    }

    useEffect(() => {
        console.log("this should be the new deck", newDeck, submitted)
        if(submitted) {
            submitNewDeckHandler(newDeck);
        }
    }, [newDeck]);

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
