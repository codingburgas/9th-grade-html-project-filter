let schemeSelect = document.querySelector('#theme-switch select');
let currentSchemeIndex = window.getStoredSchemeIndex();
schemeSelect.value = currentSchemeIndex;

document.querySelector('#theme-switch button').addEventListener('click', () => {
    currentSchemeIndex = (currentSchemeIndex + 1) % window.cssColorSchemes.length;
    document.documentElement.style.colorScheme = window.cssColorSchemes[currentSchemeIndex];
    schemeSelect.value = currentSchemeIndex;
    localStorage.setItem('cssColorSchemeIndex', currentSchemeIndex);
});

schemeSelect.addEventListener('change', () => {
    currentSchemeIndex = parseInt(schemeSelect.value);
    document.documentElement.style.colorScheme = window.cssColorSchemes[currentSchemeIndex];
    localStorage.setItem('cssColorSchemeIndex', currentSchemeIndex);
});