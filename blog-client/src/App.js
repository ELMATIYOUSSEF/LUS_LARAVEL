import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

// Composants de mise en page
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Composants de catégorie
import CategoryList from './components/category/CategoryList';
import CategoryCreate from './components/category/CategoryCreate';
import CategoryEdit from './components/category/CategoryEdit';

// Composants d'article
import ArticleList from './components/article/ArticleList';
import ArticleDetail from './components/article/ArticleDetail';
import ArticleCreate from './components/article/ArticleCreate';
import ArticleEdit from './components/article/ArticleEdit';

// Page d'accueil temporaire
const Home = () => (
  <div className="container my-5 text-center">
    <h2>Bienvenue dans l'application de gestion de blog</h2>
    <p className="lead">
      Utilisez la barre de navigation pour accéder aux différentes sections.
    </p>
  </div>
);

// Composant pour les routes qui n'existent pas
const NotFound = () => (
  <div className="container my-5 text-center">
    <h2>404 - Page non trouvée</h2>
    <p>La page que vous recherchez n'existe pas.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Navbar />
        <main className="flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Routes pour les catégories */}
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/create" element={<CategoryCreate />} />
            <Route path="/categories/edit/:id" element={<CategoryEdit />} />
            
            {/* Routes pour les articles */}
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/create" element={<ArticleCreate />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/articles/edit/:id" element={<ArticleEdit />} />
            
            {/* Route pour les pages non trouvées */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;