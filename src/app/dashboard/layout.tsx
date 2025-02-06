import { ReactNode } from "react";
import { DashboardHeader } from "./components/header";

export default function DashboarLayout({children} : {children:ReactNode}){
    return(
        <>
           <DashboardHeader/>
        {children}
        </>
    )
}