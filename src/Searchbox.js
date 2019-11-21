import React, { Component } from "react";			// Import React and Component modules

//  This class displays an input box which uses its input to filter the data shown in the table 
class Searchbox extends Component {
		
	render() {
		return (
			<div>
				<label htmlFor="search">Filter states  </label>
				{/*  Input box has an onchange event that stores it as a property for the parent component */}
				<input type="text" id="search" onChange={ this.props.handleInput }/>
			</div>
		);
	}
}

// Export class component
export default Searchbox