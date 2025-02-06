import { Container } from "@/components/container";
import {getServerSession} from 'next-auth'
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TicketItem } from "./components/ticket";
import prismaClient from '@/lib/prisma';
import { ButtonRefresh } from "./components/buttonRefresh";


export default async function Dashboard(){

    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        redirect('/');
    } 



    const tickets = await  prismaClient.ticket.findMany({
        where:{
            status: "ABERTO",
            customer:{
                userId: session.user.id
            }
        },
        include:{
            customer:true
        },
        orderBy:{
            createdAt: "desc"
        }
    })



    return(
        <Container>
            <main className="mt-9 mb-2">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Orders</h1>
                
                <div className="flex items-center gap-4">

                <ButtonRefresh/>

                <Link href='/dashboard/new' className="bg-blue-500 px-4 rounded py-1 text-white">
                 New Order
                </Link>
                </div>

            </div>

            <table className="min-w-full my-2">
                <thead>
                    <tr>
                        <th className="font-medium text-left pl-1">Client</th>
                       
                        <th className="font-medium text-left">Cake</th>
                        <th className="font-medium text-left">#</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        tickets.map((ticket) => (
                            <TicketItem 
                            customer={ticket.customer}
                            ticket={ticket}
                            key={ticket.id}
                            />
                            
                        ))
                    }
                </tbody>
            </table>

            {tickets.length === 0 && (
                <h1 className="px-2 md:px-0 text-gray-600">You don't have any order at the momment</h1>
            )}

            </main>
        </Container>
    )
}