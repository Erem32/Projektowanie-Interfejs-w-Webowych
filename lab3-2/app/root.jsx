import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import { UserProvider } from "./context/UserContext";
import "./app.css";
import { BooksProvider } from "./context/BooksContext";


export default function Root() {
  return (
    <UserProvider>
      <BooksProvider>
        <div>
          <nav>
            <NavLink to="/" end>
              Strona główna
            </NavLink>
            <NavLink to="/add">Dodaj książkę</NavLink>
          </nav>
          <main>
            <Outlet />
          </main>
        </div>
      </BooksProvider>
    </UserProvider>
  );
}


