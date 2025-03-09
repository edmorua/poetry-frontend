"use client";

import { useState } from "react";
import { useGoogleRegister, useRegister } from "../../services/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [nickname, setNickname] = useState("");
	const [realName, setRealName] = useState("");
	const router = useRouter();

	const googleRegisterMutation = useGoogleRegister();
	const registerMutation = useRegister();

	// 🔹 Handle Google Registration
	const handleGoogleRegister = async () => {
		if (!nickname.trim()) {
			alert("Please enter a nickname before signing up!");
			return;
		}
		try {
			const data = await googleRegisterMutation.mutateAsync({ nickname });
			localStorage.setItem("token", data.token);
			alert(`Welcome, ${data.user.nickname}!`);
			router.push("/");
		} catch (error) {
			console.error("🔥 Google Signup Failed:", error);
		}
	};

	// 🔹 Handle Local Registration
	const handleRegister = async () => {
		try {
			const data = await registerMutation.mutateAsync({ email, password, nickname, realName });
			localStorage.setItem("token", data.token);
			alert(`Account created! Welcome, ${data.user.nickname}!`);
			router.push("/login");
		} catch (error) {
			console.error("🔥 Registration Failed:", error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200">
			<div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
				<h2 className="text-2xl font-semibold text-center text-gray-100">Join the Society</h2>
				<p className="text-center text-gray-400">Create an account to share your poetry</p>

				<div className="space-y-4">
					<input
						type="text"
						placeholder="Nickname (required)"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
						className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>

					<input
						type="email"
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
					<input
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
					<input
						type="text"
						placeholder="Real Name (optional)"
						onChange={(e) => setRealName(e.target.value)}
						className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					/>
					<button
						onClick={handleRegister}
						disabled={registerMutation.isPending}
						className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
					>
						{registerMutation.isPending ? "Registering..." : "Register"}
					</button>
				</div>

				<div className="relative flex items-center justify-center">
					<span className="absolute px-2 bg-gray-800 text-gray-400">or</span>
					<hr className="w-full border-gray-600" />
				</div>

				<button
					onClick={handleGoogleRegister}
					disabled={googleRegisterMutation.isPending}
					className="flex items-center justify-center w-full px-4 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
				>
					Sign up with Google
				</button>

				<p className="text-sm text-center text-gray-400">
					Already have an account?{" "}
					<Link href="/login" className="text-indigo-400 hover:underline">
						Log in here
					</Link>
				</p>
			</div>
		</div>
	);
}
