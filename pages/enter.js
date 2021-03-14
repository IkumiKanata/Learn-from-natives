import { auth, googleAuthProvider } from '../lib/firebase';
import { useContext } from 'react';
import { UserContext } from '../lib/context';


export default function Enter(props) {
  const { user, username } = useContext(UserContext)


  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      {user ? 
        <SignOutButton /> 
        : 
        <><SignInButton />
        <GuestLogin/></>
      }
    </main>
  );
}

// Sign in with Google button
export function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={'/google.png'} /> Sign in with Google
    </button>
  );
}
export function GuestLogin() {
  const signInAnonymously = async () => {
    await auth.signInAnonymously();

  } 
  
 
  return (
    <button className="btn-google" onClick={signInAnonymously}>
      <img src={'/google.png'} /> Guest Login
    </button>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

