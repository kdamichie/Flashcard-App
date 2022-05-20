import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api/index";

function Deck() {
  const history = useHistory();
  const { deckId } = useParams();

  const [deck, setDeck] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck() {
      try {
        const response = await readDeck(deckId, {
          signal: abortController.signal,
        });
        setDeck(response);
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
  }, [deckId]);

  async function handleDeleteDeck(deckId) {
    try {
      if (
        window.confirm("Delete this deck? You will not be able to recover it.")
      ) {
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

  async function handleDeleteCard(cardId) {
    try {
      if (
        window.confirm("Delete this card? You will not be able to recover it.")
      ) {
        await deleteCard(cardId);
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

  const cardList =
    deck.cards &&
    deck.cards.map((card) => (
      <div className="card" key={card.id}>
        <div className="card-body">
          <div className="row">
            <p className="card-text">{card.front}</p>
            <p className="card-text">{card.back}</p>
          </div>
          <a href={`/decks/${deck.id}`} className="btn btn-secondary">
            Edit
          </a>
          <a
            href="/"
            className="btn btn-danger"
            onClick={() => handleDeleteDeck(deckId)}
          >
            Delete
          </a>
        </div>
      </div>
    ));

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">{deck.name}</li>
        </ol>
      </nav>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{deck.name}</h3>
          <p className="card-text">{deck.description}</p>
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={() => history.push(`/decks/${deckId}/edit`)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-primary ml-2"
            onClick={() => history.push(`/decks/${deckId}/study`)}
          >
            Study
          </button>
          <button
            type="button"
            className="btn btn-primary ml-2"
            onClick={() => history.push(`/decks/${deckId}/cards/new`)}
          >
            Add Cards
          </button>
          <button
            className="btn btn-danger float-right"
            onClick={() => handleDeleteCard(deckId)}
          >
            Delete
          </button>
        </div>
      </div>
      <h3>Cards</h3>
      <div>{cardList}</div>
    </div>
  );
}

export default Deck;
