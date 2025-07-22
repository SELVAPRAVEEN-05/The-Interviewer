"use client"

import Education from "./component/education";
import Personal from "./component/personal";
import Skills from "./component/skills";

export default function OnBoarding() {

    return (
        <div className='h-screen px-52 py-24 w-full bg-blue-950'>
            <div className='bg-white h-full w-full rounded-2xl p-3 flex gap-5'>
                <div className='w-1/3 h-full rounded-lg bg-gray-100 p-2'> hii</div>
                <div className='h-full w-full pr-2 py-3'>
                    <Personal />
                    <Education />
                    <Skills />
                </div>
            </div>
        </div>
    )
}
