import React from 'react';
import { Route, Routes, NavLink, Link, HashRouter, BrowserRouter, MemoryRouter } from 'react-router-dom';

import Componente1 from './Componente1';
import Componente2 from './Componente2';
import Componente3 from './Componente3';

import './main.css';

function Main() {
  return (
    <MemoryRouter>
      <div>
        <h1>Prova Finale</h1>
        <ul className="header">
          {/* NavLink ha lo stile active se aperto, Link nessuno stile */}
          <li>
            <Link to="/">Registrazione</Link>
          </li>
          <li>
            <Link to="/Componente2">Prodotti</Link>
          </li>
          <li>
            <Link to="/Componente3">Componente3</Link>
          </li>
        </ul>
        <div className="content" style={{ backgroundColor: 'azure' }}>
          <Routes>
            {/* <Route index element={<Home />} /> */}
            <Route>
              <Route path="/" element={<Componente1 />} />
              <Route path="Componente2" element={<Componente2 />} />
              <Route path="Componente3" element={<Componente3 />} />
            </Route>
          </Routes>
        </div>
      </div>
    </MemoryRouter>
  );
}

export default Main;
