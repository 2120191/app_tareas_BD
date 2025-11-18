// base de datos simulada
// esta variable simula una respuesta de tipo json desde el servidor
let tasks = [];

// funcion para renderizar(accion de crear elementos en mi navegador) tareas existentes en mi respuesta aqui
const renderTasks = () => {
  const containerTasks = document.querySelector("#tasks");
  containerTasks.innerHTML = "";
  tasks.forEach((el) => {
    const div = document.createElement("div");
    div.className = "task" + (el.done ? " task-done" : "");
    div.innerHTML = `
         <span>${el.text}</span>
         <div>
         <button onclick="toggleDone(${el.id})">✔️</button>
         <button onclick="editTask(${el.id})">✏️</button>
         <button onclick="deleteTask(${el.id})">🚫</button>
         </div> 
        `;
    containerTasks.appendChild(div);
  });
};
// creando funcion para agregar una tarea
const addTask = () => {
  const input = document.querySelector("#taskInput");
  // validacion para evitar espacios
  const cleanText = input.value.trim();
  // validacion para evitar tareas vacias
  if (cleanText == "") return alert("escribe una tarea delincuente");
  // crear nuestro objeto
  const newTask = {
    id: Date.now(), // simulador id de base de datos
    text: cleanText,
    done: false,
  };

  // agregar ami base de datos(variable de tipo lista )
  tasks = [...tasks, newTask];
  input.value = "";
  renderTasks();
};

// marcar tareas como completado
const toggleDone = (id) => {
  tasks = tasks.map((el) =>
    el.id === id ? { ...el, done: !el.done } : el
  );
  renderTasks();
};

// editar una tarea
const editTask = (id) => {
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Tarea no encontrada!',
    })
    alert("Tarea no encontrada");
    return;
  }
  const newText = prompt("editar tarea", task.text);

  // validacion
  if (newText === null || newText.trim() === "") return;

  // reconocer las tareas una vez encontrado la tarea cion el id indicado cetear
  tasks = tasks.map((el) =>
    el.id === id ? { ...el, text: newText } : el
  );
  renderTasks();
  Swal.fire({
    icon: 'success',
    title: 'Tarea editada!',
    showConfirmButton: false,
    timer: 1500
  })
};

// eliminar tarea
const deleteTask = (id) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      tasks = tasks.filter((t) => t.id !== id);
      renderTasks();
      Swal.fire(
        'Eliminado!',
        'La tarea ha sido eliminada.',
        'success'
      )
    }
  })
};