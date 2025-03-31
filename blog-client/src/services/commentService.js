import api from './api';

const commentService = {
  // Récupérer tous les commentaires
  getAll: async () => {
    try {
      const response = await api.get('/comments');
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },

  // Récupérer un commentaire par ID
  getById: async (id) => {
    try {
      const response = await api.get(`/comments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching comment ID ${id}:`, error);
      throw error;
    }
  },

  // Récupérer les commentaires par article
  getByArticle: async (articleId) => {
    try {
      const response = await api.get(`/articles/${articleId}/comments`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching comments for article ID ${articleId}:`, error);
      throw error;
    }
  },

  // Créer un nouveau commentaire
  create: async (commentData) => {
    try {
      const response = await api.post('/comments', commentData);
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  // Mettre à jour un commentaire
  update: async (id, commentData) => {
    try {
      const response = await api.put(`/comments/${id}`, commentData);
      return response.data;
    } catch (error) {
      console.error(`Error updating comment ID ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un commentaire
  delete: async (id) => {
    try {
      const response = await api.delete(`/comments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting comment ID ${id}:`, error);
      throw error;
    }
  }
};

export default commentService;