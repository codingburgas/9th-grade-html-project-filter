let cssColorSchemes = ['light dark', 'dark', 'light'];

function getStoredSchemeIndex() {
    let schemeIndex = parseInt(localStorage.getItem('cssColorSchemeIndex'));

    if (isNaN(schemeIndex) || schemeIndex >= cssColorSchemes.length) {
        return null;
	}

    return schemeIndex;
}