'use client'

import * as React from 'react'
import { signIn } from 'next-auth/react'

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean
  text?: string
}

export function LoginButton({
  text = 'Login with GitHub',
  showGithubIcon = true,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <button
      onClick={() => {
        setIsLoading(true)
        // next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
        signIn('github', { callbackUrl: `/` })
      }}
      disabled={isLoading}
      {...props}
    > Login
    </button>
  )
}