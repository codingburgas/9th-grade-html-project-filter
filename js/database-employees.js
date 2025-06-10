// Adds a new employee to the employeeInfo and logins object stores.
// Throws an error if any argument is null or undefined.
export async function addEmployee(employeeInfoStore, loginsStore, firstName, lastName, crew, role, email, password) {
	// Validate that none of the arguments are null or undefined
	for (let i = 0; i < arguments.length; i++) {
		if (arguments[i] === undefined || arguments[i] === null) {
			throw new TypeError(`Attempted to add employee with null or undefined property: argument at index ${i} is ${arguments[i]}.`);
		}
	}

	let id = await employeeInfoStore.add({firstName, lastName, crew, role, email});
	loginsStore.add({id, email, password});
}