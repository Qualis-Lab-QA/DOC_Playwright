// Obtener el base path para GitHub Pages
const getBasePath = () => {
  // Si estamos en GitHub Pages, el path base será el nombre del repositorio
  const isGitHubPages = window.location.hostname.includes('github.io');
  if (isGitHubPages) {
    const pathSegments = window.location.pathname.split('/');
    // El segundo segmento será el nombre del repositorio
    return pathSegments.length > 1 ? `/${pathSegments[1]}` : '';
  }
  return '';
};

const searchIndex = [
  {
    title: "Inicio",
    description: "Página principal de la documentación del framework de automatización",
    url: "/components/pages/home.html",
    keywords: ["inicio", "home", "principal", "documentación", "framework"]
  },
  {
    title: "Instalación",
    description: "Guía paso a paso para la instalación y configuración del framework",
    url: "/components/pages/instalacion.html",
    keywords: ["instalación", "setup", "configuración", "requisitos", "dependencias"]
  },
  {
    title: "Estructura del Proyecto",
    description: "Organización y estructura de carpetas del framework",
    url: "/components/pages/estructura.html",
    keywords: ["estructura", "organización", "carpetas", "directorios", "archivos"]
  },
  {
    title: "Pages y Locators",
    description: "Implementación del patrón Page Object y gestión de localizadores",
    url: "/components/pages/pages-locators.html",
    keywords: ["pages", "locators", "page object", "selectores", "elementos"]
  },
  {
    title: "Cucumber y Gherkin",
    description: "Implementación de pruebas usando Cucumber y sintaxis Gherkin",
    url: "/components/pages/cucumber.html",
    keywords: ["cucumber", "gherkin", "bdd", "scenarios", "steps"]
  },
  {
    title: "Ejecución de Pruebas",
    description: "Guía para la ejecución de pruebas automatizadas",
    url: "/components/pages/ejecucion.html",
    keywords: ["ejecución", "pruebas", "test", "run", "automatización"]
  },
  {
    title: "Reportes",
    description: "Generación y visualización de reportes de pruebas",
    url: "/components/pages/reportes.html",
    keywords: ["reportes", "informes", "resultados", "evidencias", "logs"]
  },
  {
    title: "Buenas Prácticas",
    description: "Guía de buenas prácticas para la automatización de pruebas",
    url: "/components/pages/buenas-practicas.html",
    keywords: ["buenas prácticas", "guidelines", "estándares", "recomendaciones"]
  },
  {
    title: "Recursos Útiles",
    description: "Colección de recursos y herramientas útiles para la automatización",
    url: "/components/pages/recursos-utiles.html",
    keywords: ["recursos", "herramientas", "utilidades", "links", "referencias"]
  },
  {
    title: "Utilidades",
    description: "Funciones y utilidades comunes del framework",
    url: "/components/pages/utils.html",
    keywords: ["utilidades", "funciones", "helpers", "comunes", "utils"]
  },
  {
    title: "Plantilla",
    description: "Plantilla base para la creación de nuevos tests",
    url: "/components/pages/plantilla.html",
    keywords: ["plantilla", "template", "base", "ejemplo", "modelo"]
  }
];

// Función para realizar búsquedas en el índice
function searchDocumentation(query) {
  query = query.toLowerCase();
  return searchIndex.filter(page => {
    const titleMatch = page.title.toLowerCase().includes(query);
    const descriptionMatch = page.description.toLowerCase().includes(query);
    const keywordMatch = page.keywords.some(keyword => 
      keyword.toLowerCase().includes(query)
    );
    
    return titleMatch || descriptionMatch || keywordMatch;
  });
}

// Función para obtener sugerencias de búsqueda
function getSearchSuggestions(query) {
  if (!query || query.length < 2) return [];
  
  const results = searchDocumentation(query);
  const basePath = getBasePath();
  
  return results.map(result => ({
    title: result.title,
    description: result.description,
    url: `${basePath}${result.url}`
  }));
}

export {
  searchIndex,
  searchDocumentation,
  getSearchSuggestions
}; 