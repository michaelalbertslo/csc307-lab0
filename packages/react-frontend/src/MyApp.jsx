// src/MyApp.jsx
import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from "react";

function MyApp() {
    const [characters, setCharacters] = useState([
        // updated from a form now 
      ]);

      function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
      }

      useEffect(() => {
        fetchUsers()
          .then((res) => res.json())
          .then((json) => setCharacters(json["users_list"]))
          .catch((error) => {
            console.log(error);
          });
      }, []);

      function postUser(person) {
        return fetch("http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        })
          .then((res) => {
            if (res.status === 201) {
              return res.json(); 
            } else {
              throw new Error("User was not created");
            }
          });
      }
      

      function updateList(person) {
        postUser(person)
          .then((newUser) => {
            setCharacters((prev) => [...prev, newUser]);
          })
          .catch((error) => {
            console.error("Error adding user:", error);
          });
      }
      

      function removeOneCharacter(id) {
        fetch(`http://localhost:8000/users/${id}`, {
          method: "DELETE",
        })
        .then(res => {
          if (res.status === 204) {
            // filter out the deleted user by id
            setCharacters(chars => chars.filter(u => u._id !== id));
          } else if (res.status === 404) {
            console.error("User not found on the server.");
          } else {
            console.error("Unexpected delete error:", res.status);
          }
        })
        .catch(err => console.error("Delete failed:", err));
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