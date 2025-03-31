import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import articleService from '../../services/articleService';
import categoryService from '../../services/categoryService';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const articlesResponse = await articleService.getAll();
        const categoriesResponse = await categoryService.getAll();
        
        setArticles(articlesResponse.data);
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        let response;
        
        if (selectedCategory === 'all') {
          response = await articleService.getAll();
        } else {
          response = await articleService.getByCategory(selectedCategory);
        }
        
        setArticles(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du filtrage des articles');
        setLoading(false);
        console.error(err);
      }
    };

    if (selectedCategory) {
      fetchArticles();
    }
  }, [selectedCategory]);

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article?')) {
      try {
        await articleService.delete(id);
        setArticles(articles.filter(article => article.id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression de l\'article');
        console.error(err);
      }
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  if (loading) {
    return <div className="text-center my-5"><div className="spinner-border"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Liste des articles</h2>
        <Link to="/articles/create" className="btn btn-primary">
          Nouvel article
        </Link>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="categoryFilter" className="form-label">Filtrer par catégorie:</label>
            <select
              id="categoryFilter"
              className="form-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="all">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="alert alert-info">Aucun article n'a été créé pour le moment.</div>
      ) : (
        <div className="row">
          {articles.map((article) => (
            <div key={article.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                {article.image ? (
                  <img src={article.image} className="card-img-top" alt={article.title} style={{ height: '200px', objectFit: 'cover' }} />
                ) : (
                  <div className="bg-light text-center py-5">
                    <i className="bi bi-image" style={{ fontSize: '3rem' }}></i>
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text text-muted small">
                    Catégorie: {article.category ? article.category.name : 'Non catégorisé'}
                  </p>
                  <p className="card-text">
                    {article.content.length > 100
                      ? `${article.content.substring(0, 100)}...`
                      : article.content}
                  </p>
                </div>
                <div className="card-footer bg-transparent">
                  <div className="d-flex justify-content-between">
                    <Link to={`/articles/${article.id}`} className="btn btn-sm btn-info">
                      Voir
                    </Link>
                    <div>
                      <Link to={`/articles/edit/${article.id}`} className="btn btn-sm btn-warning me-1">
                        Modifier
                      </Link>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleList;