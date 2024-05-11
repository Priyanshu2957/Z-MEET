'use client'
import Image from 'next/image'
import { Textarea } from "@/components/ui/textarea"

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from './ui/use-toast'
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input'

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setmeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const {toast}= useToast()
    const [Values, setValues] = useState({
        dateTime : new Date(),
        desc: '',
        link:''
    })
    const [CallDetails, setCallDetails] = useState<Call>()
    const {user} = useUser();
    const client = useStreamVideoClient()
    const createMeeting = async() =>{ //function must be async if u use try catch
        if(!client || !user ) return;

        try {
            if(!Values.dateTime){
                toast({
                    title: "Please provide a date and time",
                  })
                return;
            }

            
            const id = crypto.randomUUID(); //for random id 
            const call = client.call('default',id);

            if(!call) throw new Error("Failed to create call");
            
            const startsAt = Values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const desc = Values.desc || 'Instant Meeting';
            await call.getOrCreate({
                data : {
                    starts_at: startsAt,
                    custom:{
                        desc
                    }
                }
            })
            setCallDetails(call);
            
            if(!Values.desc){
                router.push(`/meeting/${call.id}`)
            }
            toast({
                title: "Meeting Created",
              })
        } catch (error) {
            console.log(error);
            toast({
                title: "Failed to create meeting",
              })
        }
    }
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${CallDetails?.id}`
  return (
    <section className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <HomeCard 
            img="/icons/add-meeting.svg"
            title='New Meeting'
            desc='Create a new meeting'
            click={()=> setmeetingState('isInstantMeeting')}
            color = "bg-orange-500"
        />
        <HomeCard img="/icons/schedule.svg"
            title='Schedule Meeting'
            desc='Plan a new meeting'
            click={()=> setmeetingState('isScheduleMeeting')} 
            color = "bg-blue-500"
            />
        <HomeCard img="/icons/recordings.svg"
            title='Recordings'
            desc='Check your saved meeting'
            click={()=> router.push('/recordings')}
            color = "bg-purple-500"
            />

        <HomeCard img="/icons/join-meeting.svg"
            title='Join Meeting'
            desc='Join a exixting meeting'
            click={()=> setmeetingState('isJoiningMeeting')} 
            color = "bg-red-500"
            />

            {!CallDetails ? (
                <MeetingModal 
                isOpen={meetingState==='isScheduleMeeting'}
                onClose={()=> setmeetingState(undefined)}
                title = "Create Meeting"
                click={createMeeting}
            >
                <div className=' flex flex-col gap-2.5'>
                    <label className=' text-base text-normal leading-[22px] text-sky-100'>Add a description</label>
                    <Textarea placeholder='Please provide a description!!' className=' border-none bg-black focus-visible:ring-0 focus-visible:ring-offset-0' onChange={(e)=>{
                        setValues({...Values, desc:e.target.value})
                    }} />
                </div>
                <div className=' flex w-full flex-col gap-2.5 '>
                <label className=' text-base text-normal leading-[22px] text-sky-100'>Select date and time</label>
                <ReactDatePicker 
                    selected={Values.dateTime}
                    onChange={(date) => setValues({...Values,dateTime:date!})}
                    showTimeSelect
                    timeFormat='HH:mm'
                    timeIntervals={15}
                    timeCaption='time'
                    dateFormat='MMMM d, yyyy h:mm aa'
                    className=' w-full rounded bg-dark-2 p-2 focus:outline-none'
                />
                </div>
            </MeetingModal>
            ): (
            <MeetingModal 
            isOpen={meetingState==='isScheduleMeeting'}
            onClose={()=> setmeetingState(undefined)}
            title = "Meeting Created"
            cls='text-center'
            click={()=>{
                navigator.clipboard.writeText(meetingLink);
                toast({title:'Link Copied'})
            }}
            image='/icons/checked.svg'
            buttonIcon='/icons/copy.svg'
            buttonTxt='Copy Meeting Link'
        />
            )}
        <MeetingModal 
            isOpen={meetingState==='isInstantMeeting'}
            onClose={()=> setmeetingState(undefined)}
            title = "Start an instant meeting"
            cls='text-center'
            buttonTxt="Start Meeting"
            click={createMeeting}
        />
         <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setmeetingState(undefined)}
        title="Type the link here"
        cls="text-center"
        buttonTxt="Join Meeting"
        click={() => router.push(Values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...Values, link: e.target.value })}
          className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
    </section>
  )
}

export default MeetingTypeList