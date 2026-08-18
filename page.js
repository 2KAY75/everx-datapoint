'use client'
import { useState } from 'react'
export default function Page(){
  const [phone,setPhone]=useState(''); const [email,setEmail]=useState('');
  const pay=()=>{
    if(!phone||!email){alert('Enter phone & email');return}
    // @ts-ignore
    if(typeof window.PaystackPop==='undefined'){
      const s=document.createElement('script'); s.src='https://js.paystack.co/v1/inline.js'; s.onload=()=>open(); document.body.appendChild(s)
    } else open();
    function open(){
      // @ts-ignore
      const h=window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: email, amount: 28000, ref: 'EVERX_'+Date.now(),
        callback:(r)=>alert('Success! Ref: '+r.reference),
        onClose:()=>{}
      }); h.openIframe()
    }
  }
  return (
    <div style={{maxWidth:420,margin:'0 auto',padding:20,fontFamily:'sans-serif'}}>
      <div style={{background:'#0A4FFF',borderRadius:20,padding:20,color:'white',display:'flex',gap:12,alignItems:'center'}}>
        <img src="/logo.png" alt="logo" style={{width:48,height:48,borderRadius:12,background:'white',padding:4}} onError={(e)=>e.target.style.display='none'}/>
        <div><h1 style={{margin:0,fontSize:22}}>Ever_X Datapoint</h1><p style={{margin:0,fontSize:11}}>VTU.ng + Paystack</p></div>
      </div>
      <h3 style={{marginTop:20}}>MTN 1GB - ₦280</h3>
      <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="080..." style={{width:'100%',padding:12,margin:'8px 0',borderRadius:12,border:'1px solid #ccc'}}/>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email@gmail.com" style={{width:'100%',padding:12,margin:'8px 0',borderRadius:12,border:'1px solid #ccc'}}/>
      <button onClick={pay} style={{width:'100%',padding:14,background:'black',color:'white',borderRadius:12,fontWeight:700}}>Pay ₦280 with Paystack</button>
      <p style={{fontSize:10,textAlign:'center',marginTop:8}}>Use valid Paystack key in Vercel env</p>
    </div>
  )
}
