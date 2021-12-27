import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect} from 'react';
import { useWeb3Store } from '../stores/Web3Store';
import { useUserStore } from '../stores/UserStore';
import Router from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const getWeb3 = useWeb3Store(state => state.getWeb3)
  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)

  useEffect(() => {
    getWeb3();
  },[getWeb3])


  useEffect(() => {
    if(user){
      Router.push('dashboard')
      return
    }
    const storageduser = localStorage.getItem("todo:user");
    console.log('storaged', {storageduser} )
    if(!storageduser) {
      Router.push('/') 
      return
    }
    setUser(JSON.parse(storageduser))
    Router.push('dashboard')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return <Component {...pageProps} />
}

export default MyApp
