import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions as NextAuthConfig } from "next-auth"
import { getServerSession } from "next-auth"

import Discord from "next-auth/providers/discord"
import Google from "next-auth/providers/google"


declare module "next-auth/jwt" {
    interface JWT {
      /** The user's role. */
      userRole?: "admin"
    }
}

export const config = {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        Discord({ clientId: process.env.AUTH_DISCORD_ID, clientSecret: process.env.AUTH_DISCORD_SECRET }),
        //Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET }),
    ],
    
    callbacks: {
        async jwt({ token }) {
          token.userRole = "admin"
          return token
        },
      },

    
} satisfies NextAuthConfig


export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, config)
}