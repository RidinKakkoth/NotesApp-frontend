
import axios from 'axios';

const API_BASE_URL = 'https://notesapp-backend-w4kz.onrender.com';

export const fetchNotes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/notes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
};

export const addNote = async (content) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/notes`, { content });
        return response.data;
    } catch (error) {
        console.error('Error adding note:', error);
        throw error;
    }
};

export const deleteNote = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/notes/${id}`);
    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
};
