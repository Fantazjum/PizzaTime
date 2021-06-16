import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { auth, addOrder, getOrders } from '../firebase.js';
import NewOrder from './NewOrder.js';
import MainPage from './MainPage.js';
import Location from './Location.js';
import Delivery from './Delivery.js';
import History from './History.js';
import NewUser from './NewUser.js';
import LogPanel from './LogPanel.js';

const Main = () => {
	const [orders, setOrders] = useState([]);
	const [times, setTimes] = useState([]);
	const [userName, setUsername] = useState("");
	const [user, setUser] = useState(null);
	const [logged, logon] = useState(false);
	
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((u) => {
			if(u){
				setUser(u);
			} else {
				setUsername("");
				setOrders([]);
				setTimes([]);
				setUser(null);
			}
		});
		return () => unsubscribe();
	}, []);
	
	useEffect(() => {
		if(user && !logged) {
			log();
			logon(true);
		}
	}, [user]);
	
	const onAccept = (event, ord) => 
	{
		const old = orders;
		let prev = times;
		const time = new Date();
		const datetime = time.getDate() + '.' + (time.getMonth() + 1) + '.' + time.getFullYear() + '   ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
		let newest = [ord]
		newest = old.concat(newest);
		prev = prev.concat(datetime);
		setOrders(newest);
		setTimes(prev);
		if(user){
			const newOrd = ord.map( it => { return sendTransform(it);} );
			let ordinary = [];
			let modded = [];
			newOrd.forEach( el => { 
				ordinary = ordinary.concat(el.order);
				modded = modded.concat(el.modifier);
			});
			addOrder(user, {orders: ordinary, timeStamps: datetime, mod: modded});
		}
	}
	
	const log = () => {
		if(!user) 
		{
			console.log("Przestań mieszać");
			return;
		}
		else 
		{
			setUsername(user.displayName);
			getOrders(user)
			.then((orderObjects) => {
			if(orders.length)
			{
				for(let idx=0; idx<orders.length; idx++) 
				{
					const newOrd = orders[idx].map( it => { return sendTransform(it); } );
					let ordinary = [];
					let modded = [];
					newOrd.forEach( ord => { 
						ordinary = ordinary.concat(ord.order);
						modded = modded.concat(ord.modifier);
					});
					addOrder(user, {orders: ordinary, timeStamps: times[idx], mod: modded});
				}
			}
			if(orderObjects)
			{
				let ordinary = [];
				let timestamp = [];
				orderObjects.forEach( (el) => {
					let newOrd = [];
					const oldOrd = el.data()['orders'];
					const modifiers = el.data()['mod'];
					for(let i=0; i < oldOrd.length; i++) {
						const o = [getTransform(oldOrd[i],modifiers[i])];
						newOrd = newOrd.concat(o)
					}
					ordinary = ordinary.concat([newOrd]);
					timestamp = timestamp.concat([el.data()['timeStamps']]);
				})
				ordinary = ordinary.concat(orders);
				timestamp = timestamp.concat(times);
				setOrders(ordinary); 
				setTimes(timestamp);
			}
			}).catch(error => {console.log(error)});
		}
	}
	
	const sendTransform = (order) => {
		const name = order.name;
		const ing = order.ingredients;
		const ord = {name: name, ingredients: ing};
		const mod = Object.assign({}, order.list);
		return {order: ord, modifier: mod }; 
	}
	
	const getTransform = (order, list) => {	return {name: order.name, ingredients: order.ingredients, list: Object.values(list)}; }
	
	return (
	<>
		<Switch>
			<Route path="/" exact>
				<section><MainPage /></section>
			</Route>
			<Route path="/newOrder">
				<section><NewOrder accept={onAccept} /></section>
			</Route>
			<Route path="/locations">
				<section><Location /></section>
			</Route>
			<Route path="/delivery">
				<section><Delivery /></section>
			</Route>
			<Route path="/history">
				<section><History hist={orders} time={times} /></section>
			</Route>
			<Route path="/register">
				<section><NewUser login={log} /></section>
			</Route>
			<Route>
				<section><h1>Error 404 - not found</h1></section>
			</Route>
		</Switch>
		<LogPanel usr={userName} logged={user} login={log} logout={() => logon(false)} />
		</>
	)
	
}

export default Main;