import styles from '../styles/Home.module.css'
import { useSimpleStorageMethods } from '../services/hooks/useSimpleStorageMethods'
import { useEffect, useState,useCallback } from 'react';

export default function Home() {
  const [value,setValue] = useState(0);
  const {loading, methods, account} = useSimpleStorageMethods()

  const handleSaveRandomValue = async() => {
    const randomValue = Math.ceil(Math.random() * 10);
    await methods.set(randomValue).send({ from: account });
    await getValue();
  }

  const getValue = useCallback(async() => {
    const result = await methods.get().call();
    setValue(result);
  },[methods])

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
