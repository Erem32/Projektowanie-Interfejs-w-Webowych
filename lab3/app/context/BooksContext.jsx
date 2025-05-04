import React, {
    createContext,
    useReducer,
    useContext,
    useEffect,
} from "react";
import { db } from "../firebase";
import {
    collection,
    query,
    onSnapshot,
    orderBy,
} from "firebase/firestore";

const BooksStateContext = createContext();
const BooksDispatchContext = createContext();

function booksReducer(state, action) {
    switch (action.type) {
        case "SET_ALL":
            return action.payload;
        case "ADD_BOOK":
            return [...state, action.payload];
        case "UPDATE_BOOK":
            return state.map((b) =>
                b.id === action.payload.id ? action.payload : b
            );
        case "REMOVE_BOOK":
            return state.filter((b) => b.id !== action.payload);
        default:
            throw new Error("Unknown action: " + action.type);
    }
}

export function BooksProvider({ children }) {
    const [state, dispatch] = useReducer(booksReducer, []);

    useEffect(() => {

        const q = query(
            collection(db, "books"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snap) => {
            const books = snap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            dispatch({ type: "SET_ALL", payload: books });
        });

        return unsubscribe;
    }, []);

    return (
        <BooksStateContext.Provider value={state}>
            <BooksDispatchContext.Provider value={dispatch}>
                {children}
            </BooksDispatchContext.Provider>
        </BooksStateContext.Provider>
    );
}

export function useBooks() {
    const ctx = useContext(BooksStateContext);
    if (ctx === undefined) {
        throw new Error("useBooks must be used inside BooksProvider");
    }
    return ctx;
}

export function useBooksDispatch() {
    const ctx = useContext(BooksDispatchContext);
    if (ctx === undefined) {
        throw new Error("useBooksDispatch must be used inside BooksProvider");
    }
    return ctx;
}
