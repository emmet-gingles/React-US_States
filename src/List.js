import React, { Component } from "react";
import Table from 'react-bootstrap/Table';			/* use to apply Bootstrap style to table */
import StateInfo from "./StateInfo";				/* import StateInfo component */
import Searchbox from "./Searchbox";				/* import Searchbox component */
import "./style/style.css";							/* import CSS stylesheet */
var file = require('./data/states.json');			/* file that will be read */


/*  This class reads in data from a file and displays it in a table */

class List extends Component {
	constructor(props){
		super();
		
		this.state = {
			states : [],				/* array to store information on each state obtained from file */
			stateOrder: 1,				/* binary variable to determine the order of each state (1 for ascending, -1 for descending) */
			capitalOrder: 1,			/* binary variable to determine the order of each state capital (1 for ascending, -1 for descending) */
			statecodeOrder: 1			/* binary variable to determine the order of each statecode (1 for ascending, -1 for descending) */
		};
		/* initialize functions */
		this.getData = this.getData.bind(this);
		this.changeOrder = this.changeOrder.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}
	
	/* function that reads in the states from file and filters them passed on the search argument */
	getData(search) {
		/* variable to store read the value of each "state" key stored in the file */
		var states_data = file.states;
		
		/* if the search parameter is not empty then filter results that start with it */
		if(search !== ""){
			states_data = states_data.filter( function(statename){
				return statename.state.toLowerCase().startsWith(search);
			});						
		}
		
		/* update the state to the variable */
		this.setState({
			states: states_data
		});
	}
	
	/* call the getData() function once the component has rendered */
	componentDidMount() {		
		this.getData("");
	}
	
	/* function that changes the order that the states are displed in */
	changeOrder(sortType) {
		/* variable to store the order */
		var state_order;
		
		/* if sortType parameter is state then sort by state */
		if(sortType === "state"){
			/* if stateOrder is ascending then sort them in ascending order */
			if(this.state.stateOrder === 1) {
				// call sort function to adjust the order for each state 
				state_order = this.state.states.sort(function(a, b){
					if(a.state < b.state) { return 1; }
					else if(a.state > b.state) { return -1; }
					return 0;
				});
				/* set the state of the variable to -1 */
				this.setState({
					stateOrder: -1
				});
			}
			/* else sort them in descending order */
			else {
				state_order = this.state.states.sort(function(a, b){
					if(a.state < b.state) { return -1; }
					else if(a.state > b.state) { return 1; }
					return 0;
				});
				/* set the state of the variable to 1 */
				this.setState({
					stateOrder: 1
				});
			}			
		}
		/* else if sortType parameter is capital then sort by capital */
		else if(sortType === "capital"){
			if(this.state.capitalOrder === 1) {
				state_order = this.state.states.sort(function(a, b){
					if(a.capital < b.capital) { return -1; }
					else if(a.capital > b.capital) { return 1; }
					return 0;
				});
				this.setState({
					capitalOrder: -1
				});
			}
			else {
				state_order = this.state.states.sort(function(a, b){
					if(a.capital < b.capital) { return 1; }
					else if(a.capital > b.capital) { return -1; }
					return 0;
				});
				this.setState({
					capitalOrder: 1
				});
			}
		}
		/* if sortType parameter is statecode then sort by statecode */
		else if(sortType === "statecode"){
			if(this.state.statecodeOrder === 1) {
				state_order = this.state.states.sort(function(a, b){
					if(a.statecode < b.statecode) { return -1; }
					else if(a.statecode > b.statecode) { return 1; }
					return 0;
				});
				this.setState({
					statecodeOrder: -1
				});
			}
			else {
				state_order = this.state.states.sort(function(a, b){
					if(a.statecode < b.statecode) { return 1; }
					else if(a.statecode > b.statecode) { return -1; }
					return 0;
				});
				this.setState({
					statecodeOrder: 1
				});
			}			
		}
		
		/* update the state with the variable  */
		this.setState({
			states: state_order
		});
	}
	
	/* function that reads in the input, converts it to lower case and passes it as a parameter to getData() */
	handleInput(){
		var search = document.getElementById("search").value.toLowerCase();		
		this.getData(search);					
	}
	
	render() {
		/* map each state and passes the key values to a StateInfo component */
		const items = this.state.states.map((item, key) =>			
			<StateInfo state ={ item.state } capital ={ item.capital } statecode ={ item.statecode } index={ key } />
		);
		/* variables to determine the glyphicon to show for the respective table columns */
		var classtype1, classtype2, classtype3 = "";
		
		/* if stateOrder is ascending then set variable to downwards triangle (data is initially in order) */
		if (this.state.stateOrder === 1) { classtype1 = "glyphicon glyphicon-triangle-bottom" }
		/* else set variable to an upwards triangle */
		else { classtype1 = "glyphicon glyphicon-triangle-top" }
		
		/* if capitalOrder is ascending then set variable to upwards triangle */
		if (this.state.capitalOrder === 1) { classtype2 = "glyphicon glyphicon-triangle-top" }
		/* else set variable to an downwards triangle */
		else { classtype2 = "glyphicon glyphicon-triangle-bottom" }
		
		/* if statecoOrder is ascending then set variable to upwards triangle */
		if (this.state.statecodeOrder === 1) { classtype3 = "glyphicon glyphicon-triangle-top" }
		/* else set variable to an downwards triangle */
		else { classtype3 = "glyphicon glyphicon-triangle-bottom" }
		
		return(
			<div>
			{/* Searchbox which calls handleInput() function whenever it is changed  */}
				<Searchbox handleInput={ this.handleInput }/>
				
				{/* Bootstrap table with style */}
				<Table striped bordered hover >				
					<thead>
						<tr>
							{/* the table headers, add onClick handler to call changeOrder() function with appropriate parameter
								add span with the respective classtype variable to display the appropriate glyphicon */}
							<th onClick={() => this.changeOrder("state") }>State <span className={ classtype1 }></span></th>
							<th onClick={() => this.changeOrder("capital") }>Capital <span className={ classtype2 }></span></th>
							<th onClick={() => this.changeOrder("statecode") }>State code <span className={ classtype3 }></span></th>
						</tr>
					</thead>
					
					{/* display the items variable to show a StateInfo component for each state */}
					<tbody>
						{ items }
					</tbody>
				</Table>

			</div>
		);
	}
}

export default List;