import Image from "next/image";

import logo from '../assets/logo.png';
import { Container } from "@/components/container";

export default function Home() {
  return (

    <Container>

       <main className="min-h-[calc(100vh-80px)] flex items-center flex-col justify-center"
   
       >
          <h2 className="font-medium text-2xl mb-2">Manage your clients</h2>
          <h1 className="font-bold text-3xl mb-8 text-blue-600 md:text-4xl">Orders and Clients</h1>
          <Image
          src={logo}
          alt="Imagem ilustartiva do dev controle"
          width={600}
          priority={true}
          className="max-w-sm md:max-w-xl"
          
          />
       </main>

    </Container>
  );
}
