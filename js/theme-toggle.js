let darkMode = false;
const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6'); //selects all elements that need color changes

// click event listener to add toggle dark theme
document.getElementById('theme-toggle').addEventListener('click', function () {
    if (!darkMode) {
        document.body.classList.add('dark-mode');
        textElements.forEach(element => {
            element.style.color = '#ffffff'; //change color for all elements to white
        });
    } else {
        document.body.classList.remove('dark-mode');
        textElements.forEach(element => {
            element.style.color = ''; //does the opposite of the above
        });
    }
    darkMode = !darkMode; //toggle dark mode
});