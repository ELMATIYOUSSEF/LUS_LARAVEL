import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import categoryService from '../../services/categoryService';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoryService.getAll();
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des catégories');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie?')) {
      try {
        await categoryService.delete(id);
        setCategories(categories.filter(category => category.id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression de la catégorie');
        console.error(err);
      }
    }
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
        <h2>Liste des catégories</h2>
        <Link to="/categories/create" className="btn btn-primary">
          Nouvelle catégorie
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="alert alert-info">Aucune catégorie n'a été créée pour le moment.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description || 'N/A'}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link to={`/categories/edit/${category.id}`} className="btn btn-sm btn-warning">
                        Modifier
                      </Link>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoryList;