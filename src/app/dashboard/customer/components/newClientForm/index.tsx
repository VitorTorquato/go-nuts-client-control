"use client"

import { Input } from '@/components/input';

import { useRouter } from 'next/navigation';


import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { api } from '@/lib/api';

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required"),
    phone: z.string().refine((value) => {
        return /^(?:\(\d{3}\)\s?)?\d{8}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value) //rejex
    },{
        message: "Phone is required"
    } ),
    address: z.string(),
})


type FormData = z.infer<typeof schema>

export function NewCustomerForm({userId} : {userId:string}){



    const {register , handleSubmit , formState: {errors},reset} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const router = useRouter();

    async function handleRegisterCustomer(data: FormData){
        const response = await api.post("/api/customer" , {
            name : data.name,
            phone:data.phone,
            email : data.email,
            address: data.address,
            userId: userId    
        })

        router.refresh();
        router.replace("/dashboard/customer");
    }

    return(
        <form onSubmit={handleSubmit(handleRegisterCustomer)} className='flex flex-col mt-6 '>
            <label className='mb-1 text-lg font-medium'>Full Name</label>
            
            <Input
            type='text'
            name='name'
            placeholder='Type your client full name'
            error={errors.name?.message}
            register={register}
            />

            <section className='flex flex-col sm:flex-row gap-2 w-full mt-2 my-2'>
                <div className='flex-1'>
                <label className='mb-1 text-lg font-medium'>Phone</label>
                <Input
                type='text'
                name='phone'
                placeholder='Type your client phone eg. +999 88667755'
                error={errors.phone?.message}
                register={register}
                />
                </div>

                <div className='flex-1'>
                <label className='mb-1 text-lg font-medium'>E-mail</label>
                <Input
                type='text'
                name='email'
                placeholder='Type your client email address'
                error={errors.email?.message}
                register={register}
                />
                </div>
                 
            </section>

            
            <label className='mb-1 text-lg font-medium'>Address</label>
                <Input
                type='text'
                name='address'
                placeholder='Type your client address'
                error={errors.address?.message}
                register={register}
                />

            <button type='submit' className='bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold'>Submit</button>

        </form>
    )
}