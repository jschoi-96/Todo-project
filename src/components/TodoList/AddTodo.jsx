import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid'; // imported to generate unique key id
import styles from './AddTodo.module.css'

export default function AddTodo({onAdd}) {
    const [text , setText] = useState('');

    const handleChange = (e) => { 
        setText(e.target.value); // if there is a change, set it to new target
    }

    const handleSubmit = (e) => { // if event occurs, 

        if (text.trim().length === 0) { // trim -> delete extra space 
            return; 
        }
        e.preventDefault(); // prevent pages from refreshing
        onAdd({id: uuidv4() , text, status: 'active'});
        setText('');
    }

    return (
        <form className= {styles.form} onSubmit={handleSubmit}>
            <input
                className={styles.input}
                type="text"
                placeholder='Add Todo' 
                value={text} 
                onChange={handleChange}
                required
            />
        <button className={styles.button}> Add </button>
        </form>
        
    );
}

