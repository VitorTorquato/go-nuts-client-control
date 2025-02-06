"use client"

import { FiCheckSquare,FiFile } from "react-icons/fi"

import { TicketProps } from "@/utils/tickets.type"
import { CustomerProps } from "@/utils/customer.type"

import { useRouter } from "next/navigation";

import { api } from "@/lib/api";

import { useContext } from "react";
import {ModalContext} from '@/providers/modal';


interface TicketItemProps{
    ticket:TicketProps
    customer: CustomerProps | null;
}

export function TicketItem({customer,ticket}: TicketItemProps){

    const {handleModalVisible , setDetailTicket} = useContext(ModalContext);

    const router = useRouter();
    
    const handleOpenModal = () => {
        handleModalVisible()
        setDetailTicket({
            customer:customer,
            ticket: ticket
        })
    }

    async function handleChangeStatus(){
        try{
            const response = await api.patch("/api/ticket" , {
                id: ticket.id,
            })

            router.refresh();
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }


    return(
        <>
            <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
                <td className="text-left pl-2">{customer?.name}</td>
                <td className="text-left"><span className="text-left">{ticket.name}</span></td>
                <td className="text-left">
                    <button className="mr-3" onClick={handleChangeStatus}>
                            <FiCheckSquare size={24} color="#131313"/>
                    </button>
                    <button onClick={handleOpenModal}>
                            <FiFile size={24} color="#3b82f6"/>
                    </button>
                </td>
            </tr>
        </>
    )
}