import React, { Component } from "react";			// Import React and Component modules

// This class displays the properties of each state within a table row 
class StateInfo extends Component {
	
	render() {
		return(		
			<tr>
				{/* Each state has three cells for its statename, capital and statecode. 
					Also a unique key is generated using some text along with the index property */}
				<td key={ "state"+this.props.index } >{ this.props.state }</td>
				<td key={ "capital"+this.props.index } >{ this.props.capital }</td>
				<td key={ "statecode"+this.props.index } >{ this.props.statecode }</td>
			</tr>
		);
	}
}

// Export class component
export default StateInfo;