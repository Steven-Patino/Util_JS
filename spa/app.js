const app = document.getElementById("app");

const routes = {
  home: `
    <h1 class="text-2xl font-bold mb-4">🏠 Inicio</h1>
    <p class="text-gray-600">
      Bienvenido a esta SPA hecha con JavaScript y Tailwind.
    </p>
  `,
  about: `
    <h1 class="text-2xl font-bold mb-4">ℹ️ Acerca de</h1>
    <p class="text-gray-600">
      Una Single Page Application sin frameworks.
    </p>
  `,
  contact: `
    <h1 class="text-2xl font-bold mb-4">📩 Contacto</h1>
    <p class="text-gray-600">
      correo@ejemplo.com
    </p>
  `
};

function navigate(route) {
  app.innerHTML = routes[route];
}

// Vista inicial
navigate("home");
