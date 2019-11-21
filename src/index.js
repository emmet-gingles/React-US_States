import React from "react"				// Import React module
import ReactDOM from "react-dom"        // Import React  module 
import List from "./List"				// Import List component 

// Use DOM to select div with the id "container" 
var destination = document.querySelector("#container");

// Render the List component within the div selected
ReactDOM.render(<List />, destination);