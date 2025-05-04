// app/routes/edit.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useBooks } from "../context/BooksContext";
import { useUser } from "../context/UserContext";

export default function EditBook() {
    const { user, loginWithGoogle } = useUser();
    const { id } = useParams();
    const books = useBooks();
    const nav = useNavigate();

    // Find the book
    const book = books.find((b) => b.id === id);


    if (!book) {
        return <p className="container">Nie znaleziono książki.</p>;
    }


    if (book.owner && book.owner !== user?.uid) {
        return (
            <div className="container">
                <h1>Brak uprawnień</h1>
                <p>Nie możesz edytować tej książki, ponieważ nie jesteś jej właścicielem.</p>
            </div>
        );
    }


    if (!book.owner && !user) {
        return (
            <div className="container">
                <h1>Musisz się zalogować, aby edytować tę książkę</h1>
                <button onClick={loginWithGoogle}>Zaloguj przez Google</button>
            </div>
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value.trim();
        const author = form.author.value.trim();
        const year = parseInt(form.year.value, 10);
        if (!title || !author || !year) return;

        await updateDoc(doc(db, "books", id), { title, author, year });
        nav("/");
    }

    return (
        <div className="container">
            <h1>Edytuj książkę</h1>
            <form onSubmit={handleSubmit} className="search-bar">
                <input name="title" defaultValue={book.title} />
                <input name="author" defaultValue={book.author} />
                <input name="year" defaultValue={book.year} type="number" />
                <button type="submit">Zapisz zmiany</button>
            </form>
        </div>
    );
}
