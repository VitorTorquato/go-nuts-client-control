import { NextResponse} from  'next/server';

import { getServerSession } from 'next-auth';
import {authOptions} from '@/lib/auth'

import prismaClient from '@/lib/prisma';



//Cadastrar um cliente
export async function POST(request: Request){


        const session = await getServerSession(authOptions);

        if(!session || !session.user){
            return NextResponse.json({error: "Not authorized"}, {status:401})
        }


        const {name,email,phone,address, userId} = await request.json();

        try{
            await prismaClient.customer.create({
                data:{
                    name,
                    email,
                    phone,
                    address : address ? address : "",
                    userId:userId
                }
            })

            
            return NextResponse.json({message: "client created successfully"})
        }catch(error){
            return NextResponse.json({error: "Failed create new user"}, {status:400})
        }

        

}

//Deletar cliente
export async function DELETE(request:Request){

    const session = await getServerSession(authOptions);


    if(!session || !session.user){
        return NextResponse.json({error: "not authorized"} , {status:401})
    }

    const {searchParams} = new URL(request.url);
    const userId = searchParams.get("id");


    if(!userId){
        return NextResponse.json({error: "Failed to delete user"}, {status:400})
    }
    
    const findTicket = await prismaClient.ticket.findFirst({
        where:{
            customerId: userId
        }
    })

    if(findTicket){
        return NextResponse.json({error: "Failed to delete user"}, {status:400})
    }

    try{
        await prismaClient.customer.delete({
            where:{
                id: userId as string
            }
        })

        return NextResponse.json({message: "Cliente deleted successfully"})

    }catch(error){
        console.log(error)
        return NextResponse.json({error: "Failed to delete user"}, {status:400})
    }

}

export async function GET(request: Request){

    const {searchParams} = new URL(request.url)
    const customerEmail = searchParams.get("email")

    if(!customerEmail || customerEmail === ""){
        return NextResponse.json({error: "Customer not found"} , {status:400})
    }

    try{
        const customer = await prismaClient.customer.findFirst({
            where:{
                email: customerEmail
            }
        })


        return NextResponse.json(customer)
    }catch(error){
        return NextResponse.json({error: "Customer not found"} , {status:400})
    }

    return NextResponse.json({message: "Recebido"})
}