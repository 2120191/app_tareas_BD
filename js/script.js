//base de datos similuda
//esta variable simula una trespuesta de tipo json desde el servidor
let tasks=[]

//funcion para renderizar(accionde crear elementos en min navegador) tareas existentes en mi respuesta aqui
const renderTasks=()=>{
    const containerTasks=document.querySelector("#tasks")
    containerTasks.innerHTML=""
    tasks.forEach((el)=>{
        const div=document.createElement("div")
        div.className="task" + (el.done?"done":"")
        div.innerHTML=`
         <span>${el.text}</span>
         <div>
         <button onclik="toggleDone(${el.id})">✔️</button>
         <button onclik="editTask(${el.id})">✏️</button>
         <button onclik="deleteTask(${el.id})">🚫</button>
         </div> 
        `
        containerTasks.appendChild(div)
    })

}
//creando funcion para agregar una tarea
const addTask=()=>{
    const input=document.querySelector("#taskInput")
    //validacion para evitar espacios
    const cleanText=input.value.trim()
    //validacion para evitar tatreas vacias
    if (cleanText=="") return alert("escribe una tarea delincuente")
    //crear nuesytro objeto
const newTask={
    id: Date.now(),//simuldor id de base de datos
    text:cleanText,
    done:false
 }

//agregar ami base de datos(variable de tipo lista )
tasks = [...tasks,newTask]
input.value=""
renderTasks()
}

// marac tareas como completado
const toggleDone=(id)=>{
    tasks=tasks.map(el=>
    el.id === id?{...el,done:!el.done}:el
    )
    renderTasks()
}