import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    function addTodolist(title: string) {
        let newTodolistId = v1()
        let newTodolist: TodolistsType = {id: newTodolistId, title: title, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})
    }


    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }


    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(task => task.id !== id)

        setTasks({...tasks})
    }

    function changeFilterValue(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(todolist => todolist.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(todolist => {
                    let allTodolistTasks = tasks[todolist.id]
                    let tasksForTodolist = allTodolistTasks

                    if (todolist.filter === 'active') {
                        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                    }

                    return <Todolist key={todolist.id}
                                     id={todolist.id}
                                     title={todolist.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilterValue}
                                     addTask={addTask}
                                     changeTaskStatus={changeTaskStatus}
                                     filter={todolist.filter}
                                     removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}

export default App;
