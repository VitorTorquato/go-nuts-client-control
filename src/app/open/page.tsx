"use client"

import { Input } from "@/components/input"

import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from 'react-hook-form';
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { FormTicket } from "./components/formTicket";
import { api } from "@/lib/api";


const schema = z.object({
    email: z.string().email("Search by user email").min(1, "Email is required")
})

type FormData = z.infer<typeof schema>


export interface CustomerDataInfo{
    id:string;
    name:string;
}

export default function OpenTicket(){
    const {handleSubmit , register , setValue, setError , formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const [customer,setCustomer] = useState<CustomerDataInfo | null>(null);

    const handleSearchCustomer = async (data: FormData) => {
        const response = await api.get('/api/customer' , {
            params:{
                email:data.email,
            }
        })

        if(response.data === null){
            setError("email" , {type:"custom" , message: "Client not found"})
            return;
        }

        setCustomer({
            id: response.data.id,
            name: response.data.name
        })
     

    }

    const handleClearCustomer = () => {
        setCustomer(null)
        setValue("email" , "")
    }
    


    return(
        <div className="w-full max-w-2xl mx-auto px-2 ">
            <h1 className="font-bold  text-3xl text-center mt-24">teste</h1>

            <main className="flex flex-col mt-4 mb-2">

             {
                customer ? (
                    <div className="bg-slate-200 py-6 px-4 rounded-md border-2 flex items-center justify-between">
                        <p className="text-lg"><strong>Client selected:</strong>{customer.name}</p>

                        <button onClick={handleClearCustomer} className="h-11 px-2 flex items-center justify-center rounded"> <FiX size={30} color="#ef4444 "/></button>
                    </div>
                ) : (
                    <form
                    onSubmit={handleSubmit(handleSearchCustomer)}
                    className="bg-slate-200 py-6 px-2 rounded-md border-2 outline-none">
                    <div className="flex flex-col gap-3">
                        <Input
                        name="email"
                        placeholder="Search by user client email"
                        type="text"
                        error={errors.email?.message}
                        register={register}
                        />


                        <button
                        type="submit"
                        className="bg-blue-500 flex flex-row gap-4 px-2 h-11 items-center justify-center rounded-md text-white font-bold">
                            Search Client
                            <FiSearch size={24} color="#FFF"/>
                        </button>
                    </div>
                </form>
                )
             }


            {customer !== null && ( <FormTicket customer={customer}/>)}
            </main>
        </div>
    )
}