import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-dark text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="mb-0">
              <Link to="/" className="text-white text-decoration-none">
                Blog Laravel React
              </Link>
            </h1>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">Gestion des Articles, Catégories et Commentaires</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;