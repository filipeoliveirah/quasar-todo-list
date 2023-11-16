import { defineStore } from 'pinia'

interface TaskList {
  title: string,
  done: boolean,
}

export const useTodoStore = defineStore('todos', {
  state: () => ({
    tasks: [] as unknown as TaskList[]
  }),

  getters: {
    getTasks: (state) => state.tasks,
  },

  actions: {
    createTask(payload:TaskList) {
      this.tasks.push(payload)
    },

    updateTask(id:number, title:string) {
      console.info('updateTask', this.tasks[id], title);
      this.tasks[id].title = title
    },

    deleteTask(id:number) {
      this.tasks.splice(id, 1)
    },
  },
})
