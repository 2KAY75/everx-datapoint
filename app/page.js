'use client'
import { useState } from 'react'
export default function Page(){
  const [phone,setPhone]=useState(''); const [email,setEmail]=useState(''); const [load,setLoad]=useState(false);
  const pay=()=>{
    if(!phone||!email){alert('Enter phone & email');return}
    setLoad(true);
    const sc=document.createElement('script'); sc.src='https://js.paystack.co/v1/inline.js';
    sc.onload=()=>{
      const h=window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email, amount: 28000, currency:'NGN',
        ref: 'EVERX_'+Date.now(),
        callback:(r)=>{setLoad(false);alert('✅ Success Ref: '+r.reference)},
        onClose:()=>setLoad(false)
      }); h.openIframe()
    }; document.body.appendChild(sc)
  }
  return (
    <div style={{maxWidth:420,margin:'0 auto',padding:16,fontFamily:'sans-serif',background:'#f5f7ff',minHeight:'100vh'}}>
      <div style={{background:'linear-gradient(135deg,#0A4FFF,#001aff)',borderRadius:20,padding:18,color:'white',display:'flex',alignItems:'center',gap:12}}>
        <img src="/logo.png" alt="Ever_X" style={{width:52,height:52,borderRadius:12,background:'white',padding:5}}/>
        <div><h1 style={{margin:0,fontSize:22,fontWeight:900}}>Ever_X Datapoint</h1><p style={{margin:0,fontSize:11}}>VTU.ng + Paystack • Instant</p></div>
      </div>
      <div style={{background:'white',borderRadius:16,padding:18,marginTop:16}}>
        <h3>MTN 1GB - ₦280</h3>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="080... phone" style={{width:'100%',padding:12,margin:'10px 0',borderRadius:12,border:'1px solid #ddd'}}/>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@gmail.com" style={{width:'100%',padding:12,margin:'10px 0 16px',borderRadius:12,border:'1px solid #ddd'}}/>
        <button onClick={pay} style={{width:'100%',padding:14,background:'black',color:'white',borderRadius:12,fontWeight:800}}>{load?'Loading...':'Pay ₦280 with Paystack'}</button>
      </div>
    </div>
  )
}
