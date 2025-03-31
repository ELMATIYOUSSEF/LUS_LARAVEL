import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0">© {new Date().getFullYear()} Blog Laravel React</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">Projet Laravel et React</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;