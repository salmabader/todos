import React, { useContext, useEffect, useState } from 'react'
import { HiTrash } from 'react-icons/hi';
import { TbTriangleInvertedFilled, TbPlayerPauseFilled } from 'react-icons/tb';
import { taskContext } from '../contexts/taskContext';
let preciseTime = null

function Task(props) {
    const { tasks, setTasks } = useContext(taskContext)
    const [isChecked, setIsChecked] = useState(false)
    const [isStarted, setIsStarted] = useState(false)

    useEffect(() => {
        const today = new Date()
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        preciseTime = date + ' ' + time
        console.log("Checked: ", preciseTime)
    }, [isChecked])


    useEffect(() => {
        const today = new Date()
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        preciseTime = date + ' ' + time
        console.log("Started: ", preciseTime)
    }, [isStarted])


    function handleStart() {
        if (props.isStarted) {
            setIsStarted(false)
        } else {
            setIsStarted(true)
        }
        const newVersion = tasks.map((t) => {
            if (t.id == props.id) {
                t.isStarted = !t.isStarted
                t.startTime = preciseTime
            }
            return t
        })
        setTasks(newVersion)
    }

    function handleChange() {
        setIsChecked(!isChecked)
        const newVersion = tasks.map((t) => {
            if (t.id == props.id) {
                t.isCompleted = !t.isCompleted
                t.completedAt = preciseTime
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

    return (
        <div className='animate__animated animate__zoomIn animate__faster w-full bg-blue-dark flex justify-between items-center mb-3 text-white p-2 rounded-md gap-5'>
            <div className='flex flex-col justify-center w-full'>
                <div className='flex gap-2'>
                    <input className='w-5 h-5 rounded-full bg-blue-dark border-gray-200 hover:cursor-pointer outline-none checked:bg-blue-mid text-blue-mid ring-0 focus:ring-0 ' type="checkbox" checked={props.isCompleted} onChange={handleChange} />
                    <p className={'text-lg ' + (props.isCompleted ? "line-through" : "")}>{props.title}</p>
                </div>
                <div className='flex w-full items-center text-sm'>
                    <span>{props.creationDate}</span>
                    <span className={"h-[0.5px] bg-zinc-100 flex-1 mr-2 " + (props.isStarted ? "visible" : "invisible")}></span>
                    <span className={"relative flex h-2 w-2 ml-2 " + (props.isStarted ? "visible" : "invisible")}>
                        <span className={" absolute inline-flex h-full w-full rounded-full bg-zinc-100 opacity-75 " + (!props.isCompleted ? "animate-ping" : "")}></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-100"></span>
                    </span>
                    <span className={"text-my-yellow " + (props.isCompleted && props.isStarted ? "visible" : "invisible")}>{props.duration / 1000 > 60 ? (props.duration / 1000 / 60).toFixed(1) + " د" : (props.duration / 1000) + " ث"}</span>
                </div>
            </div>
            <div className='flex items-center'>
                <button className={'text-blue-mid hover:bg-gray-200 text-lg rounded-full p-1 transition-all duration-100 ' + (!props.isStarted ? "-rotate-90 " : "") + (props.isCompleted ? "invisible" : "visible")} onClick={handleStart}>
                    {!props.isStarted ? <TbTriangleInvertedFilled /> : <TbPlayerPauseFilled />}
                </button>
                <button onClick={handleDelete} className='text-red-500 hover:bg-gray-200 text-lg rounded-full transition-all duration-100 p-1'>
                    <HiTrash />
                </button>
            </div>
        </div>
    )
}

export default Task