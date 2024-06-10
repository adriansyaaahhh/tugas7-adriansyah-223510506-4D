import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    addTask(task) {
      this.tasks.push({ id: Date.now(), text: task, completed: false });
    },
    removeTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
    toggleTaskCompletion(taskId) {
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  getters: {
    incompleteTasksCount: (state) => state.tasks.filter(task => !task.completed).length,
    completeTasksCount: (state) => state.tasks.filter(task => task.completed).length,
  },
});
