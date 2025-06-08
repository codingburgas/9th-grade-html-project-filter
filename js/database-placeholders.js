import { addEmployee } from './database-employees.js';

let placeholderEmployees = [
	['Красимир', 'Долов', 'A', 'firefighter', 'kdolovlovech@mvr.bg', 'j*9&j('],
	['Кольо', 'Манолов', 'C', 'mechanic', 'kmanolovlovech@mvr.bg', 'Luko1771'],
];

export default function addPlaceholderEmployees(employeesStore, loginsStore) {
	for (let employee of placeholderEmployees) {
		addEmployee(employeesStore, loginsStore, ...employee);
	}
}