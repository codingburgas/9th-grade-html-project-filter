import database from '../js/database-object.js';

const inputs = document.getElementById('inputs');
const count = document.getElementById('count');
const form = document.querySelector('form');
const typeSelect = document.getElementById('type');

function dropDownAmount() {
    inputs.innerHTML =
      '<div class="form-group"><label>Име на пожарникар :</label><input type="text" placeholder="Пример: Иван Иванов"></div>'.repeat(+count.value);
}

function toggleOtherInput() {
    const otherDisaster = document.getElementById('other');
    if (typeSelect.value === 'other') {
        otherDisaster.style.display = 'block';
    } else {
        otherDisaster.style.display = 'none';
    }
}

function handleSubmit(event) {
    event.preventDefault();

    let type = document.getElementById('type').value;
    let disasterType;
    
    if (type === 'other') {
        disasterType = document.getElementById('other-input').value;
    } else {
        disasterType = type;
    }

    let place = document.getElementById('location').value;
    let coordinates = place.split(',').map(coord => parseFloat(coord.trim()));
    if (coordinates.length !== 2 || isNaN(coordinates[0]) || isNaN(coordinates[1])) {
        alert('Моля въведете валидни координати във формат: 42.69751, 23.32415');
        return;
    }

    let allInputs = inputs.querySelectorAll('input');
    let names = [];
    for(let i = 0; i < allInputs.length; i++) {
        names.push(allInputs[i].value);
    }

    let report = {
        type: disasterType,
        location: place,
        lat: coordinates[0],
        lng: coordinates[1],
        firefighters: names,
        date: new Date().toISOString()
    };

    let tx = database.transaction('disasters', 'readwrite');
    let store = tx.objectStore('disasters');

    store.add(report)
        .then(id => {
            alert('Докладът е изпратен успешно!');
            location.reload();
        })
}

count.addEventListener('change', dropDownAmount);
form.addEventListener('submit', handleSubmit);
typeSelect.addEventListener('change', toggleOtherInput);

dropDownAmount();