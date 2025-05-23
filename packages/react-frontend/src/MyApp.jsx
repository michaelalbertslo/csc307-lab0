// src/MyApp.jsx
import Table from "./Table";
import Form from "./Form";
import React, { useState } from "react";

function MyApp() {
    const [characters, setCharacters] = useState([
        // updated from a form now 
      ]);

      function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }

      function updateList(person) {
        setCharacters([...characters, person]);
      }
    return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
          <Form handleSubmit={updateList} />
        </div>
  );
}

export default MyApp;