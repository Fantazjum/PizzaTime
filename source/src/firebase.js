import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, addDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCvT15B35PgjAzdLJVf-y6ye-F3x-fTYwo',
	authDomain: 'pizzatime-da68e.firebaseapp.com',
	databaseURL: 'https://pizzatime-da68e-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'pizzatime-da68e',
	storageBucket: 'pizzatime-da68e.appspot.com',
	messagingSenderId: '467921973736',
	appId: '1:467921973736:web:d274940957268e76ca745d'
};


initializeApp(firebaseConfig);

export const app = getApp();

export const auth = getAuth(app);

export const firestore = getFirestore(app);

/*--------------------------------------------------------*/

export const addOrder = (user, orderData) => {
	return addDoc(collection(firestore, 'orders'), {
		owner: user.uid,
		dateCreated: Timestamp.fromDate(new Date(Date.now())),
		orders: orderData.orders,
		timeStamps: orderData.timeStamps,
		mod: orderData.mod
	});
}

export const getOrders = async (user) => {
	const orderQuery = query(query(collection(firestore, 'orders')), where('owner', '==', user.uid));
	return await getDocs(orderQuery);
}