import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck, readDeck } from "../../utils/api/index";

function CreateDeck() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await createDeck({ name, description });
    await readDeck(response.deckId);
    history.push(`/decks/${response.id}`);
  }

  function handleCancel(event) {
    event.preventDefault();

    history.push("/");
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <div>
        <form>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              <h3>Name</h3>
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              required
              placeholder="Deck Name"
              onChange={handleChangeName}
              value={name}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              <h3>Description</h3>
            </label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              required
              placeholder="Brief description of the deck"
              onChange={handleChangeDescription}
              value={description}
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary text-white"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateDeck;
