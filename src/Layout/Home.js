import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";

function Home() {
  const history = useHistory();

  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck() {
      try {
        const response = await listDecks({ signal: abortController.signal });
        setDecks(response);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    getDeck();

    return () => abortController.abort();
  }, []);

  async function handleDeleteDeck(deckId) {
    try {
      if (window.confirm("Delete deck?")) {
        await deleteDeck(deckId);
        history.go(0);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted");
      } else {
        throw error;
      }
    }
  }

  return (
    <div>
      <div>
        <Link to={"/decks/new"}>
          <button type="button" className="btn btn-secondary">
            Create Deck
          </button>
        </Link>
      </div>
      <div>
        {decks.map((deck) => (
          <div className="d-grid gap-2 d-md-block mt-2 mb-4" key={deck}>
            <div className="card w-75">
              <div className="card-header bg-light">
                <h3 className="float-left">{deck.name}</h3>
                <p className="float-right">{deck.cards.length} cards</p>
              </div>
              <div className="card-body">
                <p className="card-text">{deck.description}</p>
              </div>
              <div className="ml-2 mr-2 mb-3">
                <Link to={`/decks/${deck.id}`}>
                  <button type="button" className="btn btn-secondary mr-2">
                    View
                  </button>
                </Link>
                <Link to={`/decks/${deck.id}/study`}>
                  <button type="button" className="btn btn-primary mr-2">
                    Study
                  </button>
                </Link>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDeleteDeck(deck.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
