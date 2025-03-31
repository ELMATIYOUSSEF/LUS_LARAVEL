import api from './api';

const articleService = {
  // Récupérer tous les articles
  getAll: async () => {
    try {
      const response = await api.get('/articles');
      return response.data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  // Récupérer un article par ID
  getById: async (id) => {
    try {
      const response = await api.get(`/articles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching article ID ${id}:`, error);
      throw error;
    }
  },

  // Récupérer les articles par catégorie
  getByCategory: async (categoryId) => {
    try {
      const response = await api.get(`/categories/${categoryId}/articles`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching articles for category ID ${categoryId}:`, error);
      throw error;
    }
  },

  // Créer un nouvel article
  create: async (articleData) => {
    try {
      const response = await api.post('/articles', articleData);
      return response.data;
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  },

  // Mettre à jour un article
  update: async (id, articleData) => {
    try {
      const response = await api.put(`/articles/${id}`, articleData);
      return response.data;
    } catch (error) {
      console.error(`Error updating article ID ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un article
  delete: async (id) => {
    try {
      const response = await api.delete(`/articles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting article ID ${id}:`, error);
      throw error;
    }
  }
};

export default articleService;