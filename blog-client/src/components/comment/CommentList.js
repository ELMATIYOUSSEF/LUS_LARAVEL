import React, { useState, useEffect } from 'react';
import commentService from '../../services/commentService';

const CommentList = ({ articleId, comments: initialComments }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [loading, setLoading] = useState(!initialComments);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si les commentaires sont déjà fournis, pas besoin de les récupérer
    if (initialComments) {
      setComments(initialComments);
      return;
    }

    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await commentService.getByArticle(articleId);
        setComments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des commentaires');
        setLoading(false);
        console.error(err);
      }
    };

    fetchComments();
  }, [articleId, initialComments]);

  if (loading) {
    return <div className="text-center my-3"><div className="spinner-border spinner-border-sm"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (comments.length === 0) {
    return <div className="alert alert-light">Aucun commentaire pour le moment. Soyez le premier à commenter!</div>;
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div key={comment.id} className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="card-title mb-0">{comment.author_name}</h5>
              <small className="text-muted">
                {new Date(comment.created_at).toLocaleDateString()} à {new Date(comment.created_at).toLocaleTimeString()}
              </small>
            </div>
            <p className="card-text">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;