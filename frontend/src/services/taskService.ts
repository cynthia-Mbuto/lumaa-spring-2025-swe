import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002'; 

export const getTasks = async (token: string) => {
    try {
        const response = await axios.get(`${API_URL}/tasks/`, 
            {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data; 
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error('Failed to fetch tasks');
    }
};

export const createTask = async (token: string, description: string, title: string) => {
    try {
        const response = await axios.post(`${API_URL}/tasks/`, {
            description,
            title,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw new Error('Failed to create task');
    }
};

export const updateTask = async (token: string, id: string, description: string, title: string, iscomplete: boolean) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${id}`, {
            description,
            title,
            iscomplete,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response;
    } catch (error) {
        console.error('Error updating task:', error);
        throw new Error('Failed to update task');
    }
};
export const getTaskById = async (token: string, id: string) => {
    try {
        const response = await axios.get(`${API_URL}/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching task:', error);
        throw new Error('Failed to fetch task');
    }
};

export const deleteTask = async (token: string, id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw new Error('Failed to delete task');
    }
};