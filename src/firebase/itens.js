import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";

const comprasCol = collection(db, "compras");

export async function addCompra(data) {
  await addDoc(comprasCol, data);
}

export async function getItens() {
  const snapshot = await getDocs(comprasCol);
  const compras = [];

  snapshot.forEach((doc) => {
    compras.push({ ...doc.data(), id: doc.id });
  });

  return compras;
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
