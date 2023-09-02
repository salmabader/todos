import React, { useContext, useState } from 'react'
import Task from './Task'
import { taskContext } from '../contexts/taskContext'

function TaskList() {
    const [isClicked, setIsClicked] = useState([true, false, false, false])
    const { tasks } = useContext(taskContext)
    let filteredTask = [...tasks]
    const total = tasks.length
    const pending = tasks.filter((t) => {
        return !t.isCompleted && !t.isStarted
    }).length
    const inProgress = tasks.filter((t) => {
        return t.isStarted && !t.isCompleted
    }).length
    const done = tasks.filter((t) => {
        return t.isCompleted
    }).length

    function handleFilters(index) {
        const clicked = isClicked.map((c, i) => {
            if (i === index) {
                return true;
            } else {
                return false;
            }
        });
        setIsClicked(clicked);
    }

    if (isClicked[1]) {
        filteredTask = tasks.filter((t) => !t.isCompleted && !t.isStarted)
    } else if (isClicked[2]) {
        filteredTask = tasks.filter((t) => t.isStarted && !t.isCompleted)
    } else if (isClicked[3]) {
        filteredTask = tasks.filter((t) => t.isCompleted)
    } else {
        filteredTask = [...tasks]
    }

    const taskList = filteredTask.map((t) => {
        return <Task key={t.id} id={t.id} title={t.title} creationDate={t.addedOn} isStarted={t.isStarted} isCompleted={t.isCompleted} startTime={t.startTime} completedAt={t.completedAt} duration={t.duration} />
    })
    return (
        <>
            <div className='border-b border-gray-400'>
                {/*  */}
                <div className='w-full flex justify-between items-center'>
                    <button onClick={() => { handleFilters(0) }} id="all" className={'flex-1 py-1 transition-all duration-100 flex justify-center items-center border-l border-gray-300 ' + (isClicked[0] ? "bg-my-yellow" : "")}>
                        الكل
                        <span className='px-1 bg-gray-300 text-xs mr-2 rounded-sm'>{total}</span>
                    </button>
                    <button onClick={() => { handleFilters(1) }} id="pending" className={'flex-1 py-1 transition-all duration-100 flex justify-center items-center border-l border-gray-300 hover:bg-my-yellow ' + (isClicked[1] ? "bg-my-yellow" : "")} >
                        في الانتظار
                        <span className='px-1 bg-gray-300 text-xs mr-2 rounded-sm'>{pending}</span>
                    </button>
                    <button onClick={() => { handleFilters(2) }} id="pending" className={'flex-1 py-1 transition-all duration-100 flex justify-center items-center border-l border-gray-300 hover:bg-my-yellow ' + (isClicked[2] ? "bg-my-yellow" : "")} >
                        قيد الانجاز
                        <span className='px-1 bg-gray-300 text-xs mr-2 rounded-sm'>{inProgress}</span>
                    </button>
                    <button onClick={() => { handleFilters(3) }} id="done" className={'flex-1 py-1 transition-all duration-100 flex justify-center items-center hover:bg-my-yellow ' + (isClicked[3] ? "bg-my-yellow" : "")} >
                        تم
                        <span className='px-1 bg-gray-300 text-xs mr-2 rounded-sm'>{done}</span>
                    </button>
                </div>
            </div>

            <div className='overflow-y-auto py-3 px-2'>
                {/* list of tasks */}
                {!taskList.length ? "لا توجد مهمة إلى الآن" : taskList}
            </div>
        </>
    )
}

export default TaskList