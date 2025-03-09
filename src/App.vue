<template>
  <RouterView />
</template>

<script setup>
</script>

<style>
:root {
  /* Cores */
  --color-primary: #FF6B00;
  --color-primary-light: #FF8A3D;
  --color-primary-dark: #E55D00;
  --color-secondary: #333333;
  --color-secondary-light: #4D4D4D;
  --color-secondary-dark: #1A1A1A;
  --color-success: #28A745;
  --color-warning: #FFC107;
  --color-error: #DC3545;
  --color-info: #17A2B8;
  
  --color-white: #FFFFFF;
  --color-light-gray: #F5F5F5;
  --color-gray: #CCCCCC;
  --color-dark-gray: #666666;
  --color-black: #000000;
  
  --bg-light: #F8F9FA;
  --bg-dark: #212529;
  
  --text-light: #F8F9FA;
  --text-dark: #212529;
  --text-gray: #6C757D;
  
  /* Espaçamentos */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-xxl: 48px;
  
  /* Bordas */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  --border-radius-full: 9999px;
  
  /* Sombras */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* Transições */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  max-width: 100vw;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: var(--text-dark);
  background-color: var(--bg-light);
}

#app {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  max-width: 100vw;
}

button {
  -webkit-tap-highlight-color: transparent;
}

button:focus {
  outline: none !important;
}

/* Utilitários */
.card {
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  border: none;
  outline: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
}

.btn-secondary {
  background-color: var(--color-secondary);
  color: var(--color-white);
}

.btn-secondary:hover {
  background-color: var(--color-secondary-dark);
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
}

.btn-outline:hover {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.input {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-gray);
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  outline: none;
  transition: border-color var(--transition-fast);
}

.input:focus {
  border-color: var(--color-primary);
}

/* Espaçamentos */
.p-sm { padding: var(--space-sm); }
.p-md { padding: var(--space-md); }
.p-lg { padding: var(--space-lg); }

.m-sm { margin: var(--space-sm); }
.m-md { margin: var(--space-md); }
.m-lg { margin: var(--space-lg); }

.mb-xs { margin-bottom: var(--space-xs); }
.mb-sm { margin-bottom: var(--space-sm); }
.mb-md { margin-bottom: var(--space-md); }
.mb-lg { margin-bottom: var(--space-lg); }

/* Tipografia */
.text-sm { font-size: 0.875rem; }
.text-md { font-size: 1rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-3xl { font-size: 1.875rem; }
</style>
