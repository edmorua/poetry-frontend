"use client";

import { useState } from "react";
import { auth, googleProvider } from "../../lib/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth";
import Link from "next/link";

export default function Login() {
	const [user, setUser] = useState<User | null>(null);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	console.log({user})
	const signupWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			setUser(result.user);
			alert("Login successful!");
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error("Error signing in: ", error.message ?? error);
			}
		}
	};

	const loginWithEmailAndPassword = async () => {
		try {
			const result = await signInWithEmailAndPassword(auth, email, password);
			setUser(result.user);
		} catch (error) {
			if (error instanceof Error) {
				console.error("Error signing in: ", error.message ?? error);
			}
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
			<div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
				<h2 className="text-2xl font-semibold text-center text-gray-100">Welcome Back, Poet</h2>
				<p className="text-center text-gray-400">Enter your details to continue</p>

				<div className="space-y-4">
					<input
						type="email"
						placeholder="Enter your email..."
						onChange={(evt) => setEmail(evt.target.value)}
						className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
					<input
						type="password"
						placeholder="Enter your password"
						onChange={(evt) => setPassword(evt.target.value)}
						className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
					<button
						onClick={loginWithEmailAndPassword}
						className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
					>
						Login
					</button>
				</div>

				<div className="relative flex items-center justify-center">
					<span className="absolute px-2 bg-gray-800 text-gray-400">or</span>
					<hr className="w-full border-gray-600" />
				</div>

				<button
					onClick={signupWithGoogle}
					className="flex items-center justify-center w-full px-4 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
				>
					<svg className="w-5 h-5 mr-2 fill-white" viewBox="0 0 48 48">
						<path
							fill="#4285F4"
							d="M46.64 24.58c0-1.63-.15-3.18-.42-4.69H24v9.14h13.09c-.6 3.1-2.3 5.72-4.87 7.51v6.24h7.85c4.59-4.23 7.22-10.46 7.22-18.2z"
						/>
						<path
							fill="#34A853"
							d="M24 48c6.52 0 11.97-2.17 15.96-5.86l-7.85-6.24c-2.2 1.48-5.02 2.36-8.11 2.36-6.26 0-11.57-4.22-13.47-9.88H2.18v6.24C6.17 42.84 14.46 48 24 48z"
						/>
						<path
							fill="#FBBC05"
							d="M10.53 28.38c-.5-1.48-.78-3.05-.78-4.68s.28-3.2.78-4.68V12.8H2.18C.76 16.05 0 19.41 0 22.94c0 3.53.76 6.89 2.18 10.14l8.35-6.26z"
						/>
						<path
							fill="#EA4335"
							d="M24 9.52c3.55 0 6.74 1.22 9.27 3.63l6.97-6.97C35.97 2.17 30.52 0 24 0 14.46 0 6.17 5.16 2.18 12.8l8.35 6.24c1.9-5.66 7.21-9.88 13.47-9.88z"
						/>
					</svg>
					Sign in with Google
				</button>

				<p className="text-sm text-center text-gray-400">
					Don&apos;t have an account?{" "}
					<Link href="/register" className="text-indigo-400 hover:underline">
						Register here
					</Link>
				</p>
			</div>
		</div>
	);
}
