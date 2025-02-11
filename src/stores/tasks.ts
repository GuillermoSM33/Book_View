import { ref } from "vue"
import { defineStore } from "pinia"

//Empleamos la constante storeOfTask para definir en el local storage los items de las tareas
//Los items hacen referencia a los campos de las tareas
//Al marcar una tarea como completada, se actualiza el estado de la tarea en el local storage
//Le decimos que las tareas pueden contener datos o pueden venir como arreglos vacíos

export const tareasAlmacenadas = defineStore('tasks', () => {
    const tasks = ref(JSON.parse(localStorage.getItem('tasks') || '[]'))

    //Definimos la función addTask para agregar una tarea
    //Mediante la funcion nos aseguramos que las tareas contengan la data que está dentro del arreglo task
    //Después obtenemos el valor dentro de la tarea y lo agregamos al local storage

    const agregarTarea = (task: {tipoTarea: string, nombreTarea:string, descripcionTarea: string, fechaTarea: Date, estadoTarea: boolean}) => {
        tasks.value.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }

    //Aplicamos el principio de inmutabilidad para actualizar el estado de la tarea
    //Cada objeto debe tener un index especifico y mediante este hacemos la eliminacion de la tarea
    const removerTarea = (index: number) => {
        tasks.value.splice(index, 1)
        localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }

    const editarTarea = (index: number, task: {tipoTarea: string, nombreTarea:string, descripcionTarea: string, fechaTarea: Date, estadoTarea: boolean}) => {
        tasks.value[index] = task
        localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }

    //Definimos la función toggleTask para marcar una tarea como completada
    //Mediante el index de la tarea, actualizamos el estado de la tarea en el local storage
    const marcarTarea = (index: number) => {
        tasks.value[index].completed = !tasks.value[index].completed
        localStorage.setItem('tasks', JSON.stringify(tasks.value))
    }

    //Ahora vamos a retornar los valores que hemos definido
    return {
        tasks,
        agregarTarea,
        editarTarea,
        removerTarea,
        marcarTarea
    }

})
