import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./config";
import { signOut } from "firebase/auth";

const comprasCol = collection(db, "compras");

export async function addCompra(data) {
  await addDoc(comprasCol, data);
}

export async function getItensUsuario(idUsuario) {
  try {
    const filtro = query(comprasCol, where("idUsuario", "==", idUsuario));
    const snapshot = await getDocs(filtro);
    const compras = [];

    snapshot.forEach((doc) => {
      compras.push({ ...doc.data(), id: doc.id });
    });

    return compras;
  } catch (error) {
    console.error("Erro ao obter itens do usuário:", error);
    return []; // Retorna um array vazio em caso de erro
  }
}

export async function deleteItem(id) {
  const itemDoc = doc(comprasCol, id);
  await deleteDoc(itemDoc);
}

export async function getItem(id) {
  const itemDoc = doc(comprasCol, id);
  const item = await getDoc(itemDoc);

  return item.data();
}

export async function updateItem(id, data) {
  const ItemDoc = doc(comprasCol, id);
  await updateDoc(ItemDoc, data);
}

export async function logout() {
  await signOut(auth);
}
