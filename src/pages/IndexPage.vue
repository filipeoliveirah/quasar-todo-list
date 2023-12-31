<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input @keyup.enter="addTask()" filled v-model="newTask" placeholder="Adicione uma tarefa" dense bg-color="white"
        class="col" square>
        <template v-slot:append>
          <q-btn v-if="updateTitle && newTask" round dense flat icon="edit" @click="updateTasks(selectedId)" />
          <q-btn v-if="!updateTitle && newTask" round dense flat icon="add" @click="addTask()" />
        </template>
      </q-input>
    </div>

    <q-list separator bordered class="bg-white">
      <q-item v-for=" (task, index) in taskList" :key="task.title" @click="task.done = !task.done"
        :class="{ 'done bg-blue-1': task.done }" clickable v-ripple>
        <q-item-section avatar>
          <q-checkbox v-model="task.done" class="no-pointer-events" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>

        <q-item-section v-if="!task.done" side>
          <div class="q-flex">
            <q-btn v-if="!updateTitle" @click.stop="updateTitleTask(index)" flat round color="primary" icon="edit" />
            <q-btn @click.stop="deleteTask(index)" flat round color="primary" icon="delete" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>

    <div v-if="!taskList.length" class="no-tasks absolute-center">
      <q-icon name="task" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">
        Sem tarefas
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTodoStore } from 'stores/todos';

const toDoStore = useTodoStore()

const newTask = ref('')

const selectedId = ref(0)

const updateTitle = ref(false)

const taskList = computed(() => toDoStore.getTasks)

function addTask() {
  toDoStore.createTask({
    title: newTask.value,
    done: false
  })
  newTask.value = ''
}

function updateTitleTask(id: number) {
  updateTitle.value = true
  newTask.value = toDoStore.tasks[id].title
  selectedId.value = id
}

function updateTasks(id: number) {
  updateTitle.value = false
  toDoStore.updateTask(id, newTask.value)
  newTask.value = ''
}

function deleteTask(id: number) {
  toDoStore.deleteTask(id)
  newTask.value = ''
}
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
