'use client';

import { useState } from 'react';
import { auth, googleProvider } from '../lib/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup, User } from 'firebase/auth';

export default function Register() {
	const [user, setUser] = useState<User | null>(null);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	// 🔹 Register with Email & Password
	const registerWithEmail = async () => {
		try {
			const result = await createUserWithEmailAndPassword(auth, email, password);
			setUser(result.user);
			console.log('User Registered:', result.user);
			alert('Successfully registered!');
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('Error signing up: ', error.message ?? error);
			}
		}
	};

	// 🔹 Register with Google
	const registerWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			setUser(result.user);
			console.log('User Info:', result.user);
			alert('Successfully registered with Google!');
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error('Error signing in: ', error.message ?? error);
			}
		}
	};

	return (
		<div className='flex flex-col flex-wrap'>
			<div id='register-email-password'>
				<input
					type='email'
					placeholder='Enter your email...'
					onChange={(evt) => setEmail(evt.target.value)}
				/>
				<input
					type='password'
					placeholder='Enter your password'
					onChange={(evt) => setPassword(evt.target.value)}
				/>
				<button onClick={registerWithEmail}>Register</button>
			</div>

			<div id='register-google'>
				{user ? (
					<p>Welcome, {user.displayName}</p>
				) : (
					<button onClick={registerWithGoogle}>Sign up with Google</button>
				)}
			</div>
		</div>
	);
}
