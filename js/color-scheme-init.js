// Intentionally non-module and placed in the <head> to run before
// the <body> loads and prevent a flash of unstyled content (FOUC)
document.documentElement.style.colorScheme = window.cssColorSchemes[window.getStoredSchemeIndex()];