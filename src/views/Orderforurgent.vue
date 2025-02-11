<script setup lang="ts">
import Cartaparatarea from '@/components/Cartaparatarea.vue';
import { tareasAlmacenadas } from '@/stores/tasks';
import { contadorDeTareas } from '@/stores/counter';
import { computed, ref } from 'vue';

// Interfaz de la tarea
interface Task {
    tipoTarea: 'Urgente' | 'Trabajo' | 'Personal';
    nombreTarea: string;
    descripcionTarea: string;
    completa: boolean;
    fechaTarea: string;
}

const tareaAlmacenada = tareasAlmacenadas();
const contador = contadorDeTareas();

// Ref para almacenar el orden actual el cuál por defecto es "Urgente"
const currentOrder = ref<'Urgente' | 'Trabajo' | 'Personal'>('Urgente');

// Computamos las tareas ordenadas según el orden actual
const sortedTasks = computed(() => {
    const order = { 'Urgente': 1, 'Trabajo': 2, 'Personal': 3 };
    return tareaAlmacenada.tasks.slice().sort((a: Task, b: Task) => {
        // Si el tipo de tarea coincide con el orden actual, lo priorizamos
        if (a.tipoTarea === currentOrder.value) return -1;
        if (b.tipoTarea === currentOrder.value) return 1;
        // Si no, ordenamos según el orden predefinido
        return order[a.tipoTarea] - order[b.tipoTarea];
    });
});

// Cambiamos el orden actual
const changeOrder = (order: 'Urgente' | 'Trabajo' | 'Personal') => {
    currentOrder.value = order;
};
</script>

<template>
    <!-- Botones para cambiar el orden de las tareas -->
    <div class="flex justify-center gap-4 py-4">
        <button @click="changeOrder('Urgente')"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
            Ordenar por "Urgente"
        </button>
        <button @click="changeOrder('Trabajo')"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
            Ordenar por "Trabajo"
        </button>
        <button @click="changeOrder('Personal')"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
            Ordenar por "Personal"
        </button>
    </div>

    <div class="flex flex-wrap justify-center gap-8 py-8">
        <div class="text-center my-4 bg-gray-100 rounded-lg w-full max-w-lg mx-auto p-6 shadow-lg">
            <p class="font-bold text-2xl pb-2 text-gray-800">Reporte general</p>
            <p class="text-lg text-gray-600">Tareas completadas: <span class="font-semibold text-green-600">{{
                contador.tareasCompletas }}</span></p>
            <p class="text-lg text-gray-600">Tareas pendientes: <span class="font-semibold text-red-600">{{
                contador.tareasIncompletas }}</span></p>
        </div>

        <div class="text-center my-4 bg-gray-100 rounded-lg w-full max-w-lg mx-auto p-6 shadow-lg">
            <p class="font-bold text-2xl pb-2 text-gray-800">Pendientes por</p>
            <p class="text-lg text-gray-600">Urgente: <span class="font-semibold text-red-600">{{
                contador.tareaUrgenteIncompleta }}</span></p>
            <p class="text-lg text-gray-600">Trabajo: <span class="font-semibold text-blue-600">{{
                contador.tareaTrabajoIncompleta }}</span></p>
            <p class="text-lg text-gray-600">Personal: <span class="font-semibold text-green-600">{{
                contador.tareaPersonalIncompleta }}</span></p>
        </div>

        <div class="text-center my-4 bg-gray-100 rounded-lg w-full max-w-lg mx-auto p-6 shadow-lg">
            <p class="font-bold text-2xl pb-2 text-gray-800">Completadas por</p>
            <p class="text-lg text-gray-600">Urgente: <span class="font-semibold text-red-600">{{
                contador.tareaUrgenteCompleta }}</span></p>
            <p class="text-lg text-gray-600">Trabajo: <span class="font-semibold text-blue-600">{{
                contador.tareaTrabajoCompleta }}</span></p>
            <p class="text-lg text-gray-600">Personal: <span class="font-semibold text-green-600">{{
                contador.tareaPersonalCompleta }}</span></p>
        </div>
    </div>

    <Cartaparatarea :tasks="sortedTasks" />
</template>