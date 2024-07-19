import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config";

export async function cadastrarUsuario(nome, email, senha) {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, senha);
    await updateProfile(user, { displayName: nome });
    return user;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw error;
  }
}

export async function entrarGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Erro ao entrar com Google:", error);
    throw error;
  }
}

export async function loginUsuario(email, senha) {
  try {
    await signInWithEmailAndPassword(auth, email, senha);
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error;
  }
}
