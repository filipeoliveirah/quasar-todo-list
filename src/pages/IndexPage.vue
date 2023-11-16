<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input @keyup.enter="addTask" filled v-model="newTask" placeholder="Adicione uma tarefa" dense bg-color="white"
        class="col" square>
        <template v-slot:append>
          <q-btn round dense flat icon="add" @click="addTask" />
        </template>
      </q-input>
    </div>
    <q-list separator bordered class="bg-white">

      <q-item v-for=" (task, index) in tasks" :key="task.title" @click="task.done = !task.done"
        :class="{ 'done bg-blue-1': task.done }" clickable v-ripple>
        <q-item-section avatar>
          <q-checkbox v-model="task.done" class="no-pointer-events" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>

        <q-item-section v-if="task.done" side>
          <q-btn @click.stop="deleteTask(index)" flat round color="primary" icon="delete" />
        </q-item-section>

      </q-item>

    </q-list>
    <div v-if="!tasks.length" class="no-tasks absolute-center">
      <q-icon name="task" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">
        Adicione umas tarefa
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface TasksInterface {
  title: string
  done?: boolean
  message?: string
  persistent?: boolean
}
const newTask = ref('')

const tasks = ref([] as unknown as TasksInterface[])
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}

.no-tasks {
  opacity: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
