const API_URL = "http://localhost:5000/users";

const form = document.getElementById("userForm");
const userList = document.getElementById("userList");
const statusText = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");

let editingId = null;

// UI helpers
function showStatus(message, type = "success") {
  statusText.textContent = message;
  statusText.className = type === "error"
    ? "mb-4 text-sm text-red-600"
    : "mb-4 text-sm text-green-600";
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.textContent = isLoading ? "Procesando..." : "Guardar";
}

// READ
async function getUsers() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener usuarios");

    const users = await res.json();
    userList.innerHTML = "";

    users.forEach(user => {
      userList.innerHTML += `
        <li class="flex justify-between items-center border p-2 rounded">
          <div>
            <p class="font-medium">${user.name}</p>
            <p class="text-sm text-gray-500">${user.email}</p>
          </div>
          <div class="space-x-2">
            <button
              onclick="editUser(${user.id}, '${user.name}', '${user.email}')"
              class="text-blue-600"
            >
              Editar
            </button>
            <button
              onclick="deleteUser(${user.id})"
              class="text-red-600"
            >
              Eliminar
            </button>
          </div>
        </li>
      `;
    });
  } catch (error) {
    showStatus(error.message, "error");
  }
}

// CREATE & UPDATE
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email) {
    showStatus("Todos los campos son obligatorios", "error");
    return;
  }

  setLoading(true);

  try {
    const options = {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    };

    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    const res = await fetch(url, options);

    if (!res.ok) throw new Error("No se pudo guardar el usuario");

    showStatus(editingId ? "Usuario actualizado" : "Usuario creado");
    form.reset();
    editingId = null;
    getUsers();

  } catch (error) {
    showStatus(error.message, "error");
  } finally {
    setLoading(false);
  }
});

// EDIT
function editUser(id, name, email) {
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  editingId = id;
}

// DELETE
async function deleteUser(id) {
  if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) throw new Error("Error al eliminar");

    showStatus("Usuario eliminado");
    getUsers();

  } catch (error) {
    showStatus(error.message, "error");
  }
}

// Inicializar
getUsers();
