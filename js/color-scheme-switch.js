let schemeSwitchButton = document.querySelector('#theme-switch button');
let schemeSelect = document.querySelector('#theme-switch select');
let currentSchemeIndex = window.getStoredSchemeIndex();
schemeSelect.value = currentSchemeIndex;

// Updates the emoji on the theme switch button to reflect the current color scheme
function updateButtonEmoji() {
    let emojis = ['⚙️', '🌙', '☀️'];
    schemeSwitchButton.textContent = emojis[currentSchemeIndex];
}

updateButtonEmoji();

// Event listener: cycles through color schemes when the button is clicked
schemeSwitchButton.addEventListener('click', () => {
    currentSchemeIndex = (currentSchemeIndex + 1) % window.cssColorSchemes.length;
    document.documentElement.style.colorScheme = window.cssColorSchemes[currentSchemeIndex];
    schemeSelect.value = currentSchemeIndex;
    localStorage.setItem('cssColorSchemeIndex', currentSchemeIndex);
    updateButtonEmoji();
});

// Event listener: changes color scheme when a new option is selected from the dropdown
schemeSelect.addEventListener('change', () => {
    currentSchemeIndex = parseInt(schemeSelect.value);
    document.documentElement.style.colorScheme = window.cssColorSchemes[currentSchemeIndex];
    localStorage.setItem('cssColorSchemeIndex', currentSchemeIndex);
    updateButtonEmoji();
});