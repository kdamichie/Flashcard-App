Project: Flashcard-o-matic

A local school has decided to put together a flashcard application, Flashcard-o-matic, to help their students study online. Teachers will use this application to create decks of flashcards for the subjects they teach, and students will study the decks. The school needs you to build the application that the students and teachers will use.

Home page for Flashcard app

Bootstrap 4 is included with the starter HTML. You're welcome to use vanilla CSS or Bootstrap 4 for styling your project. However, your finished product does not have to match the styles in the provided screenshots, as you will not be assessed on the styling or responsiveness of your project.

This project is designed to test your ability to work with rendering and state management using React. Before taking on this module, you should be comfortable with the following:

    Installing packages via NPM
    Running tests from the command line
    Writing React function components
    Creating routes, including nested routes, using React Router
    Using hooks like useState(), useParams(), and useHistory()
    Debugging React code through console output and using the VS Code debugger

Project setup

Follow the instructions below to get this project up and running on your own machine:

    Download the Qualified assessment files to your computer.
    Run npm install to install the project.

Note: Work on this project locally, because Qualified's online IDE and Web Preview features don't work properly for this assessment.

To run the tests, you can run the following command:

npm test

Most of the tests in this project wait for content to load via the API before continuing the test. Before the implementation is complete, the content never loads so the test fails with a timeout. As a result, the tests will initially run slowly. It may take perhaps a minute or more for all the tests run. The tests will speed up as the implementation nears completion.

You can run the application using the following command.

npm start

The start command will start two servers concurrently:

    An API server, powered by json-server, running on http://localhost:5000
    A React application running on http://localhost:3000

To stop the servers from running, you can press Control+C.
Running on Windows

If you are having problems running npm start on Windows, you may need to run the React client and server in separate terminals. Open a terminal and run npm run start:react to start the react application. Open another terminal and run npm run start:server to run the server.
Instructions

You are tasked with building a number of different screens for the users of the flashcard app, as summarized below:
Screen 	Path 	Description
Home 	/ 	Shows a list of decks with options to create, study, view, or delete a deck
Study 	/decks/:deckId/study 	Allows the user to study the cards from a specified deck
Create Deck 	/decks/new 	Allows the user to create a new deck
Deck 	/decks/:deckId 	Shows all of the information about a specified deck with options to edit or add cards to the deck, navigate to the study screen, or delete the deck
Edit Deck 	/decks/:deckId/edit 	Allows the user to modify information on an existing deck
Add Card 	/decks/:deckId/cards/new 	Allows the user to add a new card to an existing deck
Edit Card 	/decks/:deckId/cards/:cardId/edit 	Allows the user to modify information on an existing card

All of the screens above will work on two common datasets. The datasets are related, and at times, you will need to work with both datasets to get the screens to work properly.

While working on these screens, you have both the tests and the screenshots below to act as a guide. You can create the screens in any order and are encouraged to organize your code using the grouping-by-route technique you learned earlier.

While working on this project, you should:

    Use well-named variables.
    Build small, single-responsibility components and functions.
    Display a "Not found" message if the user visits a URL that does not exist.
    Edit only files inside of the public/src/ directory.

While working on this project, you should not:

    Change the names of the API functions.
    Edit any of the files outside of the public/src/ directory.
    Change the location of any of the existing files.

If you feel as though one of your solutions is working, but something isn't showing up right on the site or in the tests, reach out for help.
API

There are two datasets that are a part of this project: decks and cards.

You can view all the data inside of the data/db.json file. Each data set can be accessed via a named property in this file. The following is a partial listing of the data in data/db.json:

{
  "decks": [
    {
      "id": 1,
      "name": "...",
      "description": "..."
    }
  ],
  "cards": [
    {
      "id": 1,
      "front": "...",
      "back": "...",
      "deckId": 1
    }
  ]
}

Decks

Each Deck is an object with the following shape:

{
  "id": 1,
  "name": "Rendering in React",
  "description": "React's component structure allows for quickly building a complex web application that relies on DOM manipulation. "
}

A Deck represents a collection of flashcards, or simply cards.
Cards

Each card is an object with the following shape:

{
  "id": 1,
  "front": "Differentiate between Real DOM and Virtual DOM.",
  "back": "Virtual DOM updates are faster but do not directly update the HTML",
  "deckId": 1
}

Each card represents a flashcard with a front , where the question is displayed, and a back, where the answer can be found. A card also contains the deckId, which matches the card to the deck that the card belongs to.
Utility functions

There are several utility functions exported from src/utils/api/index.js that allow you to perform create, read, update, and delete operations with the API server. You will need to select and use the appropriate functions in your React components.

Note that the updateDeck(), readDeck(), and listDecks() functions call the API server using URLs that include a query string of _embed=cards. The results of the API calls for these functions will contain both the deck and the cards associated with the deck, so you won't have to make additional API calls to load the cards for each deck when you use these functions.

Please read the documentation in the file for more information.
Screens

You are tasked with creating the following screens that work with the above datasets.