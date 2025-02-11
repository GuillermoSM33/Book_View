<script setup>
import { useRoute, useRouter } from 'vue-router';
import { tareasAlmacenadas } from '../stores/tasks';

const route = useRoute();
const router = useRouter();
const tareaAlmacenada = tareasAlmacenadas();

const taskId = parseInt(route.params.id);
const task = tareaAlmacenada.tasks[taskId];

//Nos aseguramos de que la fecha de la tarea sea un string
if (task) {
    task.fechaTarea = new Date(task.fechaTarea).toISOString().split('T')[0];
}

const guardarCambios = () => {
    tareaAlmacenada.editarTarea(taskId, task);
    console.log('Tarea editada:', task);
    router.push('/');
};
</script>

<template>
    <div class="flex flex-wrap justify-center gap-4 pt-8">
        <div v-if="task"
            class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-white dark:border-gray-700">
            <div class="px-5 pb-5 grid grid-cols-1 justify-center text-center gap-y-2">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">Editar Tarea</h5>

                <!-- Campo para el tipo de tarea -->
                <label for="tipoTarea" class="mx-2 py-2">Tipo de tarea:</label>
                <select id="tipoTarea" v-model="task.tipoTarea"
                    class="w-full rounded-lg border border-black bg-white px-2 py-1">
                    <option value="Trabajo">Trabajo</option>
                    <option value="Personal">Personal</option>
                    <option value="Urgente">Urgente</option>
                </select>

                <!-- Campo para el nombre de la tarea -->
                <label for="nombreTarea" class="mx-2 py-2">Nombre de tarea:</label>
                <input id="nombreTarea" v-model="task.nombreTarea" type="text"
                    class="w-full rounded-lg border border-black bg-white px-2 py-1" placeholder="Nombre de la tarea">

                <!-- Campo para la descripción de la tarea -->
                <label for="descripcionTarea" class="mx-2 py-2">Descripción de tarea:</label>
                <input id="descripcionTarea" v-model="task.descripcionTarea" type="text"
                    class="w-full rounded-lg border border-black bg-white px-2 py-1"
                    placeholder="Descripción de la tarea">

                <!-- Campo para la fecha de la tarea -->
                <label for="fechaTarea" class="mx-2 py-2">Fecha límite de la tarea:</label>
                <input id="fechaTarea" v-model="task.fechaTarea" type="date"
                    class="w-full rounded-lg border border-black bg-white px-2 py-1">

                <!-- Campo para el estado de la tarea -->
                <div class="flex items-center justify-center gap-2 pt-4">
                    <input type="checkbox" v-model="task.completa" id="completa" class="w-5 h-5 text-green-500">
                    <label for="completa">¿Está Completada?</label>
                </div>

                <!-- Botón para guardar cambios -->
                <div class="flex w-full items-center justify-center mt-4 gap-x-4">
                    <button @click="guardarCambios"
                        class="flex-1 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="text-red-500">Tarea no encontrada.</p>
        </div>
    </div>
</template>