import { FireBaseGetStore } from "firebase";
import { doc, setDoc } from "firebase/firestore";

interface Props {
  [key: string]: any
}
export const setDocs = async (nameDataBase: string, entity: Props) => {
  await setDoc(doc(FireBaseGetStore, nameDataBase), { ...entity })

}