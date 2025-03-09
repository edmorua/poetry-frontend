import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC__BACKEND_URL || 'http://localhost:4000/auth';

export const register = async (email: string, password: string, nickname: string, realName: string) => {
	const response = await axios.post(`${API_URL}/register`, { email, password, nickname, realName})
	return response.data;
}

export const login = async (email: string, password: string) => {
	const response = await axios.post(`${API_URL}/login`, { email, password });
	return response.data;
}

export const loginWithFirebase = async (idToken: string) => {
	const response = await axios.post(`${API_URL}/firebase-login`, { idToken });
	return response.data
}



