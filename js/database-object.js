import { openDB } from 'https://cdn.jsdelivr.net/npm/idb/+esm';
import addPlaceholderEmployees from './database-placeholders.js';

// Function to initialize the database structure and add initial data
function initializeDatabase(database) {
	let employeeInfo = database.createObjectStore('employeeInfo', {autoIncrement: true, keyPath: 'id'});
	let logins = database.createObjectStore('logins', {keyPath: 'id'});
	let disasters = database.createObjectStore('disasters', {autoIncrement: true});

	employeeInfo.createIndex('crew', 'crew');
	disasters.createIndex('location', 'location');
	disasters.createIndex('type', 'type');
	disasters.createIndex('date', 'date');

	addPlaceholderEmployees(employeeInfo, logins);
}

// Open (or create) the 'operations' database, version 1, and run the upgrade function if needed
const database = await openDB('operations', 1, {
	upgrade: initializeDatabase
});

export default database;