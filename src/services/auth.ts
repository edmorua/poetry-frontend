import { useMutation } from "@tanstack/react-query";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebaseConfig";
import { api } from "../lib/axios";

interface LoginResponse {
	token: string; // JWT from NestJS
	user: {
		id: string;
		email: string;
		nickname: string;
		realName: string;
	};
}

// 🔹 Google Login (Firebase → NestJS)
export const useGoogleLogin = () =>
	useMutation<LoginResponse, Error, void>({
		mutationFn: async () => {
			try {
				const result = await signInWithPopup(auth, googleProvider);
				const idToken = await result.user.getIdToken(); // ✅ Get Firebase ID Token
				const response = await api.post<LoginResponse>("/auth/firebase-login", { idToken }); // ✅ Send to NestJS
				return response.data;
			} catch (error) {
				console.error("🔥 Firebase Google Login Error:", error);
				throw error;
			}
		},
		onSuccess: (data) => {
			localStorage.setItem("token", data.token); // ✅ Store JWT token
			console.log("✅ Logged in as:", data.user);
		},
	});

// 🔹 Email & Password Login (Local)
export const useEmailLogin = () =>
	useMutation<LoginResponse, Error, { email: string; password: string }>({
		mutationFn: async ({ email, password }) => {
			try {
				const response = await api.post<LoginResponse>("/auth/login", { email, password });
				return response.data;
			} catch (error) {
				console.error("🔥 Local Login Error:", error);
				throw error;
			}
		},
		onSuccess: (data) => {
			localStorage.setItem("token", data.token);
			console.log("✅ Local Login Successful:", data.user);
		},
	});

// 🔹 Email & Password Registration (Local)
export const useRegister = () =>
	useMutation<LoginResponse, Error, { email: string; password: string; nickname: string; realName: string }>({
		mutationFn: async ({ email, password, nickname, realName }) => {
			try {
				const response = await api.post<LoginResponse>("/auth/register", { email, password, nickname, realName });
				return response.data;
			} catch (error) {
				console.error("🔥 Registration Error:", error);
				throw error;
			}
		},
		onSuccess: (data) => {
			localStorage.setItem("token", data.token);
			console.log("✅ Account Created:", data.user);
		},
	});

export const useGoogleRegister = () =>
	useMutation<LoginResponse, Error, { nickname: string }>({
		mutationFn: async ({ nickname }) => {
			// 🔹 Step 1: Sign in with Firebase Google
			const result = await signInWithPopup(auth, googleProvider);
			const idToken = await result.user.getIdToken();
			const name = await result.user.displayName; // 🔹 Get Firebase ID Token

			// 🔹 Step 2: Send ID Token + Nickname to NestJS
			const response = await api.post<LoginResponse>("/auth/firebase-register", { idToken, nickname, name });
			return response.data;
		},
		onSuccess: (data) => {
			localStorage.setItem("token", data.token); // ✅ Store JWT Token
			console.log("✅ Registered via Google:", data.user);
		},
	});
