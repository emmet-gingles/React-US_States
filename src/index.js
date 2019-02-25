import React from "react"
import ReactDOM from "react-dom"
import List from "./List"				/* import List component */

/* use DOM to select div with the id "container" */
var destination = document.querySelector("#container");

/* render the List component within the div selected */
ReactDOM.render(<List />, destination);