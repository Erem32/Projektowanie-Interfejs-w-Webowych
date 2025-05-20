import React from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useUser } from "../context/UserContext";

export default function AddBook() {
    const { user, loginWithGoogle } = useUser();
    const nav = useNavigate();

    // If not logged in, show login prompt
    if (!user) {
        return (
            <div className="container">
                <h1>Musisz się zalogować, aby dodać książkę</h1>
                <button onClick={loginWithGoogle}>Zaloguj przez Google</button>
            </div>
        );
    }

    // Otherwise show the form
    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value.trim();
        const author = form.author.value.trim();
        const year = parseInt(form.year.value, 10);
        if (!title || !author || !year) return;

        await addDoc(collection(db, "books"), {
            title,
            author,
            year,
            owner: user.uid,
            createdAt: serverTimestamp(),
        });
        nav("/");
    }

    return (
        <div className="container">
            <h1>Dodaj książkę</h1>
            <form onSubmit={handleSubmit} className="search-bar">
                <input name="title" placeholder="Tytuł" />
                <input name="author" placeholder="Autor" />
                <input name="year" placeholder="Rok" type="number" />
                <button type="submit">Zapisz</button>
            </form>
        </div>
    );
}
