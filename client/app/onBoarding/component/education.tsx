import React from 'react'
import { Autocomplete, AutocompleteItem, Button, Input, Select, SelectItem } from '@nextui-org/react';
export default function Education() {
    const collegeNames = [
        { label: "Anna University", key: "1" },
        { label: "PSG College of Technology", key: "2" },
        { label: "Coimbatore Institute of Technology (CIT)", key: "3" },
        { label: "Madras Christian College (MCC)", key: "4" },
        { label: "Loyola College, Chennai", key: "5" },
        { label: "SRM Institute of Science and Technology", key: "6" },
        { label: "VIT Vellore", key: "7" },
        { label: "Thiagarajar College of Engineering (TCE)", key: "8" },
        { label: "SSN College of Engineering", key: "9" },
        { label: "St. Joseph's College, Trichy", key: "10" },
        { label: "Bannari Amman Institute of Technology (BIT)", key: "11" },
    ];

    const qualifications = [
        { label: "B.Tech", key: "1" },
        { label: "B.E", key: "2" },
        { label: "B.Sc", key: "3" },
        { label: "B.Com", key: "4" },
        { label: "Diploma", key: "5" },
        { label: "M.Tech", key: "6" },
        { label: "M.E", key: "7" },
        { label: "MBA", key: "8" },
        { label: "M.Sc", key: "9" },
    ];

    const specializations = [
        { label: "Computer Science", key: "1" },
        { label: "Information Technology", key: "2" },
        { label: "Electronics and Communication", key: "3" },
        { label: "Mechanical Engineering", key: "4" },
        { label: "Electrical Engineering", key: "5" },
        { label: "Civil Engineering", key: "6" },
        { label: "Commerce", key: "7" },
        { label: "Physics", key: "8" },
        { label: "Chemistry", key: "9" },
    ];


    return (
        <div className='h-full w-full  flex flex-col justify-between'>
            <div>
                <p className='font-semibold'>Education Information</p>
                <p className='text-sm text-gray-500 pt-1'>Please provide your education details to help us understand your background.</p>
                <div className='grid grid-cols-2 gap-x-4 gap-y-6 pt-4 w-full'>
                    <Autocomplete
                        className=""
                        radius='sm'
                        size='lg'
                        variant="bordered"
                        defaultItems={collegeNames}
                        label="College Name"
                        placeholder="Select your college"
                    >
                        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                    </Autocomplete>
                    <Autocomplete
                        label="Highest Qualification"
                        placeholder="Select your highest qualification"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        defaultItems={qualifications}
                        isRequired
                    >
                        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                    </Autocomplete>

                    <Autocomplete
                        label="Specialization"
                        placeholder="Select your specialization"
                        variant="bordered"
                        size="lg"
                        radius="sm"
                        defaultItems={specializations}
                        isRequired
                    >
                        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                    </Autocomplete>

                    <Select
                        className=""
                        label="Year of Passing"
                        placeholder="Select your year of passing"
                        variant="bordered"
                        size="lg"
                        isRequired
                        radius='sm'
                    >
                        <SelectItem>2025</SelectItem>
                        <SelectItem>2026</SelectItem>
                        <SelectItem>2027</SelectItem>
                        <SelectItem>2028</SelectItem>
                        <SelectItem>2029</SelectItem>
                    </Select>
                    <Input
                        className=""
                        label="Percentage/CGPA"
                        placeholder='Enter your percentage or CGPA'
                        radius='sm'
                        type='text'
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
                        label="10th Percentage"
                        placeholder='Enter your 10th percentage'
                        radius='sm'
                        type='text'
                        size='lg'
                        variant="bordered"
                        isRequired
                    />
                    <Input
                        className=""
                        label="12th Percentage"
                        placeholder='Enter your 12th percentage'
                        radius='sm'
                        type='text'
                        size='lg'
                        variant="bordered"
                        isRequired
                    />
                </div>
            </div>
            <div className='flex justify-end gap-4 pt-6'>
                <Button
                    className=''
                    color="primary"
                    size="md"
                    radius="sm"
                    variant='bordered'
                >
                    Go Back
                </Button>
                <Button
                    className=''
                    color="primary"
                    size="md"
                    radius="sm"
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
