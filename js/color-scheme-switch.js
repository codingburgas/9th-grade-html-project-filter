let schemeSelect = document.querySelector('#theme-switch select');
let currentSchemeIndex = getStoredSchemeIndex() ?? 0;
schemeSelect.value = currentSchemeIndex;

document.querySelector('#theme-switch button').addEventListener('click', () => {
    currentSchemeIndex = (currentSchemeIndex + 1) % cssColorSchemes.length;
    document.documentElement.style.colorScheme = cssColorSchemes[currentSchemeIndex];
    schemeSelect.value = currentSchemeIndex;
    localStorage.setItem('cssColorSchemeIndex', currentSchemeIndex);
});

schemeSelect.addEventListener('change', () => {
    currentSchemeIndex = parseInt(schemeSelect.value);
    document.documentElement.style.colorScheme = cssColorSchemes[currentSchemeIndex];
    localStorage.setItem('cssColorSchemeIndex', currentSchemeIndex);
});