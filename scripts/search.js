import { searchDocumentation, getSearchSuggestions } from './search-index.js';

export class SearchComponent {
  constructor() {
    this.searchInput = document.getElementById('search-input');
    this.searchContainer = this.searchInput.closest('.search-container');
    this.suggestionsContainer = document.getElementById('search-suggestions');
    this.currentFocus = -1;
    this.setupEventListeners();
  }

  setupEventListeners() {
    let debounceTimeout;
    
    // Manejar la entrada de búsqueda con debounce
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        this.handleSearch(e.target.value);
      }, 200);
    });

    // Manejar la navegación con teclado
    this.searchInput.addEventListener('keydown', (e) => {
      const suggestions = this.suggestionsContainer.getElementsByClassName('search-suggestion');
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.currentFocus = Math.min(this.currentFocus + 1, suggestions.length - 1);
        this.addActive(suggestions);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.currentFocus = Math.max(this.currentFocus - 1, -1);
        this.addActive(suggestions);
      } else if (e.key === 'Enter' && this.currentFocus > -1) {
        e.preventDefault();
        if (suggestions[this.currentFocus]) {
          suggestions[this.currentFocus].querySelector('a').click();
        }
      } else if (e.key === 'Escape') {
        this.closeSuggestions();
      }
    });

    // Cerrar sugerencias al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!this.searchContainer.contains(e.target)) {
        this.closeSuggestions();
      }
    });

    // Manejar el foco del input
    this.searchInput.addEventListener('focus', () => {
      this.searchContainer.classList.add('is-active');
      if (this.searchInput.value.length >= 2) {
        this.handleSearch(this.searchInput.value);
      }
    });
  }

  handleSearch(query) {
    if (!query || query.length < 2) {
      this.closeSuggestions();
      return;
    }

    const suggestions = getSearchSuggestions(query);
    this.displaySuggestions(suggestions, query);
  }

  displaySuggestions(suggestions, query) {
    if (suggestions.length === 0) {
      this.closeSuggestions();
      return;
    }

    this.suggestionsContainer.innerHTML = '';
    suggestions.forEach((suggestion, index) => {
      const div = document.createElement('div');
      div.className = 'search-suggestion';
      
      const highlightedTitle = this.highlightMatch(suggestion.title, query);
      const highlightedDescription = suggestion.description ? 
        this.highlightMatch(suggestion.description, query) : '';

      // Extraer el nombre de la página de la URL
      const pageName = suggestion.url.split('/').pop().replace('.html', '');
      
      div.innerHTML = `
        <div class="suggestion-link">
          <i class="fas fa-search suggestion-icon"></i>
          <div class="suggestion-content">
            <div class="suggestion-title">${highlightedTitle}</div>
            ${highlightedDescription ? 
              `<div class="suggestion-description">${highlightedDescription}</div>` : 
              ''}
          </div>
        </div>
      `;

      div.addEventListener('click', (e) => {
        e.preventDefault();
        window.routeTo(pageName);
        this.searchInput.value = '';
        this.closeSuggestions();
      });

      div.addEventListener('mouseenter', () => {
        this.currentFocus = index;
        this.addActive(this.suggestionsContainer.getElementsByClassName('search-suggestion'));
      });

      this.suggestionsContainer.appendChild(div);
    });

    this.suggestionsContainer.style.display = 'block';
  }

  highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="suggestion-highlight">$1</span>');
  }

  addActive(suggestions) {
    if (!suggestions) return;

    this.removeActive(suggestions);
    if (this.currentFocus >= 0) {
      suggestions[this.currentFocus].classList.add('active');
      // Hacer scroll si es necesario
      const activeElement = suggestions[this.currentFocus];
      const container = this.suggestionsContainer;
      
      if (activeElement.offsetTop < container.scrollTop) {
        container.scrollTop = activeElement.offsetTop;
      } else {
        const offsetBottom = activeElement.offsetTop + activeElement.offsetHeight;
        const scrollBottom = container.scrollTop + container.offsetHeight;
        if (offsetBottom > scrollBottom) {
          container.scrollTop = offsetBottom - container.offsetHeight;
        }
      }
    }
  }

  removeActive(suggestions) {
    Array.from(suggestions).forEach(suggestion => {
      suggestion.classList.remove('active');
    });
  }

  closeSuggestions() {
    this.suggestionsContainer.style.display = 'none';
    this.searchContainer.classList.remove('is-active');
    this.currentFocus = -1;
  }
}

// Inicializar el componente de búsqueda cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new SearchComponent();
}); 