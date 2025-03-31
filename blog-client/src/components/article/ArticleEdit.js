import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import articleService from '../../services/articleService';
import categoryService from '../../services/categoryService';

const ArticleEdit = () => {
  const { id } = useParams();
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
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchLoading(true);
        const [articleResponse, categoriesResponse] = await Promise.all([
          articleService.getById(id),
          categoryService.getAll()
        ]);

        setFormData({
          title: articleResponse.data.title,
          content: articleResponse.data.content,
          image: articleResponse.data.image || '',
          category_id: articleResponse.data.category_id.toString()
        });
        setCategories(categoriesResponse.data);
        setFetchLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrors({ general: 'Erreur lors du chargement des données' });
        setFetchLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
      await articleService.update(id, formData);
      setLoading(false);
      navigate(`/articles/${id}`);
    } catch (error) {
      setLoading(false);
      console.error('Error updating article:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Une erreur est survenue' });
      }
    }
  };

  if (fetchLoading) {
    return <div className="text-center my-5"><div className="spinner-border"></div></div>;
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Modifier l'article</h2>
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
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Chargement...
                  </>
                ) : (
                  'Mettre à jour'
                )}
              </button>
              <Link to={`/articles/${id}`} className="btn btn-secondary">
                Annuler
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArticleEdit;