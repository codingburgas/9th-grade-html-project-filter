export async function addEmployee(employeeInfoStore, loginsStore, firstName, lastName, crew, role, email, password) {
	for (let i = 0; i < arguments.length; i++) {
		if (arguments[i] === undefined || arguments[i] === null) {
			throw new TypeError(`Attempted to add employee with null or undefined property: argument at index ${i} is ${arguments[i]}.`);
		}
	}

	let id = await employeeInfoStore.add({firstName, lastName, crew, role, email});
	loginsStore.add({id, email, password});
}