'use client'
import React, { useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { taskContext } from '../contexts/taskContext';

function NewTask(props) {
    const { tasks, setTasks, todaysDate } = useContext(taskContext)
    const [newTask, setNewTask] = useState("")
    function handleChange(e) {
        setNewTask(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        if (newTask) {
            const task = {
                id: uuidv4(),
                title: newTask,
                addedOn: todaysDate.split('،')[1],
                isStarted: false,
                startTime: "",
                isCompleted: false,
                completedAt: "",
                duration: 0,
            }
            setTasks([...tasks, task])
            setNewTask("")
        }
    }
    return (
        <form className='flex justify-between items-center gap-4'>
            <input value={newTask} onChange={(e) => { handleChange(e) }} className='flex-1 rounded-lg px-4 py-2 bg-blue-light placeholder:text-gray-500 outline-none border-0 focus:ring-0' type="text" placeholder='أريد أن أقوم بـ . . .' />
            <button className='bg-blue-mid/20 py-2 px-4 rounded-lg font-medium hover:bg-blue-mid/70 transition-all duration-100' type="submit" onClick={(e) => { handleSubmit(e) }}>إضافة</button>
        </form>
    )
}

export default NewTask