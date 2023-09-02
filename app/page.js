'use client'
import NewTask from './components/NewTask';
import 'animate.css';
import { useState } from 'react';
import TaskList from './components/TaskList';
import { taskContext } from './contexts/taskContext';

export default function Home() {
  const today = new Date();
  const todaysDate = today.toLocaleDateString('ar-EG-u-nu-latn', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });


  const [tasks, setTasks] = useState([])

  return (
    <main className="flex min-h-screen h-screen w-screen min-w-full items-end bg-blue-dark justify-center text-gray-900">
      <div className='bg-mint flex flex-col p-6 lg:w-1/2 w-[90%] h-[90%] rounded-t-md shadow-md'>
        {/* Header */}
        <div className='flex justify-between w-full items-center border-b border-gray-400/60 pb-2'>
          <h1 className='font-medium text-lg'>قائمة المهام</h1>
          <p className='text-sm'>{todaysDate}</p>
        </div>
        <taskContext.Provider
          value={{ tasks, setTasks, todaysDate }}
        >
          {/* Adding task */}
          <div className='w-full mt-5'>
            <NewTask />
          </div>

          <div className='border-t border-gray-400 w-full mt-5 h-5/6 bg-white flex flex-col'>
            {/* list of tasks */}
            <TaskList />
            {/* {!taskList.length ? "لم تقم بإضافة أي مهمة إلى الآن" : taskList} */}
          </div>
        </taskContext.Provider>
      </div>
    </main>
  )
}
