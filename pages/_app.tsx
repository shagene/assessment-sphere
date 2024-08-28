import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { supabase } from '@/lib/supabase'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}