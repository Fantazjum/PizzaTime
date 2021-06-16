import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import Order from './Order.js';
import IngredientSelect from './IngredientSelect.js'
import PizzaSelect from './PizzaSelect.js';
import Pizza from './Pizza.js';

import Piz from '../images/Pizza.jpg';
import Del from '../images/Delivery.png';

class NewOrder extends Component {
	
	pizzas = [
		{name: "Margharita", ingredients: ["Ser"]},
		{name: "Wegetariańska", ingredients: ["Ser", "Por", "Oliwki", "Kukurydza", "Pieczarki", "Papryka", "Cebula"]},
		{name: "Diablo", ingredients: ["Sos chilli", "Ser", "Czosnek", "Pomidor", "Cebula", "Salami"]},
		{name: "Hawajska", ingredients: ["Ser", "Szynka", "Ananas"]},
		{name: "Własna", ingredients: []}
	];
	
	ingredients() {
		let ing = [];
	
		this.pizzas.forEach(el =>(
			ing = ing.concat(el.ingredients)
		))
		
		return ing.filter((v, i, a) => a.indexOf(v) === i)
	}
	
	state = {
			pizza: this.pizzas[0].name,
			ingredients: this.pizzas[0].ingredients,
			additional: [],
			num: [],
			numadd: 1,
			removed: [],
			numrem: 1,
			order: []
	};
	
	onSelect = (event) => {
		const i = event.target.options.selectedIndex;
		const p = this.pizzas[i].name;
		const ing = this.pizzas[i].ingredients;
		this.setState({pizza: p, ingredients: ing, additional: [], num: [], removed: [], numadd: 0, numrem: 0})
		setTimeout(() => this.setState({numadd: 1, numrem: 1}), 10); //BruteForce reset
	}
	
	manip = (event, idx, number) => {
		const numbers = this.state.num.map( (that, it) => {
				if( it === idx ) return number;
				else return that;
			});
		this.setState({num: numbers});
	}
	
	onPosSelect = (event, idx, old, val) => {
		const ing = event.target.value;
		const i = event.target.options.selectedIndex;
		let num = this.state.numadd;
		let numbers = this.state.num;
		let list = this.state.additional;
		if(i && idx === num - 1) 
		{
			num += 1;
			list = list.concat(ing);
			numbers = numbers.concat(1);
			this.setState({additional: list, num: numbers});
		}
		else if(idx === num - 2 && old && i === 0) 
		{
			list = list.filter( that => ( that !== val ) );
			num -= 1;
			numbers = numbers.filter((that, it) => ( it !== num ))
			this.setState({additional: list, num: numbers});
		}
		else
		{
			list = list.map( (that, it) => { 
				if(it === idx) return ing;
				else return that;
			});
			numbers = numbers.map( (that, it) => {
				if( it === idx ) return 1;
				else return that;
			});
			this.setState({additional: list, num: numbers});
		}
		this.setState({numadd: num})
	}
	
	onNegSelect = (event, idx, old, val) => {
		const ing = event.target.value;
		const i = event.target.options.selectedIndex;
		let num = this.state.numrem;
		if(i && idx === num - 1) 
		{
			num += 1;
			const list = this.state.removed.concat(ing);
			this.setState({removed: list});
		}
		else if(idx === num - 2 && old && i === 0) 
		{
			const list = this.state.removed.filter( it => ( it !== val ) );
			num -= 1;
			this.setState({removed: list});
		}
		else
		{
			const list = this.state.removed.map( it => { 
				if(it === val) return ing;
				else return it;
			});
			this.setState({removed: list});
		}
		this.setState({numrem: num})
	}
	
	onClick = (event) => {
		let num = this.state.num;
		const added = this.state.additional.map( (it, i) => {
			return ['Dodatkowe:', it, num[i]]
		});
		const removed = this.state.removed.map( it => {
			return ['Bez:', it, 0]
		});
		const list = added.concat(removed);
		const ord = this.state.order.concat({name: this.state.pizza, ingredients: this.state.ingredients, list: list});
		this.setState({order: ord});
	}
	
	end = (event) => {
		this.props.accept(event, this.state.order);
	}
		
	render() 
	{
		const ing = this.ingredients();
		let dod = [];
		let us = [];
		let i;
		for(i=0; i<this.state.numrem; i++) 
		{
			let rem = this.state.ingredients;
			if(i>0)
			{
				for(let j=0; j<i; j++)
				{
					rem = rem.filter( it => ( it !== this.state.removed[j]) );
				}
			}
			if(i > this.state.numrem-3) rem = [""].concat(rem);
			us = us.concat(<IngredientSelect options={rem} sel={this.onNegSelect} stable={true} num={i} lim={this.state.numrem}/>);
			us = us.concat(<br/>);
		}
		for(i=0; i<this.state.numadd; i++) 
		{
			let add = ing;
			if(i>0)
			{
				for(let j=0; j<i; j++)
				{
					add = add.filter( it => ( it !== this.state.additional[j]) );
				}
			}
			if(i > this.state.numadd-3) add = [""].concat(add);
			dod = dod.concat(<IngredientSelect options={add} sel={this.onPosSelect} stable={false} manip={this.manip} num={i} lim={this.state.numadd}/>);
			dod = dod.concat(<br/>);
		}
		return(
		<div style={{backgroundImage: `url(${Del})`, backgroundSize: 'cover', display: 'flex', justifyContent: "center", height: 120 + '%'}}>
			<div style={{border: 3 + 'px Solid', backgroundColor: 'AntiqueWhite', width: 50 + '%'}}>
				<img src={Piz} style={{width: 100 + '%', height: 15 + '%'}} alt='PizzaBanner'/>
				<div style={{border: 2 + 'px solid Coral', overflow: 'hidden', width: 80 + '%', margin: 'auto', backgroundColor: 'Cornsilk'}}>
				<h2>Obecne zamówienie:</h2><Order pizzas={this.state.order} />
				</div>
				<h3>Wybierz pizze:</h3>
				<PizzaSelect options={this.pizzas} sel={this.onSelect} />
				<Pizza name={this.state.pizza} ing={this.state.ingredients} />
				<h3>Modyfikacje pizzy:</h3>
				<h4>Dodaj skladnik:</h4>
				{dod}<br/>
				<h4>Usun skladnik:</h4>
				{us}<br/>
				<button className="btn btn-success" onClick={this.onClick}>Dodaj do zamówienia</button>
				<br/><br/><NavLink to='/delivery' className="btn btn-danger" onClick={this.end}>Zamów</NavLink>
			</div>
		</div>)
	}
}

export default NewOrder;