"use strict";
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const listSelect = document.getElementById('list-select');
const listsContainer = document.getElementById('lists-container');
const searchInput = document.getElementById('search-input');
const deleteModal = document.getElementById('delete-modal');
const modalText = document.getElementById('modal-text');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        return;
    }
    const listValue = listSelect.value;
    const listElement = document.querySelector(`.task-list[data-list="${listValue}"] .task-items`);
    const li = document.createElement('li');
    li.textContent = taskText;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    li.appendChild(deleteBtn);
    listElement.appendChild(li);
    taskInput.value = "";
});

listsContainer.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('delete-btn')) {
        openDeleteModal(target.parentElement);
        return;
    }
    if (target.tagName === 'LI') {
        target.classList.toggle('done');
        if (target.classList.contains('done')) {
            const dateSpan = document.createElement('span');
            dateSpan.classList.add('completion-date');
            dateSpan.textContent = ` (${new Date().toLocaleString()})`;
            target.appendChild(dateSpan);
        } else {
            const dateSpan = target.querySelector('.completion-date');
            if (dateSpan) {
                target.removeChild(dateSpan);
            }
        }
    }
});

let lastDeletedTask = null;
let lastDeletedTaskContainer = null;

function openDeleteModal(taskElement) {
    modalText.textContent = `Are you sure you want to delete the task: "${taskElement.firstChild.textContent}"?`;
    deleteModal.style.display = 'block';
    lastDeletedTask = taskElement;
}

confirmDeleteBtn.addEventListener('click', function () {
    if (lastDeletedTask) {
        lastDeletedTaskContainer = lastDeletedTask.parentElement;
        lastDeletedTaskContainer.removeChild(lastDeletedTask);
        deleteModal.style.display = 'none';
    }
});

cancelDeleteBtn.addEventListener('click', function () {
    lastDeletedTask = null;
    deleteModal.style.display = 'none';
});

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'z' && lastDeletedTask) {
        event.preventDefault();
        if (lastDeletedTaskContainer) {
            lastDeletedTaskContainer.appendChild(lastDeletedTask);
            lastDeletedTask = null;
            lastDeletedTaskContainer = null;
        }
    }
});

document.querySelectorAll('.list-header').forEach(header => {
    header.addEventListener('click', function () {
        const taskList = this.nextElementSibling;
        taskList.style.display = taskList.style.display === 'none' ? 'block' : 'none';
    });
});

searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    const tasks = document.querySelectorAll('.task-items li');
    tasks.forEach(task => {
        const taskText = task.textContent.toLowerCase();
        task.style.display = taskText.indexOf(query) > -1 ? '' : 'none';
    });
});
