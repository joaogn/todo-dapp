import styles from '../styles/Home.module.css'
import { useSimpleStorageMethods } from '../hooks/useSimpleStorageMethods'
import { useEffect, useState,useCallback } from 'react';
import { useUserStore } from '../stores/UserStore';

export default function Dashboard() {
  const [value,setValue] = useState(0);
  const {loading, methods} = useSimpleStorageMethods()
  const user = useUserStore(state => state.user);

  const handleSaveRandomValue = async() => {

    const acc = localStorage.getItem("ephemeral:account");
    if(!acc) return;
    const ephemeralAccount = JSON.parse(acc);
   // const randomValue = Math.ceil(Math.random() * 10);
    await methods.createTask("new task",1641056559).send({ from: user.account });
    await getValue();

  }

  const getValue = useCallback(async() => {

    const result = await methods.getTaks().call({ from: user.account });
    console.log({result})
    setValue(result);
  },[methods, user])

  useEffect(() => {
    if(methods){
      getValue();
    }
  },[getValue, methods])


 
  return (
    <>
    {loading ? (      
      <h1 className={styles.title}>
          loading...
      </h1>
      ) : methods && (
        <main className={styles.main}>
          <h1 className={styles.title}>
            {`Saved Value ${value}`}
          </h1>
          <button 
            style={{background:'blue', border:'none', borderRadius:8, height: 56,color:'white',marginTop:16}} 
            onClick={handleSaveRandomValue}
            >
              Save Randon Value
            </button>
        </main>
    )}
    </>
  
  )
}
