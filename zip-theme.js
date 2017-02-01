// require modules
const fs = require( 'fs' );
const path = require( 'path' );
const archiver = require( 'archiver' );

// create a file to stream archive data to.
const output = fs.createWriteStream( path.resolve( __dirname, './build/foxhound.zip' ) );
const archive = archiver( 'zip', {
	store: true // Sets the compression method to STORE.
} );

// Our theme files
const files = [
	'./build/app.js',
	'./build/customize-preview.js',
	'./build/style.css',
	'./footer.php',
	'./functions.php',
	'./header.php',
	'./inc/compat-warnings.php',
	'./inc/customizer.php',
	'./inc/load-data.php',
	'./inc/load-menu.php',
	'./inc/permalinks.php',
	'./index.php',
	'./README.md',
	'./screenshot.png',
	'./sidebar.php',
	'./style.css',
];

const directories = [
	'./js/',
	'./sass/',
];

// listen for all archive data to be written
output.on( 'close', () => {
	console.log( archive.pointer() + ' total bytes' );
	console.log( 'archiver has been finalized and the output file descriptor has closed.' );
} );

// watch for any errors
archive.on( 'error', function( err ) {
	throw err;
} );

// send archive data to the output file
archive.pipe( output );

// add each file to the zip
files.map( file => {
	console.log( `Adding ${file}` );
	const filepath = path.resolve( __dirname, file );
	archive.file( filepath, { name: file } );
} );

directories.map( directory => {
	console.log( `Adding ${directory}` );
	const dirpath = path.resolve( __dirname, directory );
	archive.directory( dirpath, directory );
} )

console.log( 'Saving the zip to build/foxhound.zip' );
// finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();
