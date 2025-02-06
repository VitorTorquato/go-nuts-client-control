
import { Input } from '@/components/input';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { api } from '@/lib/api';
import { CustomerDataInfo } from '../../page'

interface  FormTicketProps{
    customer: CustomerDataInfo
}

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Describe you problesm")
})

type FormData = z.infer<typeof schema>

export function FormTicket({customer}: FormTicketProps){
    
    const {handleSubmit , register , setValue , formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema)
    })
    


    const handleRegisterTicket = async (data:FormData) => {
        const response = await api.post('/api/ticket' , {
            name: data.name,
            description: data.description,
            customerId: customer.id
        })

        setValue("name" , "")
        setValue("description" , "")

    }

    return(
        <form 
        onSubmit={handleSubmit(handleRegisterTicket)}
        className='bg-slate-200 mt-6 px-4 py-6 rounded-md border-2'>
            <label className='mb-1 font-medium text-lg'>Nome do chamado</label>
            <Input
            name='name'
            type='text'
            placeholder='Describe your problem...'
            register={register}
            error={errors.name?.message}
            />

            <label>Describe your problem</label>
            <textarea
             className='w-full border-2 rounded-md h-24 resize-none  px-2'
             placeholder='Describe your problem...'
             id='description'
             {...register("description")}
            ></textarea>
            {errors.description?.message && <p className='text-red-500 my-1 mt-1 mb-4'>{errors.description.message}</p>}

            <button 
            className='bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold'
            type='submit'>SUBMIT</button>
        </form>
    )
}