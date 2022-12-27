import React, {useState} from 'react';
import { useEffect } from 'react';
import AddTodo from './AddTodo';
import Todo from './Todo';
import styles from './TodoList.module.css'
export default function Todolist({filter}) { // components that only shows list of Todo's


    // array that contains todoList
    const [todos , setTodos] = useState(() => readTodosFromLocalStorage());

    const handleAdd = (todo) => { 
        setTodos([...todos , todo]); 
        console.log(todo);
    }

    const handleUpdate = (updated) => 
        setTodos(todos.map((t) => t.id === updated.id ? updated : t)); 

    const handleDelete = (deleted) => 
        setTodos(todos.filter((t) => t.id !== deleted.id));

    useEffect(() => {
        localStorage.setItem('todos' , JSON.stringify(todos));
    } , [todos]);


    const filtered = getFilteredItems(todos, filter);
    return (
        <section className={styles.container}>

            <ul className={styles.list}>
                {filtered.map(item => 
                <Todo 
                    key={item.id}
                    todo={item}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />)}
            
            </ul> 

            <AddTodo onAdd={handleAdd}/>

        </section>
        
    );
}

function readTodosFromLocalStorage() {
    console.log('readTOsFromLocalStorage');
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

function getFilteredItems(todos , filter) {
    if (filter === 'all') {
        return todos;
    }

    return todos.filter(todo => todo.status === filter);
}