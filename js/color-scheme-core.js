// This script contains global objects that have to be shared across
// module and non-module scripts; therefore, it mustn't be made a module.

window.cssColorSchemes = ['light dark', 'dark', 'light'];

window.getStoredSchemeIndex = function() {
    let schemeIndex = parseInt(localStorage.getItem('cssColorSchemeIndex'));

    return isNaN(schemeIndex) ? 0 : schemeIndex;
}