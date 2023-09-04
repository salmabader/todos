import React, { useContext, useEffect, useState } from 'react'
import { HiTrash } from 'react-icons/hi';
import { TbTriangleInvertedFilled, TbPlayerPauseFilled } from 'react-icons/tb';
import { RiEdit2Fill, RiSave3Fill } from 'react-icons/ri';
import { taskContext } from '../contexts/taskContext';

function getCurrentDateString() {
    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    const time = (today.getHours() < 10 ? '0' : '') + today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes()
    return date + ' ' + time

}

function Task(props) {
    const { tasks, setTasks } = useContext(taskContext)
    const [isChecked, setIsChecked] = useState(false)
    const [isStarted, setIsStarted] = useState(false)
    const [isEditable, setIsEditable] = useState(false)
    const [editableTask, setEditableTask] = useState("")

    function handleChange(e) {
        setEditableTask(e.target.value)
    }

    function handleStart() {
        if (props.isStarted) {
            setIsStarted(false)
        } else {
            setIsStarted(true)
        }
        const newVersion = tasks.map((t) => {
            if (t.id == props.id) {
                t.isStarted = !t.isStarted
                t.startTime = getCurrentDateString()
                if (isStarted) {
                    t.startTime = ""
                }
            }
            return t
        })
        setTasks(newVersion)
    }

    function handleCheck() {
        setIsChecked(!isChecked)
        const newVersion = tasks.map((t) => {
            if (t.id == props.id) {
                t.isCompleted = !t.isCompleted
                t.completedAt = getCurrentDateString()
                const duration = new Date(t.completedAt) - new Date(t.startTime);
                t.duration = duration ? duration : 0
            }
            return t
        }
        )
        setTasks(newVersion)
    }

    function handleDelete() {
        const newVersion = tasks.filter((t) => t.id != props.id)
        setTasks(newVersion)
    }

    function handleEdit() {
        setEditableTask(props.title)
        setIsEditable(!isEditable)
        if (isEditable) {
            setEditableTask(editableTask)
        }
        const newVersion = tasks.map((t) => {
            if (t.id == props.id) {
                t.title = editableTask
            }
            return t
        })
        setTasks(newVersion)
    }
    let taskComponent = ""
    if (isEditable) {
        taskComponent = (<>
            <input className='w-full bg-white/20 border-0 outline-none text-white ring-0 focus:ring-0 p-0 px-1 rounded-md' type="text" value={editableTask} onChange={(e) => { handleChange(e) }} />
        </>)
    } else {
        taskComponent = (<>
            <p className={'text-lg ' + (props.isCompleted ? "line-through" : "")}>{props.title}</p>
        </>)
    }


    return (
        <div className='animate__animated animate__zoomIn animate__faster w-full bg-blue-dark flex justify-between items-center mb-3 text-white p-2 rounded-md gap-5'>
            <div className='flex flex-col justify-center w-full'>
                <div className='flex gap-2'>
                    <input className='w-5 h-5 rounded-full bg-blue-dark border-gray-200 hover:cursor-pointer outline-none checked:bg-blue-mid text-blue-mid ring-0 focus:ring-0 ' type="checkbox" checked={props.isCompleted} onChange={handleCheck} />
                    {taskComponent}
                </div>
                <div className={'flex w-full items-center text-sm'}>
                    <span className={(props.startTime || props.completedAt ? "block" : "hidden")}>{props.startTime}</span>
                    <span className={"h-[0.5px] bg-zinc-100 flex-1 mx-2 " + (props.isCompleted && props.startTime ? "visible" : "invisible")}></span>
                    <span className={(props.isCompleted && props.startTime ? "block" : "hidden")}>{props.completedAt}</span>
                </div>
            </div>
            <div className='flex items-center'>
                <span className={"relative flex h-2 w-2 ml-2 " + (props.isStarted && !props.isCompleted ? "visible" : "invisible")}>
                    <span className={" absolute inline-flex h-full w-full rounded-full bg-zinc-100 opacity-75 " + (!props.isCompleted ? "animate-ping" : "")}></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-100"></span>
                </span>
                <button className={'text-blue-mid hover:bg-white text-lg rounded-full p-1 transition-all duration-100 ' + (!props.isStarted ? "-rotate-90 " : "") + (props.isCompleted ? "invisible" : "visible")} onClick={handleStart}>
                    {!props.isStarted ? <TbTriangleInvertedFilled /> : <TbPlayerPauseFilled />}
                </button>
                <button className={'text-cyan-400 hover:bg-white text-lg rounded-full p-1 transition-all duration-100 '} onClick={handleEdit}>
                    {isEditable ? <RiSave3Fill /> : <RiEdit2Fill />}
                </button>
                <button onClick={handleDelete} className='text-red-500 hover:bg-white text-lg rounded-full transition-all duration-100 p-1'>
                    <HiTrash />
                </button>
            </div>
        </div>
    )
}

export default Task