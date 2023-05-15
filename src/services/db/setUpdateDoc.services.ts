import { Encuesta } from "app/admin/store/types";
import { FireBaseGetStore } from "firebase";
import { doc, updateDoc } from "firebase/firestore";

export const setUpdateDoc = async (list: Encuesta[]) => {

  const dat = doc(FireBaseGetStore, 'users', 'ywNoLPVjpsMzMNssddyh7AypT3t2')
  await updateDoc(dat, {
    encuesta: [...list]
  })
}