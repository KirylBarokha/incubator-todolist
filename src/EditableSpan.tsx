import React, {ChangeEvent} from 'react';
import {TaskType} from './Todolist';

type EditableSpanPropsType = {
    onChangeHandler : (event: ChangeEvent<HTMLInputElement>) => void
    onClickHandler : () => void
    task: TaskType
}
const EditableSpan = (props : EditableSpanPropsType) => {

    return (
        <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <input type="checkbox" checked={props.task.isDone} onChange={props.onChangeHandler}/>
            <span>{props.task.title}</span>
            <button onClick={props.onClickHandler}>
                x
            </button>
        </li>
    )
}

export default EditableSpan