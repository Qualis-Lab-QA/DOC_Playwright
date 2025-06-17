// scripts/header.js
window.initHeader = function () {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
  
    // Si NO hay tema guardado, ponemos dark por defecto
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark');
    }
  
    // Seteamos el tema según localStorage
    if (localStorage.getItem('theme') === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
      if (toggle) toggle.checked = true;
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
      if (toggle) toggle.checked = false;
    }
  
    // Al cambiar el switch
    toggle?.addEventListener('change', () => {
      if (toggle.checked) {
        html.classList.add('dark');
        html.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('theme', 'light');
      }
    });
  };
  