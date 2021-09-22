#!/usr/bin/env node
const XLSX = require("xlsx");
const jsondiffpatch = require("jsondiffpatch");
const colorize = require('json-colorizer');

let myArgs = process.argv.slice(2);
if(myArgs.length<2) {
	console.log("Usage: sheets_compare [file1] [file2]")
}else{
	const wb1 = XLSX.readFile(
		myArgs[0]
	);

	const wb2 = XLSX.readFile(
		myArgs[1]
	);
	
	let delta = jsondiffpatch.diff(wb1, wb2);
	const json = JSON.stringify(delta, null, 2);
	console.log(colorize(json, {
		colors: {
		  STRING_KEY: 'blue',
		  STRING_LITERAL: '#FFFF99',
		  NUMBER_LITERAL: '#FF0000'
		}
	}));
}
