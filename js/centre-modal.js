function showModal(text) {
    document.getElementById("modal-text").innerText = text;
    document.getElementById("infoModal").style.display = "block";
}

function hideModal() {
    document.getElementById("infoModal").style.display = "none";
}