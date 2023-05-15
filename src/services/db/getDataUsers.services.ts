import { Encuesta } from "app/admin/store/types";
import { FireBaseGetStore } from "firebase";
import { doc, onSnapshot } from "firebase/firestore";
interface UserDocs {
  rol: string,
  encuestas: Encuesta[]
}

export const getDataUsers = (nameDataBase: string, id: string): Promise<Encuesta[]> => {
  return new Promise((res, rej) => {
    onSnapshot(doc(FireBaseGetStore, nameDataBase, id), (doc) => {
      if (doc.exists()) {
        res(doc.data().encuesta as Encuesta[]);
      } else {
        rej(new Error("no existe documento"))
      }
    });

  });

};