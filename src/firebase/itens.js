import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc, 
} from "firebase/firestore";
import { db, auth } from "./config"; 

const comprasCol = collection(db, "compras");

export async function addCompra(data) {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");

  const compraData = {
    ...data,
    idUsuario: user.uid,
  };

  await addDoc(comprasCol, compraData);
}

export async function getItensUsuario() {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");

  try {
    const filtro = query(comprasCol, where("idUsuario", "==", user.uid));
    const snapshot = await getDocs(filtro);
    const compras = [];

    snapshot.forEach((doc) => {
      compras.push({ ...doc.data(), id: doc.id });
    });

    return compras;
  } catch (error) {
    console.error("Erro ao obter itens do usuário:", error);
    return []; 
  }
}

export async function deleteItem(id) {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");

  const itemDoc = doc(comprasCol, id);
  const item = await getDoc(itemDoc);

  if (item.exists() && item.data().idUsuario === user.uid) {
    await deleteDoc(itemDoc);
  } else {
    throw new Error("Permissão negada para excluir este item");
  }
}

export async function getItem(id) {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");

  const itemDoc = doc(comprasCol, id);
  const item = await getDoc(itemDoc);

  if (item.exists() && item.data().idUsuario === user.uid) {
    return item.data();
  } else {
    throw new Error("Permissão negada para acessar este item");
  }
}

export async function updateItem(id, data) {
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");

  const itemDoc = doc(comprasCol, id);
  const item = await getDoc(itemDoc);

  if (item.exists() && item.data().idUsuario === user.uid) {
    await updateDoc(itemDoc, data);
  } else {
    throw new Error("Permissão negada para atualizar este item");
  }
}
