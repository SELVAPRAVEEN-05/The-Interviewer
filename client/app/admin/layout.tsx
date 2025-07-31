import SideBar from '@/components/atoms/sidebar'
import React from 'react'

export default function AdminLayout() {
    return (
        <div className='flex h-screen w-full'>

            <div className='bg-gray-800 text-white p-4 w-2/12 h-full'>
                <div><SideBar /></div>
            </div>
            <div className='flex-1 p-4'>
                {/* Main content goes here */}
                <h1 className='text-xl'>Main Content Area</h1>
            </div>
        </div>
    )
}
