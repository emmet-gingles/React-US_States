import React, { Component } from "react";

/*  The class displays an input box which uses its input to filter the data shown in the table */

class Searchbox extends Component {
		
	render() {
		return (
			<div>
			{/*  input box has an onchange event that stores it as a property for the parent component */}
				<label htmlFor="search">Filter states  </label>
				<input type="text" id="search" onChange={ this.props.handleInput }/>
			</div>
		);
	}
}

export default Searchbox