import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import articleService from '../../services/articleService';
import CommentList from '../comment/CommentList';
import CommentForm from '../comment/CommentForm';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await articleService.getById(id);
        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement de l\'article');
        setLoading(false);
        console.error(err);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="text-center my-5"><div className="spinner-border"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!article) {
    return <div className="alert alert-warning">Article non trouvé</div>;
  }

  return (
    <div className="container">
      <div className="mb-4">
        <Link to="/articles" className="btn btn-outline-secondary">
          &laquo; Retour aux articles
        </Link>
      </div>

      <article className="mb-5">
        <div className="card">
          {article.image && (
            <img src={article.image} className="card-img-top" alt={article.title} />
          )}
          <div className="card-body">
            <h1 className="card-title">{article.title}</h1>
            <div className="card-subtitle mb-3 text-muted">
              <span className="badge bg-primary me-2">
                {article.category ? article.category.name : 'Non catégorisé'}
              </span>
              <small>Publié le {new Date(article.created_at).toLocaleDateString()}</small>
            </div>
            <div className="card-text">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="card-footer bg-transparent">
            <div className="d-flex justify-content-end">
              <Link to={`/articles/edit/${article.id}`} className="btn btn-warning me-2">
                Modifier
              </Link>
              <button
                onClick={() => {
                  if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article?')) {
                    articleService.delete(article.id)
                      .then(() => window.location.href = '/articles')
                      .catch(err => console.error(err));
                  }
                }}
                className="btn btn-danger"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </article>

      <div className="mt-5">
        <h3>Commentaires ({article.comments ? article.comments.length : 0})</h3>
        <hr />
        
        <CommentList articleId={article.id} comments={article.comments} />
        
        <div className="mt-4">
          <h4>Ajouter un commentaire</h4>
          <CommentForm articleId={article.id} />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;