import database from "./database-object.js";

let cursor = await database.transaction('employeeInfo').store.index('crew').openCursor(null, 'nextunique');
let list = document.getElementById('crews');
while (cursor) {
  let crew = document.createElement('p');
  crew.innerHTML = `${cursor.key} <span class="${'s' + cursor.value.status}">${getStatus(cursor.value.status)}</span>`;
  list.appendChild(crew);
  cursor = await cursor.continue();
}

function getStatus(statusNumber) {
	switch (statusNumber) {
		case 0: return "Свободен"; break;
		case 1: return "В очакване"; break;
		case 2:
		default: return "Зает";
	}
}