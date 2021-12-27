import styles from '../styles/Home.module.css'
import { useWeb3Store } from '../stores/Web3Store';
import { useUserStore } from '../stores/UserStore';


export default function Home() {
  const web3 = useWeb3Store(state => state.web3);
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  const handleSignIn = async() => {
   const accounts = await web3.eth.getAccounts();
   console.log({accounts})
   try{
    await web3.eth.personal.sign("Welcome to Todo D'app", accounts[0],null)
    setUser({account: accounts[0]})
   } catch(err){
     console.log({err})
   }
  }

  return (
    <main className={styles.main}>
      <button 
        style={{background:'blue', border:'none', borderRadius:8, height: 56,color:'white',marginTop:16, width: 200}} 
        onClick={handleSignIn}
      >
        Sign In
      </button>
    </main>
  )
}
