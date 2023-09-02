import React, { useContext, useState } from 'react'
import { taskContext } from '../contexts/taskContext'


function Filters() {
    const [isClicked, setIsClicked] = useState([true, false, false])
    const { tasks, setTasks } = useContext(taskContext)
    const total = tasks.length
    const done = tasks.filter((t) => {
        return t.isCompleted
    }).length
    const pending = tasks.filter((t) => {
        return !t.isCompleted
    }).length

    function handleFilters(index) {
        let filteredTask = []
        const clicked = isClicked.map((c, i) => {
            if (i === index) {
                return true;
            } else {
                return false;
            }
        });
        setIsClicked(clicked);
        if (index == 1) {
            filteredTask = tasks.filter((t) => !t.isCompleted)
        } else if (index == 2) {
            filteredTask = tasks.filter((t) => t.isCompleted)
        } else {
            filteredTask = [...tasks]
        }
        setTasks(filteredTask)
    }
    return (
        <div className='w-full flex justify-between items-center'>
            <button onClick={() => { handleFilters(0) }} id="all" className={'flex-1 py-1 transition-all duration-100 flex justify-center items-center border-l border-gray-300 ' + (isClicked[0] ? "bg-my-yellow" : "")}>
                الكل
                <span className='px-1 bg-gray-300 text-xs mr-2 rounded-sm'>{0}</span>
            </button>
            <button onClick={() => { handleFilters(1) }} id="pending" className={'flex-1 py-1 transition-all duration-100 flex justify-center items-center border-l border-gray-300 hover:bg-my-yellow ' + (isClicked[1] ? "bg-my-yellow" : "")} >
                في الانتظار
                <span className='px-1 bg-gray-300 text-xs mr-2 rounded-sm'>{0}</span>
            </button>
            <button onClick={() => { handleFilters(2) }} id="done" className={'flex-1 py-1 transition-all duration-100 flex justify-center items-center hover:bg-my-yellow ' + (isClicked[2] ? "bg-my-yellow" : "")} >
                تم
                <span className='px-1 bg-gray-300 text-xs mr-2 rounded-sm'>{0}</span>
            </button>
        </div>
    )
}

export default Filters