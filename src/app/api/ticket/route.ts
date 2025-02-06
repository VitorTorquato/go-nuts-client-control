import { NextResponse } from "next/server";

import {getServerSession} from 'next-auth';

import { authOptions } from "@/lib/auth";
import prismaClient from '@/lib/prisma';



export async function PATCH(request:Request){

    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        return NextResponse.json({error:"Not authorized"} , {status: 401})
    }

    const {id} = await request.json();

    const findTiket = await prismaClient.ticket.findFirst({
        where:{
            id: id as string
        }
    })

    if(!findTiket){
        return NextResponse.json({error : "Failed update ticket"} , {status:400})
    }

    try{
            await prismaClient.ticket.update({
                where:{
                    id: id as string
                },
                data:{
                    status: "closed"
                }
            })

            return NextResponse.json({message:"Status updated"})

    }catch(error){
        return NextResponse.json({error : "Failed update ticket"} , {status:400})
    }

 
}


export async function POST(request:Request){
    const {customerId,name,description} = await request.json();

    if(!name || !description || !customerId){
        return NextResponse.json({error: "Failed create ticket"} , {status:400})
    }

    try{    
        await prismaClient.ticket.create({
            data:{
                name:name,
                description:description,
                status: "OPEN",
                customerId: customerId
            }
        })

        return NextResponse.json({message: "Registered"})

    }catch(error){
        return NextResponse.json({error: "Failed create ticket"} , {status:400})
    }

    
}