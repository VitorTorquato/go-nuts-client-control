"use client"

import { RegisterOptions,UseFormRegister } from "react-hook-form";

interface InputProps{
    type:string;
    placeholder: string;
    name:string;
    register: UseFormRegister<any>;
    error?:string;
    rules?:RegisterOptions;
}



export function Input({name,placeholder,register,type, error,rules}:InputProps){
    return(
        <>
         <input
         className="w-full border-2 rounded-md h-11 px-2 outline-none" 
         id={name}   
         type={type}
         placeholder={placeholder}
         {...register(name,rules)}
        
         />
         {error && <p className="text-red-500 my-1">{error}</p>}
        </>
       
    )
}