document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    // Fetch existing todos and display them
    fetch('/todos')
        .then(response => response.json())
        .then(todos => {
            for (const todo of todos) {
                addTodoToList(todo);
            }
        });

    // Add new todo when form is submitted
    form.addEventListener('submit', event => {
        event.preventDefault();
        const text = input.value.trim();
        if (text) {
            fetch('/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            })
                .then(response => response.json())
                .then(todo => {
                    addTodoToList(todo);
                    input.value = '';
                });
        }
    });

    function addTodoToList(todo) {
        const li = document.createElement('li');
        li.textContent = todo.text;
        li.dataset.id = todo.id;
        li.classList.add('mb-2');
        list.appendChild(li);
    }
});
