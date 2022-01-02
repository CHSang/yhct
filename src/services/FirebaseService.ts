import { convert } from './Converter';
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, updateDoc, getDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import { UserInfo } from "../share/Type";

const firebaseConfig = {
  apiKey: "AIzaSyDf08VD0Z16DRWLc9HMf5KkHBCmU0Ij-Qk",
  authDomain: "yhct-f0367.firebaseapp.com",
  projectId: "yhct-f0367",
  messagingSenderId: "347872434363",
  appId: "1:347872434363:web:82d0db2e0fc6b6b56bf19e",
  measurementId: "G-DZEC9Y5RNY",
  storageBucket: "gs://yhct-f0367.appspot.com/"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const storage = getStorage(firebaseApp);

export const getUploadFIle = async (fileName: string) => {
  try {
    let url = await getDownloadURL(ref(storage, fileName));
    return url;
  } catch (e) {
    console.error("Error uploading video: ", e);
  }
};

export const uploadFIle = async (file: Blob, fileName: string) => {
  try {
    const storageRef = ref(storage, fileName);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded file success");
    });
  } catch (e) {
    console.error("Error uploading video: ", e);
  }
};

export const getUserInfo = async (email: string) => {
  try {
    const docRef = await doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return await convert(docSnap.data());
    } 
  } catch (e) {
    console.error("Error getting document: ", e);
  }
  return null;
};

export const updateUserInfo = async (user: UserInfo) => {
  try {
    const docRef = doc(db, "users", user.email);
    await updateDoc(docRef, {
      ...user
    });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

export const addUserInfo = async (user: UserInfo) => {
  try {
    await setDoc(doc(db, "users", user.email), user);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const signinWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  let result = await signInWithEmailAndPassword(auth, email, password);
  return result;
};

export const signUpUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  let result = await createUserWithEmailAndPassword(auth, email, password);
  return result;
};
