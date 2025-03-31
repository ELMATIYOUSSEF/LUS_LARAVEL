import React, { useState } from 'react';
import commentService from '../../services/commentService';

const CommentForm = ({ articleId, onCommentAdded }) => {
  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    content: '',
    article_id: articleId
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Effacer le message de succès quand l'utilisateur commence à modifier le formulaire
    if (success) {
      setSuccess(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.author_name.trim()) {
      newErrors.author_name = 'Le nom est requis';
    }
    if (!formData.author_email.trim()) {
      newErrors.author_email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.author_email)) {
      newErrors.author_email = 'L\'email n\'est pas valide';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Le commentaire est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      const response = await commentService.create(formData);
      setLoading(false);
      setSuccess(true);
      
      // Réinitialiser le formulaire
      setFormData({
        author_name: '',
        author_email: '',
        content: '',
        article_id: articleId
      });
      
      // Notifier le composant parent qu'un commentaire a été ajouté
      if (onCommentAdded) {
        onCommentAdded(response.data);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error posting comment:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Une erreur est survenue' });
      }
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        {success && (
          <div className="alert alert-success">
            Votre commentaire a été ajouté avec succès!
          </div>
        )}
        
        {errors.general && (
          <div className="alert alert-danger">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="author_name" className="form-label">
                Nom *
              </label>
              <input
                type="text"
                className={`form-control ${errors.author_name ? 'is-invalid' : ''}`}
                id="author_name"
                name="author_name"
                value={formData.author_name}
                onChange={handleChange}
              />
              {errors.author_name && (
                <div className="invalid-feedback">{errors.author_name}</div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="author_email" className="form-label">
                Email *
              </label>
              <input
                type="email"
                className={`form-control ${errors.author_email ? 'is-invalid' : ''}`}
                id="author_email"
                name="author_email"
                value={formData.author_email}
                onChange={handleChange}
              />
              {errors.author_email && (
                <div className="invalid-feedback">{errors.author_email}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Commentaire *
            </label>
            <textarea
              className={`form-control ${errors.content ? 'is-invalid' : ''}`}
              id="content"
              name="content"
              rows="4"
              value={formData.content}
              onChange={handleChange}
            ></textarea>
            {errors.content && (
              <div className="invalid-feedback">{errors.content}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Envoi...
              </>
            ) : (
              'Publier le commentaire'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;