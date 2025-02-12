<script setup>
import { tareasAlmacenadas } from '../stores/tasks';
import Cartaparatarea from '../components/Cartaparatarea.vue';
import { ref, watch } from 'vue';

//creamos la constante que va a almacenar todo lo que se encuentre en la funcion creada
const tareaAlmacenada = tareasAlmacenadas()

//creamos las variables que se van a utilizar para almacenar los datos de las tareas
//los nombres son los mismos que declaramos en los stores
const tipoTarea = ref('')
const nombreTarea = ref('')
const descripcionTarea = ref('')
const fechaTarea = ref('')
const estadoTarea = ref(false)
const fechadeCreacion = ref('')

//ahora creamos la lógica para agregar la tarea al store
const agregarTarea = () => {
    if (!tipoTarea.value || !nombreTarea.value || !descripcionTarea.value || !fechaTarea.value) {
        alert('Por favor, complete todos los campos antes de agregar la tarea.');
        return;
    }

    tareaAlmacenada.agregarTarea({
        tipoTarea: tipoTarea.value,
        nombreTarea: nombreTarea.value,
        descripcionTarea: descripcionTarea.value,
        fechaTarea: new Date(fechaTarea.value),
        estadoTarea: estadoTarea.value,
        fechadeCreacion: new Date()
    })
    tipoTarea.value = ''
    nombreTarea.value = ''
    descripcionTarea.value = ''
    fechaTarea.value = ''
    estadoTarea.value = false
    //Al momento de obtener la fecha, ya deja de ser necesario pasarle un valor hardcodeado
    //fechadeCreacion.value = ''
}

//Creamos la función para ordenar las tareas de la primera a la última creada

const ordenarPorFecha = () => {
    //Nuevamente empleamos el sort para hacer que se reccoran las tareas en a y b, en dónde
    //se comparan las fechas de creación de las tareas, y se hace una resta para que se ordene de la más reciente a la más antigua
    tareaAlmacenada.tasks.sort((a, b) => {
        return new Date(b.fechadeCreacion) - new Date(a.fechadeCreacion)
    })
}

//Aplicamos watch para que se ejecute la función de ordenar por fecha de manera inmediata
watch(tareaAlmacenada.tasks, ordenarPorFecha, { immediate: true })
</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <h1 class="text-center font-bold text-6xl py-2 text-teal-700">LISTA TO-DO</h1>

        <div class="rounded-lg flex justify-center mx-6 py-6 bg-teal-200 w-full max-w-lg mx-auto shadow-lg">
            <div
                class="py-6 self-center flex flex-col items-center rounded-lg bg-teal-100 mx-6 w-full max-w-lg space-y-4 shadow-md">
                <div class="w-full px-2 flex flex-col">
                    <label for="titulo" class="text-center font-bold text-2xl pb-4 text-teal-700">Agregar tarea</label>
                    <label for="tipoTarea" class="mx-2 py-2 text-teal-700">Tipo de tarea:</label>
                    <select id="tipoTarea" v-model="tipoTarea"
                        class="w-full rounded-lg border border-teal-500 bg-white px-2 py-1" required>
                        <option value="Trabajo">Trabajo</option>
                        <option value="Personal">Personal</option>
                        <option value="Urgente">Urgente</option>
                    </select>
                </div>

                <div class="w-full px-2 flex flex-col">
                    <label for="nombreTarea" class="mx-2 py-2 text-teal-700">Nombre de tarea:</label>
                    <input id="nombreTarea" v-model="nombreTarea" type="text"
                        class="w-full rounded-lg border border-teal-500 bg-white px-2 py-1"
                        placeholder="El nombre de la tarea" required>
                </div>

                <div class="w-full px-2 flex flex-col">
                    <label for="descripcionTarea" class="mx-2 py-2 text-teal-700">Descripción de tarea:</label>
                    <input id="descripcionTarea" v-model="descripcionTarea" type="text"
                        class="w-full rounded-lg border border-teal-500 bg-white px-2 py-1"
                        placeholder="Breve descripción de la tarea" required>
                </div>

                <div class="w-full px-2 flex flex-col">
                    <label for="fechaTarea" class="mx-2 py-2 text-teal-700">Fecha de la tarea:</label>
                    <input id="fechaTarea" v-model="fechaTarea" type="date"
                        class="w-full rounded-lg border border-teal-500 bg-white px-2 py-1">
                </div>

                <div class="w-full px-2 flex justify-center">
                    <button @click="agregarTarea"
                        class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg shadow-md">Agregar
                        tarea</button>
                </div>
            </div>
        </div>

        <p class="text-center font-bold text-2xl pt-8 text-teal-700">Tareas Pendientes</p>

        <div class="flex justify-center py-8">
            <Cartaparatarea :tasks="tareaAlmacenada.tasks" />
        </div>
    </div>
</template>