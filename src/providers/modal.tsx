"use client"

import {createContext , ReactNode , use, useState} from 'react';
import {TicketProps} from '@/utils/tickets.type';
import {CustomerProps} from '@/utils/customer.type';
import { ModalTicket } from '@/components/modal';


interface ModalContextData{
    visible:boolean;
    handleModalVisible: () => void; 
    ticket: TicketInfo | undefined;
    setDetailTicket: (detail:TicketInfo) => void;
}

interface TicketInfo{
    ticket:TicketProps;
    customer: CustomerProps | null
}
export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ( {children} : {children:ReactNode}) => {

    const [visible,setVisible] = useState(false);
    const [ticket,setTicket] = useState<TicketInfo>()

    function setDetailTicket(detail: TicketInfo){

        setTicket(detail)
    }

    function handleModalVisible(){
        setVisible(!visible)
    }
    
    return (
        <ModalContext.Provider
            value={{
                visible,
                handleModalVisible,
                ticket,
                setDetailTicket
            }}
        >

            {visible &&(
                <ModalTicket/>
            )}

            {children}
        </ModalContext.Provider>
    )
}



