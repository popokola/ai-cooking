"use client";
import { SessionProvider } from "next-auth/react"
//df
const Provider = ({ children }) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}

export default Provider

