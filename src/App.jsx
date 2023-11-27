import React, { useState } from 'react';
import './App.css'
import Card from './Card';

const TodoList = () => {
  const [tasks, setTasks] = useState({
    completed: [],
    incompleted: [],
  });
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [click,setClick]=useState(true)

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks({
        ...tasks,
        incompleted: [...tasks.incompleted, { text: newTask, id: Date.now() }],
      });
      setNewTask('');
    }
  };

  const completeTask = (task) => {
    const updatedIncompletedTasks = tasks.incompleted.filter((e) => e.id !== task.id);
    setTasks({
      incompleted: updatedIncompletedTasks,
      completed: [...tasks.completed, task],
    });
  };

  const deleteTask = (task) => {
    const updatedIncompletedTasks = tasks.incompleted.filter((t) => t.id !== task.id);
    const updatedCompletedTasks = tasks.completed.filter((t) => t.id !== task.id);

    setTasks({
      incompleted: updatedIncompletedTasks,
      completed: updatedCompletedTasks,
    });
  };

  const editTask = (task) => {
    setEditingTask(task.id);
    setNewTask(task.text);
  };

  const updateTask = () => {
    if (newTask.trim() !== '') {
      const updatedIncompletedTasks = tasks.incompleted.map((task) =>
        task.id === editingTask ? { ...task, text: newTask } : task
      );

      const updatedCompletedTasks = tasks.completed.map((task) =>
        task.id === editingTask ? { ...task, text: newTask } : task
      );

      setTasks({
        incompleted: updatedIncompletedTasks,
        completed: updatedCompletedTasks,
      });

      setEditingTask(null);
      setNewTask('');
    }
  };

  const displayTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.completed;
      case 'incompleted':
        return tasks.incompleted;
      default:
        return [...tasks.incompleted, ...tasks.completed];
    }
  };

  return (
    <div className='container'>
      <h1>TODO-LIST</h1>
      <div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter your Task" aria-label="Recipient's username" aria-describedby="button-addon2" />
          <button class="btn btn-outline-secondary" onClick={editingTask ? updateTask : addTask} type="button" id="button-addon2">{editingTask ? 'Update Task' : 'Add Task'}</button>
        </div>
      </div>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" className= {click? "completed" : "completed1"} onClick={() => setClick(true) || setFilter('completed')}>Completed</button>
          <button type="button" className={click? "incompleted" : "incompleted1"}onClick={() => setClick(false) || setFilter('incompleted')}>Incompleted</button>
        </div>
      <div>
        <h2>TASKS</h2>
        <ul>
          {displayTasks().map((task) => (
            <li key={task.id}>
              {task.text}
              <button className='tick' onClick={() => completeTask(task)}><i id='iconn' class="bi bi-check-lg"></i></button>
              <button className='edit' onClick={() => editTask(task)}><i class="bi bi-pencil"></i></button>
              <button className='dlt' onClick={() => deleteTask(task)}><i class="bi bi-trash3"></i></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
