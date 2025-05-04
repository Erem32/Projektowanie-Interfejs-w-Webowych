import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useBooks } from "../context/BooksContext";
import { useUser } from "../context/UserContext";

export default function Home() {
  const books = useBooks();
  const { user, loginWithGoogle, logout } = useUser();
  const [query, setQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [showMine, setShowMine] = useState(false);


  const filtered = books.filter((b) => {
    return (
      b.title.toLowerCase().includes(query.toLowerCase()) &&
      (!authorFilter || b.author === authorFilter)
    );
  });


  const displayed = showMine
    ? filtered.filter((b) => b.owner === user?.uid)
    : filtered;


  const authors = Array.from(new Set(books.map((b) => b.author)));

  return (
    <div className="container">
      <h1>Wyszukaj książki</h1>


      {!user ? (
        <button onClick={loginWithGoogle}>Zaloguj przez Google</button>
      ) : (
        <button onClick={logout}>Wyloguj</button>
      )}


      <div className="search-bar">
        <input
          type="text"
          placeholder="Tytuł…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
        >
          <option value="">Wszyscy autorzy</option>
          {authors.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        <button onClick={() => { setQuery(""); setAuthorFilter(""); }}>
          Wyczyść
        </button>

        { }
        {user && (
          <button onClick={() => setShowMine((m) => !m)}>
            {showMine ? "Wszystkie" : "Moje"}
          </button>
        )}

        <Link to="/add">Dodaj książkę</Link>
      </div>

      { }
      <ul className="book-list">
        {displayed.length > 0 ? (
          displayed.map((b) => (
            <li key={b.id} className="book-item">
              <div>
                <strong>{b.title}</strong> – {b.author} ({b.year})
              </div>
              <div className="actions">
                {

                }
                {(!b.owner || user?.uid === b.owner) && (
                  <>
                    <Link to={`/edit/${b.id}`}>Edytuj</Link>
                    <button
                      onClick={async () => {
                        if (window.confirm("Czy na pewno usunąć tę książkę?")) {
                          await deleteDoc(doc(db, "books", b.id));
                        }
                      }}
                    >
                      Usuń
                    </button>
                  </>
                )}
              </div>
            </li>
          ))
        ) : (
          <li>Brak książek spełniających kryteria.</li>
        )}
      </ul>
    </div>
  );
}
