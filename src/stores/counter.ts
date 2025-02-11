import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { tareasAlmacenadas } from './tasks'

interface Task {
  tipoTarea: 'Urgente' | 'Trabajo' | 'Personal';
  nombreTarea: string;
  descripcionTarea: string;
  completa: boolean;
  fechaTarea: string;
}

const tareas = tareasAlmacenadas()

export const contadorDeTareas = defineStore('counter', () => {
  const count = ref(0)

  // Recorremos las tareas y contamos las completas e incompletas
  const tareasCompletas = computed(() => tareas.tasks.filter((tarea: Task) => tarea.completa).length)
  const tareasIncompletas = computed(() => tareas.tasks.filter((tarea: Task) => !tarea.completa).length)

  const tareaUrgenteCompleta = computed(() => tareas.tasks.filter((tarea: Task) => tarea.tipoTarea === 'Urgente' && tarea.completa).length)
  const tareaUrgenteIncompleta = computed(() => tareas.tasks.filter((tarea: Task) => tarea.tipoTarea === 'Urgente' && !tarea.completa).length)

  const tareaTrabajoCompleta = computed(() => tareas.tasks.filter((tarea: Task) => tarea.tipoTarea === 'Trabajo' && tarea.completa).length)
  const tareaTrabajoIncompleta = computed(() => tareas.tasks.filter((tarea: Task) => tarea.tipoTarea === 'Trabajo' && !tarea.completa).length)

  const tareaPersonalCompleta = computed(() => tareas.tasks.filter((tarea: Task) => tarea.tipoTarea === 'Personal' && tarea.completa).length)
  const tareaPersonalIncompleta = computed(() => tareas.tasks.filter((tarea: Task) => tarea.tipoTarea === 'Personal' && !tarea.completa).length)

  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  // Actualizamos el contador cuando cambian las tareas
  watch(tareas.tasks, () => {
    count.value = tareas.tasks
      .filter((tarea: Task) => tarea.completa)
      .length
  }, { immediate: true })

  return { 
    count, 
    doubleCount, 
    increment, 
    tareasCompletas, 
    tareasIncompletas, 
    tareaUrgenteCompleta, 
    tareaUrgenteIncompleta, 
    tareaTrabajoCompleta, 
    tareaTrabajoIncompleta, 
    tareaPersonalCompleta, 
    tareaPersonalIncompleta 
  }
})
