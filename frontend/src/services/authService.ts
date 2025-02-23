import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

// Define the response types
interface AuthResponse {
    token: string;
}

export const registerUser = async (username: string, password: string): Promise<void> => {
    try {
        await axios.post(`${API_URL}/auth/register`, {
            username,
            password
        });
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (username: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
            username,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const isAuthenticated = async (): Promise<boolean> => {
    const token = localStorage.getItem('authToken');
    return !!token;
};

export const logoutUser = async (): Promise<void> => {
    localStorage.removeItem('authToken');
};
