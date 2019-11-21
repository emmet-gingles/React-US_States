import React, { Component } from "react";           // Import React and Component modules
import Table from 'react-bootstrap/Table';			// Use to apply Bootstrap style to table 
import StateInfo from "./StateInfo";				// Import StateInfo component 
import Searchbox from "./Searchbox";				// Import Searchbox component 
import "./style/style.css";							// Import CSS stylesheet 
var file = require('./data/states.json');			// JSON data file that will be read in 


//  This class reads in data from a file and displays it in a table 
class List extends Component {
	
	constructor(props){
		super();
		// Set state 
		this.state = {					
			states : [],				// Array to store information on each state obtained from file 
			stateOrder: 1,				/* Binary variable to determine the order of each state 
										   (1 for ascending, -1 for descending). Default of 0 (no sort) */
			capitalOrder: 0,			/* Binary variable to determine the order of each state capital 
										   (1 for ascending, -1 for descending). Default of 0 (no sort) */ 
			statecodeOrder: 0			/* Binary variable to determine the order of each statecode 
										   (1 for ascending, -1 for descending) */
		};
		// Initialize functions 
		this.getData = this.getData.bind(this);
		this.changeOrder = this.changeOrder.bind(this);
		this.getText = this.getText.bind(this);
	}
	
	// Function that reads in the states from file and filters them based on the search parameter
	getData(search) {
		// Variable to read in the array of states from file 
		var states_data = file.states;
		
		// If the search parameter is not empty then filter array to return all states that start with it 
		if(search !== ""){
			states_data = states_data.filter( function(statename){
				return statename.state.toLowerCase().startsWith(search);
			});						
		}
		
		// Update the state using array of states 
		this.setState({
			states: states_data
		});
	}
	
	// Call the getData() function once the component has rendered 
	componentDidMount() {		
		this.getData("");
	}
	
	// Function that changes the order that the states are displayed in 
	changeOrder(sortType) {
		// Variable to store the order 
		var state_order;
		
		// If sortType parameter is state then sort array by state 
		if(sortType === "state"){
			// If state order is ascending 
			if(this.state.stateOrder === 1) {
				// Call sort function on array and compare each state to the next, to order them in descending order
				state_order = this.state.states.sort(function(a, b){
					return a.state < b.state;
				});
				// Update the state order to decending 
				this.setState({
					stateOrder: -1
				});
			}
			// Else state order is descending
			else {
				// Call sort function on array and compare each state to the next, to order them in ascending order 
				state_order = this.state.states.sort(function(a, b){
					return a.state > b.state;
				});
				// Update the state order to ascending
				this.setState({
					stateOrder: 1
				});
			}			
		}
		// Else if sortType parameter is capital then sort array by capital 
		else if(sortType === "capital"){
			// If capital order is descending
			if(this.state.capitalOrder === -1 ) {
				// Call sort function on array and compare each state capital to the next, to order them in ascending order
				state_order = this.state.states.sort(function(a, b){
					return a.capital < b.capital;
				});
				// Update the state order to ascending
				this.setState({
					capitalOrder: 1
				});				
			}
			// Else capital order is ascending
			else {
				// Call sort function on array and compare each state capital to the next, to order them in descending order
				state_order = this.state.states.sort(function(a, b){
					return a.capital > b.capital;
				});
				// Update the capital order to descending
				this.setState({
					capitalOrder: -1
				});
			}
		}
		// Else if sortType parameter is statecode then sort array by statecode 
		else if(sortType === "statecode"){
			// If statecode order is descending
			if(this.state.statecodeOrder === -1) {
				// Call sort function on array and compare each statecode to the next, to order them in ascending order
				state_order = this.state.states.sort(function(a, b){
					return a.statecode < b.statecode;
				});
				// Update the statecode order to ascending
				this.setState({
					statecodeOrder: 1
				});
			}
			// Else statecode order is ascending
			else {
				// Call sort function on array and compare each statecode to the next, to order them in descending order
				state_order = this.state.states.sort(function(a, b){
					return a.statecode > b.statecode;
				});
				// Update the statecode order to descending
				this.setState({
					statecodeOrder: -1
				});
			}			
		}		
		// Update the state with the ordered array 
		this.setState({
			states: state_order
		});
	}
	
	// Function that accepts text as a parameter and sends it to the getData() function
	getText(value){
		// Convert the text to lower case and save to variable
		var search = value.toLowerCase();		
		// Call getData() function passing the search variable as an argument
		this.getData(search);					
	}
	
	render() {
		// Map each state and pass the key values to a StateInfo component 
		const items = this.state.states.map((item, key) =>			
			<StateInfo state ={ item.state } capital ={ item.capital } statecode ={ item.statecode } index={ key } />
		);
		// Variables to determine the glyphicon to show for the respective table columns 
		var classtype1, classtype2, classtype3 = "";
		
		// If state order is ascending then set variable to upward triangle (will be the default)
		if (this.state.stateOrder === 1) { 
			classtype1 = "glyphicon glyphicon-triangle-top" 
		}
		// Else set variable to an downward triangle 
		else { 
			classtype1 = "glyphicon glyphicon-triangle-bottom" 
		}
		
		// If capital order is ascending then set variable to upwards triangle 
	    if (this.state.capitalOrder === 1) { 
			classtype2 = "glyphicon glyphicon-triangle-bottom" 
		}
		// Else set variable to an downwards triangle 
		else if(this.state.capitalOrder === -1) { 
			classtype2 = "glyphicon glyphicon-triangle-top" 
		}
		// Else set variable to a right triangle (will be default)
		else {
			classtype2 = "glyphicon glyphicon-triangle-right" 
		}
		
		// If statecode order is ascending then set variable to upwards triangle 
		if (this.state.statecodeOrder === 1) { 
			classtype3 = "glyphicon glyphicon-triangle-bottom" 
		}
		// Else set variable to an downwards triangle 
		else if(this.state.statecodeOrder === -1){ 
			classtype3 = "glyphicon glyphicon-triangle-top" 
		}
		// Else set variable to a right triangle (will be default)
		else {
			classtype3 = "glyphicon glyphicon-triangle-right" 
		}
		
		return(
			<div>
				{/* Searchbox which calls getText() function whenever it is changed and passes the text value as parameter */}
				<Searchbox handleInput={()=> this.getText(document.getElementById("search").value) }/>
				
				{/* Bootstrap table with style */}
				<Table striped bordered hover >				
					<thead>
						<tr>
							{/* The table headers, add onClick handler to call changeOrder() function with appropriate parameter
								Add span with the respective classtype variable to display the appropriate glyphicon */}
							<th onClick={()=> this.changeOrder("state") }>State <span className={ classtype1 }></span></th>
							<th onClick={()=> this.changeOrder("capital") }>Capital <span className={ classtype2 }></span></th>
							<th onClick={()=> this.changeOrder("statecode") }>State code <span className={ classtype3 }></span></th>
						</tr>
					</thead>					
					<tbody>
						{/* Display the items array to show a StateInfo component for each state */}
						{ items }
					</tbody>
				</Table>
			</div>
		);
	}
}

// Export class component
export default List;