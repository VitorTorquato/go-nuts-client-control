import { Container } from "@/components/container";
import Link from "next/link";

import { getServerSession } from "next-auth";
import {authOptions} from '@/lib/auth'
import { redirect } from "next/navigation";

import prismaClient from "@/lib/prisma";

export default async function newTicket(){


    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        redirect("/")
    }


    const customers = await prismaClient.customer.findMany({
        where:{
            userId: session.user.id
        }
    })


    async function handleRegisterTicket(formData: FormData){
        "use server" //transformando a funcao em server

        const name = formData.get("name")
        const description = formData.get("description")
        const customerId = formData.get("customer")


       //console.log(`name: ${name}, description: ${description} customer: ${customerId}`)

        if(!name || !description || !customerId){
            return;
        }

        await prismaClient.ticket.create({
            data:{
                name: name as string,
                description: description as string,
                customerId: customerId as string,
                status: "ABERTO",
                userId: session?.user.id
            }
        })

        redirect("/dashboard")


    }


    return(
        <Container>
            <main className="mt-9 mb-2">
            <div className="flex items-center gap-3 ">
                <Link href='/dashboard'
                className="text-white px-4 py-1 rounded bg-gray-900"
                >
                Go back
                </Link>

                <h1 className="text-3xl font-bold">New Order</h1>
            </div>


                <form 
                action={handleRegisterTicket}
                className="flex flex-col mt-6">
                    <label className="mb-1 font-medium text-lg">Name of the cake</label>
                    <input 
                    className="w-full border-2 rounded-md px-2 mb-2 h-11"
                    type="text"
                    placeholder="Type the name o the cake"
                    required 
                    name="name"
                    />

                    <label className="mb-1 font-medium text-lg">Description of the cake</label>
                    <textarea 
                    className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
                    placeholder="Describe the cake"
                    required 
                    name="description"
                    ></textarea>

                    {
                        customers.length !== 0 &&(

                            <>
                            <label className="mb-1 font-medium text-lg">Select the customer</label>

                            <select 
                            className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white"
                            name="customer"
                            >

                                {
                                    customers.map((customer) => (
                                        <option 
                                        key={customer.id}
                                         value={customer.id}
                                         >
                                            {customer.name}
                                         </option>
                                    ))
                                }
                            </select>
                            </>
                        )
                    }

                    {
                        customers.length === 0 && (
                            <Link href="/dashboard/new">
                                You dont't have any client at the momment, <span className="text-blue-500 font-medium">Add new client</span>
                            </Link>
                        )
                    }


                    <button
                    disabled={customers.length === 0}
                    type="submit"
                    className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        SUBMIT
                    </button>

                </form>


            </main>

        </Container>
    )
}