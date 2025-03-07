import { useState } from 'react'
import { auth, googleProvider } from '../lib/firebaseConfig'
import { signInWithPopup, User } from 'firebase/auth'

export default function Login(){
	const [user, setUser] = useState<User | null>(null);

	const signupWithGoogle = async () => {
		try {
			const result = await signInWithPopup(auth, googleProvider);
			setUser(result.user);
			console.log("User Info", result.user);
			alert("login successfully");
		} catch (error: any) {
			console.error('Error signing in: ', error.message ?? error)
		}
	}
	
	return(
		<div>
			{ user ? (
				<p>Welcome, {user.displayName}</p>
			): (
				<button onClick={signupWithGoogle}>Sign in with google</button>
			)}
		</div>
	)
}