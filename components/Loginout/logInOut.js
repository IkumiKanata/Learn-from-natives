import { auth, googleAuthProvider } from '../../lib/firebase';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';
import toast from 'react-hot-toast';



// Sign in with Google button
export const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
    toast.success("Loged in with Google!")
  };

export const signInAnonymously = async () => {
    await auth.signInAnonymously();
    toast.success("Loged in as a guest!")

  } 

// Sign out button
export const SignOut = async () => {
  auth.signOut();
  toast.success("Signed out!")
 
}