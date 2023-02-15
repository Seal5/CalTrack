import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Meal";
import CreateArea from "./CreateMeal";

function App() {
  const [meal, setMeal] = useState([]);

  function addNote(newNote) {
    setNote((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }
  function deleteNote(id) {
    setNote((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {note.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
