<template>
  <div id="app">
    <h1>Daftar Tugas</h1>
    <div class="input-container">
      <input v-model="newTask" placeholder="Tambah tugas baru" @keyup.enter="addTask" />
      <button @click="addTask">Tambah Tugas</button>
    </div>
    <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Status</th>
          <th>Tugas</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
          <td><input type="checkbox" :checked="task.completed" @change="toggleTaskCompletion(task.id)" /></td>
          <td>{{ task.text }}</td>
          <td><button @click="removeTask(task.id)">Hapus</button></td>
        </tr>
      </tbody>
    </table>
    </div>
    <div class="task-count">
      <p>Jumlah tugas yang belum selesai: {{ incompleteTasksCount }}</p>
      <p>Jumlah tugas yang selesai: {{ completeTasksCount }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useTodoStore } from './stores/Tugas';

export default {
  setup() {
    const newTask = ref('');
    const todoStore = useTodoStore();

    const addTask = () => {
      if (newTask.value.trim()) {
        todoStore.addTask(newTask.value);
        newTask.value = '';
      }
    };

    const removeTask = (taskId) => {
      todoStore.removeTask(taskId);
    };

    const toggleTaskCompletion = (taskId) => {
      todoStore.toggleTaskCompletion(taskId);
    };

    const tasks = computed(() => todoStore.tasks);
    const incompleteTasksCount = computed(() => todoStore.incompleteTasksCount);
    const completeTasksCount = computed(() => todoStore.completeTasksCount);

    return {
      newTask,
      addTask,
      removeTask,
      toggleTaskCompletion,
      tasks,
      incompleteTasksCount,
      completeTasksCount,
    };
  },
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

}

#app {
  background: linear-gradient(145deg, #f1f1f1,#8b8b8b );
  padding: 30px;
  border-radius: 15px;
  margin-left: 500px;
  margin-top: 200px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 600px;
  box-sizing: border-box;
  text-align: center;
}


h1 {
  color: #2c3e50;
  font-size: 2.5em;
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 12px;
  border: 2px solid #3498db;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input[type="text"]:focus {
  border-color: #2980b9;
  outline: none;
}

button {
  padding: 12px 20px;
  background-color: #D2691E;
  border: none;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: #d35400;
  transform: scale(1.05);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 15px;
  border: none;
  font-size: 16px;
}

th {
  background-color: #D2691E;
  color: #fff;
  font-weight: bold;
}

tr {
  background-color: #fff;
  transition: background-color 0.3s;
}

tr:nth-child(even) {
  background-color: #ecf0f1;
}

tr:hover {
  background-color: #e0f7fa;
}

.completed td {
  text-decoration: line-through;
  color: #888;
}

.task-count {
  justify-content: space-around;
  margin-top: 20px;
}

.task-count p {
  margin: 0;
  font-size: 1.2em;
  font-weight: bold;
  color: #2c3e50;
  text-align: left;
}

.table-container {
  max-height: 250px;
  overflow-y: auto;
  margin-bottom: 20px;
  border-radius: 10px;
 
}

</style>
