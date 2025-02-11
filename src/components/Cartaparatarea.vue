<script setup>
import { defineProps } from 'vue'
import { tareasAlmacenadas } from '../stores/tasks'

// Empleamos props para poder pasar los datos de las tareas a la vista
defineProps({
    tasks: Array
})

const tareaAlmacenada = tareasAlmacenadas()

const imagenPorTipo = (tipoTarea) => {
    if (tipoTarea === 'Trabajo') {
        return 'https://cdn-icons-png.flaticon.com/512/2583/2583214.png'
    } else if (tipoTarea === 'Personal') {
        return 'https://cdn-icons-png.flaticon.com/512/5201/5201730.png'
    }
    return 'https://cdn-icons-png.flaticon.com/512/9733/9733456.png'
}

const formatDate = (dateString) => {
    // Formateamos la fecha para que se vea más amigable
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date(dateString)
    // Corregimos la fecha para que se muestre correctamente en nuestra zona horaria
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
    return date.toLocaleDateString(undefined, options)
}
</script>

<template>
    <!-- Creamos el slot que vamos a usar para pasar las cartas como componentes -->
    <slot>
        <div class="flex flex-wrap justify-center gap-4 pt-8">
            <div v-for="(task, index) in tasks" :key="index"
                class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-white dark:border-gray-700">
                <div class="px-5 pb-5 grid grid-cols-1 justify-center text-center gap-y-2">
                    <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-black">{{ task.nombreTarea
                        }}</h5>
                    <p class="text-gray-700 dark:text-gray-400">{{ task.descripcionTarea }}</p>
                    <p class="text-gray-700 dark:text-gray-400">{{ formatDate(task.fechaTarea) }}</p>

                    <!-- Hacemos un checkbox para marcarla como completa -->
                    <div class="flex items-center justify-center gap-2">
                        <input type="checkbox" v-model="task.completa" id="completa-{{ index }}"
                            class="w-5 h-5 text-green-500">
                        <label :for="'completa-' + index" class="text-gray-700 dark:text-gray-400">Completar?</label>
                    </div>
                    <p v-if="task.completa" class="text-green-500">¡Tarea completada!</p>
                    <p v-else class="text-red-500">Tarea pendiente</p>

                    <div class="flex items-center justify-center gap-2">
                        <img :src="imagenPorTipo(task.tipoTarea)" class="w-10 pt-2 pb-2" alt="">
                        <p class="text-black font-bold">{{ task.tipoTarea }}</p>
                    </div>

                    <div class="flex w-full items-center justify-center mt-4 gap-x-4">
                        <button @click="tareaAlmacenada.removerTarea(index)"
                            class="flex-1 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Eliminar</button>

                        <RouterLink :to="`/task/${index}`"
                            class="flex-1 text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                            Editar
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </slot>
</template>