import React, {useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import articleService from '../../services/articleService';
import categoryService from '../../services/categoryService';

const ArticleCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category_id: ''
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await categoryService.getAll();
        setCategories(response.data);
        setLoadingCategories(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Le contenu est requis';
    }
    if (!formData.category_id) {
      newErrors.category_id = 'La catégorie est requise';
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
      await articleService.create(formData);
      setLoading(false);
      navigate('/articles');
    } catch (error) {
      setLoading(false);
      console.error('Error creating article:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Une erreur est survenue' });
      }
    }
  };

  if (loadingCategories) {
    return <div className="text-center my-5"><div className="spinner-border"></div></div>;
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Créer un nouvel article</h2>
        </div>
        <div className="card-body">
          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Titre de l'article
              </label>
              <input
                type="text"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="category_id" className="form-label">
                Catégorie
              </label>
              <select
                className={`form-select ${errors.category_id ? 'is-invalid' : ''}`}
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <div className="invalid-feedback">{errors.category_id}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                URL de l'image (optionnel)
              </label>
              <input
                type="text"
                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <div className="invalid-feedback">{errors.image}</div>
              )}
              <div className="form-text">Laissez vide si vous n'avez pas d'image</div>
            </div>

            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Contenu
              </label>
              <textarea
                className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                id="content"
                name="content"
                rows="10"
                value={formData.content}
                onChange={handleChange}
              ></textarea>
              {errors.content && (
                <div className="invalid-feedback">{errors.content}</div>
              )}
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Chargement...
                  </>
                ) : (
                  'Publier l\'article'
                )}
              </button>
              <Link to="/articles" className="btn btn-secondary">
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArticleCreate;