import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import { auth, addOrder, getOrders } from '../firebase.js';
import NewOrder from './NewOrder/NewOrder';
import About from './About/About';
import Location from './Location/Location';
import Delivery from './Delivery/Delivery';
import History from './History/History';
import Register from './Register/Register';
import LoginPanel from './LoginPanel/LoginPanel';
import Order from './Models/Order';
import Pizza from './Models/Pizza';
import Modifier from './Models/Modifier';
import { QuerySnapshot } from 'firebase/firestore';

interface TransformPizza {
	name: string,
	ingredients: string[]
};

type TransformedSplit =
	TransformPizza
	| (string | number)[][];

const Main = () => {
	const [orders, setOrders] = useState<Order[]>([]);
	const [times, setTimes] = useState<string[]>([]);
	const [username, setUsername] = useState('');
	const [user, setUser] = useState<any>(null);
	const [logged, logon] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = (auth.onAuthStateChanged((u: any) => {
			if (u) {
				setUser(u);
				setUsername((username) => username
					? username
					: u.displayName
						? u.displayName
						: 'Guest'
				);

			} else {
				setUsername('');
				setOrders([]);
				setTimes([]);
				setUser(null);
			}
		}));


		return () => unsubscribe();
	}, []);

	const onAccept = (ord: Order) => {
		const time = new Date();
		const datetime =
			time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear() + '   '
			+ time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();

		const newTimes = [...times, datetime];
		const newest = [...orders, ord];
		setOrders(newest);
		setTimes(newTimes);

		if (user) {
			const transformedOrder: TransformPizza[] = [];
			const transformedModifiers: (string | number)[][][] = [];

			for (const order of newest) {
				const [orders, modifiers] = order.pizzas.reduce((savedArray: TransformedSplit[][], pizza: Pizza) => {
					const { order, modifier } = sendTransform(pizza);
					return [
						[...savedArray[0], order],
						[...savedArray[1], modifier],
					];
				}, [[], []]);

				transformedOrder.push(...(orders as TransformPizza[]));
				transformedModifiers.push(...(modifiers as (string | number)[][][]));
			}

			addOrder(user, { orders: transformedOrder, timeStamps: datetime, mod: transformedModifiers })
				.then((x) => navigate('/delivery'));
		} else {
			navigate('/delivery');
		}
	}

	const login = useCallback(() => {
		if (!user) {
			console.log('Stop messing around');
			return;
		}
		else {
			setUsername(user.displayName);
			getOrders(user)
				.then((orderObjects: QuerySnapshot) => {
					if (orders.length) {
						for (const [idx, order] of orders.entries()) {
							const [orders, modifiers] = order.pizzas.reduce(
								(savedArray: TransformedSplit[][], pizza: Pizza) => {
									const { order, modifier } = sendTransform(pizza);
									return [
										[...savedArray[0], order],
										[...savedArray[1], modifier],
									];
								},
								[[], []],
							);
							addOrder(user, { orders: orders, timeStamps: times[idx], mod: modifiers });
						}
					}

					if (orderObjects) {
						const allOrders: Order[] = [];
						const allTimestamps: string[] = [];
						orderObjects.forEach((el: any) => {
							const newOrd: Pizza[] = [];
							const oldOrd: TransformPizza[] = el.data()['orders'];
							const modifiers: (string | number)[][][] = el.data()['mod'];
							for (const [idx, order] of oldOrd.entries()) {
								const pizza = getTransform(order, modifiers[idx]);
								newOrd.push(pizza)
							}
							allOrders.push({ pizzas: newOrd });
							allTimestamps.push(el.data()['timeStamps']);
						})
						allOrders.push(...orders);
						allTimestamps.concat(...times);
						setOrders(allOrders);
						setTimes(allTimestamps);
					}
				}).catch((error: any) => { console.error(error) });
		}
	}, [orders, times, user]);

	useEffect(() => {
		if (user && !logged) {
			login();
			logon(true);
		}
	}, [user, login, logged]);

	const sendTransform = (pizza: Pizza) => {
		const name = pizza.name;
		const ingredients = pizza.ingredients;
		const order = { name, ingredients };
		const modifier = Object.assign({}, pizza.modifiers?.map((mod) => [mod.type, mod.ingredient, mod.count]));

		return { order, modifier } as { order: TransformPizza, modifier: (string | number)[][] };
	}

	const getTransform = (order: { name: string, ingredients: string[] }, modifiers: (string | number)[][]) => {
		return {
			name: order.name,
			ingredients: order.ingredients,
			modifiers: Object.values(modifiers).map(triplet => {
				return {
					type: triplet[0],
					ingredient: triplet[1],
					count: triplet[2],
				} as Modifier;
			})
		} as Pizza;
	};

	const logout = () => {
		logon(false);
		setUser(null);
	}

	return (
		<>
			<Routes>
				<Route path="/" element={<About />} />
				<Route path="/newOrder" element={<NewOrder onAccept={onAccept} />} />
				<Route path="/locations" element={<Location />} />
				<Route path="/delivery" element={<Delivery />} />
				<Route path="/history" element={<History history={orders} time={times} />} />
				<Route path="/register" element={<Register registerUsername={setUsername} />} />
				<Route path='/*' element={<h1>Error 404 - not found</h1>} />
			</Routes>
			<LoginPanel usr={username} logged={!!user} logout={logout} />
		</>
	)

}

export default Main;