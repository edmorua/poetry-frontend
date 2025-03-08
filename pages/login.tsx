'use client';

import { useState } from 'react'
import { auth, googleProvider } from '../lib/firebaseConfig'
import { signInWithEmailAndPassword, signInWithPopup, User } from 'firebase/auth'

export default function Login(){
	const [user, setUser] = useState<User | null>(null);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const signupWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			setUser(result.user);
			console.log("User Info", result.user);
			alert("login successfully");
		} catch (error: unknown) {
			if(error instanceof Error){
				console.error('Error signing in: ', error.message ?? error)
			}
		}
	}
	const loginWithEmailAndPassword = async () => {
		try {
			const result = await signInWithEmailAndPassword(auth, email, password)
			setUser(result.user);
		} catch (error) {
			if(error instanceof Error){
				console.error('Error signing in: ', error.message ?? error)
			}
		}
	}
	
	return(
		<div className='flex flex-col flex-wrap'>
			<div id='login-email-password'>
				<input
					type='email'
					placeholder='enter your email...'
					onChange={(evt) => setEmail(evt.target.value)}
				/>
				<input 
					type='password'
					placeholder='enter your password'
					onChange={(evt) => setPassword(evt.target.value)}
				/>

				<button onClick={loginWithEmailAndPassword}>login</button>
			</div>
			<div id='login-google'>
				{ user ? (
					<p>Welcome, {user.displayName}</p>
				): (
					<button onClick={signupWithGoogle}>Sign in with google</button>
				)}
			</div>
		</div>
		
	)
}