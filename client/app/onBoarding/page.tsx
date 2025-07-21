// "use clients"

import { Uploadphoto } from '@/components/ui/imageUploder'
import { Input } from '@heroui/input'
import React from 'react'

export default function OnBoarding() {
    return (
        <div className='h-screen px-52 py-20 w-full bg-blue-950'>
            <div className='bg-white h-full w-full rounded-2xl p-3 flex gap-5'>
                <div className='w-1/3 h-full rounded-lg bg-gray-100 p-2'> hii</div>
                <div className='h-full w-full pr-2 py-3'>
                    <p className='font-semibold'>Let’s Get to Know You</p>
                    <p className='text-sm text-gray-500 pt-1'>Please provide your basic details so we can personalize your experience.</p>
                    <div className='pt-5'><Uploadphoto /></div>
                    <div className='grid grid-cols-2 gap-4 pt-4 w-full'>
                        <Input
                            className=""
                            label="First Name"
                            placeholder='Enter your first name'
                            size='lg'
                            type="email"
                            radius='sm'
                            variant="bordered"
                            isRequired
                        />
                        <Input
                            className=""
                            label="Last Name"
                            placeholder='Enter your last name'
                            radius='sm'
                            type="email"
                            size='lg'
                            variant="bordered"
                            isRequired
                        />
                        <Input
                            className=""
                            label="Mobile Number"
                            placeholder='Enter your mobile number'
                            radius='sm'
                            type='number'
                            size='lg'
                            variant="bordered"
                            isRequired
                        />
                        <Input
                            className=""
                            label="Email ID"
                            placeholder='Enter your email ID'
                            radius='sm'
                            type='email'
                            size='lg'
                            variant="bordered"
                            isRequired
                        />
                        <Input
                            className=""
                            label="Age"
                            placeholder='Enter your age'
                            radius='sm'
                            type='number'
                            size='lg'
                            variant="bordered"
                            isRequired
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
