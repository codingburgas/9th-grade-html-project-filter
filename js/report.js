const inputs = document.getElementById('inputs');
const count = document.getElementById('count');

function dropDownAmount() {
    inputs.innerHTML =
      '<div><label>Име на пожарникар :</label><input type="text"></div>'.repeat(+count.value);
}
function toggleOtherInput() {
    const typeOfDisaster = document.getElementById('type');
    const otherDisaster = document.getElementById('other');
    if (typeOfDisaster.value === 'other') {
        otherDisaster.style.display = 'block';
    } else {
        otherDisaster.style.display = 'none';
    }
}

count.addEventListener('change', dropDownAmount);
dropDownAmount();