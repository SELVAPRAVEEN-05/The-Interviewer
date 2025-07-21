"use client"

import { Uploadphoto } from '@/components/ui/imageUploder';
import { Button, DateInput, Input, Select, SelectItem } from '@nextui-org/react';
export default function OnBoarding() {
    const countries = [
        {
            name: "India",
            value: "IN",
            flag: "https://flagcdn.com/w40/in.png",
        },
        {
            name: "USA",
            value: "US",
            flag: "https://flagcdn.com/w40/us.png",
        },
        {
            name: "Canada",
            value: "CA",
            flag: "https://flagcdn.com/w40/ca.png",
        },
        {
            name: "Australia",
            value: "AU",
            flag: "https://flagcdn.com/w40/au.png",
        },
    ];
    return (
        <div className='h-screen px-52 py-24 w-full bg-blue-950'>
            <div className='bg-white h-full w-full rounded-2xl p-3 flex gap-5'>
                <div className='w-1/3 h-full rounded-lg bg-gray-100 p-2'> hii</div>
                <div className='h-full w-full pr-2 py-3'>
                    <p className='font-semibold'>Let’s Get to Know You</p>
                    <p className='text-sm text-gray-500 pt-1'>Please provide your basic details so we can personalize your experience.</p>
                    <div className='pt-5'><Uploadphoto /></div>
                    <div className='grid grid-cols-2 gap-x-4 gap-y-6 pt-4 w-full'>
                        <Input
                            className=""
                            label="First Name"
                            placeholder='Enter your first name'
                            size='lg'
                            type="text"
                            radius='sm'
                            variant="bordered"
                            isRequired
                        />
                        <Input
                            className=""
                            label="Last Name"
                            placeholder='Enter your last name'
                            radius='sm'
                            type="text"
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
                        <DateInput
                            label="Date of Birth"
                            variant="bordered"
                            radius='sm'
                            isRequired
                            size='lg'
                        />
                        <Select
                            className=""
                            label="Gender"
                            placeholder="Select your Gender"
                            variant="bordered"
                            size="lg"
                            isRequired
                            radius='sm'
                        >
                            <SelectItem>Male</SelectItem>
                            <SelectItem>Female</SelectItem>
                        </Select>
                        <Select
                            className=""
                            label="Choose Language"
                            placeholder="Select your Language"
                            variant="bordered"
                            size="lg"
                            isRequired
                            radius='sm'
                        >
                            <SelectItem>English</SelectItem>
                            <SelectItem>Tamil</SelectItem>
                        </Select>
                        <Select
                            label="Choose Country"
                            placeholder="Select your Country"
                            variant="bordered"
                            radius="sm"
                            size="lg"
                            classNames={{
                                trigger: "py-3",
                            }}
                        >
                            {countries.map((country) => (
                                <SelectItem
                                    key={country.value}
                                    value={country.value}
                                    startContent={
                                        <img
                                            src={country.flag}
                                            alt={country.name}
                                            className="w-5 h-5 rounded-sm object-cover"
                                        />
                                    }
                                >
                                    {country.name}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className='flex justify-end pt-5'>
                        <Button
                            className=''
                            color="primary"
                            size="lg"
                            radius="sm"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
