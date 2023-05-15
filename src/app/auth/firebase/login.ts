import { FireBaseGetAuth } from "firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
export const getUsersFb = async (user: string, password: string) => {

  try {

    const response = await signInWithEmailAndPassword(FireBaseGetAuth, user, password);
    const { email, uid } = response.user;
    console.log(response)
    return {
      ok: true,
      email,
      uid
    }

  } catch (error) {
    const errorMessage = "¡Error! No se puedo acceder al la cuenta. Por favor verifique el email o password  "
    return {
      ok: false,
      errorMessage
    }
  }
};

/* export const getUsersFb = async (user:string,password:string)  => {

  
  let user: User;
  let users: User[] = [];

  const query = await getDocs(collection(db, "login"));

  query.forEach((res) => {
    user = {
      id: res.id,
      ...(res.data() as UserResponse),
    };
    users.push(user);
  });
  console.log(users);
  return users;

}; */

