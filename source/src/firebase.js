import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCvT15B35PgjAzdLJVf-y6ye-F3x-fTYwo",
    authDomain: "pizzatime-da68e.firebaseapp.com",
    databaseURL: "https://pizzatime-da68e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pizzatime-da68e",
    storageBucket: "pizzatime-da68e.appspot.com",
    messagingSenderId: "467921973736",
    appId: "1:467921973736:web:d274940957268e76ca745d"
  };
  
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app();
}

export const auth = firebase.auth();

export const firestore = firebase.firestore();

/*--------------------------------------------------------*/

export const addUserData = async (user, userData) => {
	return firebase.collection("users").doc(user.uid).set({
		...userData
	});
}

export const getUserData = async (user) => {
	return firestore.collection("users").doc(user.uid).get();
}

export const updateUserDate = async (user, userData) => {
	return firestore.collection("users").doc(user.uid).update({
		...userData
	});
}

export const addOrder = (user, orderData) => {
	firestore.collection("orders").add({
		owner: user.uid,
		dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
		orders: orderData.orders,
		timeStamps: orderData.timeStamps,
		mod: orderData.mod
	});
}

export const getOrders = (user) => {
	return firestore.collection("orders").where('owner', '==', user.uid).get();
}