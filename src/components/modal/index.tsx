"use client"

import { MouseEvent, useContext , useRef} from 'react';
import {ModalContext} from '@/providers/modal';


export function ModalTicket(){
    
    const {handleModalVisible , ticket} = useContext(ModalContext);
    const modalRef = useRef<HTMLDivElement | null>(null);


    const handleModalClick = ( e: MouseEvent<HTMLDivElement>) => {

        if(modalRef.current && !modalRef.current.contains(e.target as Node)){
            handleModalVisible();
        }
    }
    

    function handleShareDetails(){
        const whatsappLink = `https://api.whatsapp.com/send/?phone=35679070634&text=Detalhes do bolo do cliente: ${ticket?.customer?.name} - Detalhes:  ${ticket?.ticket.description}&type=phone_number`;

        window.open(whatsappLink, '_blank');
    }

    return(
        <div
        onClick={handleModalClick}
        className="absolute bg-gray-900/80 w-full min-h-screen"
        >

            <div className="absolute inset-0 flex items-center justify-center">

                <div 
                ref={modalRef}
                className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded-md">
                        <div className="flex items-center justify-between  mb-4">
                            <h1 className="font-bold text-lg md:text-2xl">Order Details</h1>

                            <button
                            onClick={handleModalVisible}
                            className="bg-red-500 p-1 tet-white rounded-md px-2"
                            >Close</button>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                            <h2 className="font-bold">Name: </h2>
                            <p>{ticket?.ticket.name}</p>
                        </div>

                        <div className="flex flex-wrap flex-col gap-1 mb-2">
                            <h2 className="font-bold">Descricption: </h2>
                            <p>{ticket?.ticket.description}</p>

                        </div>

                        <div>
                            <button
                            onClick={handleShareDetails}
                            className="bg-green-600 p-1 tet-white rounded-md px-2">Share</button>
                        </div>

                        <div className="border-b-[1px] w-full my-4"></div>

                        <h1 className="font-bold text-lg mb-4">Client Details</h1>

                        <div className="flex flex-wrap gap-1 mb-2">
                            <h2 className="font-bold">Name: </h2>
                            <p>{ticket?.customer?.name}</p>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                            <h2 className="font-bold">Phone:</h2>
                            <p>{ticket?.customer?.phone}</p>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2">
                            <h2 className="font-bold">Email:</h2>
                            <p>{ticket?.customer?.email}</p>
                        </div>

                       {ticket?.customer?.address && (
                             <div className="flex flex-wrap gap-1 mb-2">
                             <h2 className="font-bold">Adress:</h2>
                             <p>{ticket.customer.address}</p>
                         </div>
                       )}

                </div>

            </div>
        </div>
    )
}