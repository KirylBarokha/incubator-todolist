import React, {ChangeEvent} from 'react'
import {FilterValuesType} from './App';
import AddItemForm from './AddItemForm';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    key: string
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: string
    removeTodolist: (id: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)

    }

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removeTodolist}>
                    x
                </button>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map((task) => {
                    const onClickHandler = () => {
                        props.removeTask(task.id, props.id)
                    }

                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = event.currentTarget.checked
                        props.changeTaskStatus(task.id, newIsDoneValue, props.id)
                    }

                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                            <span>{task.title}</span>
                            <button onClick={onClickHandler}>
                                x
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>
                    All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>
                    Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>

        </div>
    )
}