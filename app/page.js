'use client'
import { useState } from 'react'

const PLANS = [
  {id:'mtn-1gb', network:'MTN', name:'1GB', price:280, validity:'1 Day'},
  {id:'mtn-2gb', network:'MTN', name:'2GB', price:550, validity:'30 Days'},
  {id:'airtel-1gb', network:'Airtel', name:'1GB', price:280, validity:'30 Days'},
  {id:'glo-1gb', network:'GLO', name:'1GB', price:260, validity:'30 Days'},
]

export default function Page(){
  const [tab,setTab]=useState('data')
  const [phone,setPhone]=useState('')
  const [email,setEmail]=useState('')
  const [selected,setSelected]=useState(PLANS[0])
  const [loading,setLoading]=useState(false)
  const [result,setResult]=useState(null)

  const payWithPaystack=()=>{
    if(!phone||!email){alert('Enter phone & email');return}
    setLoading(true)
    // @ts-ignore
    if(typeof window.PaystackPop==='undefined'){
      const s=document.createElement('script');s.src='https://js.paystack.co/v1/inline.js';s.onload=()=>openPay();document.body.appendChild(s)
    }else openPay()
    function openPay(){
      // @ts-ignore
      const handler=window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY||'pk_test_xxxxxxxx',
        email: email,
        amount: selected.price*100,
        currency:'NGN',
        channels:['card','bank','ussd','mobile_money','bank_transfer'],
        metadata:{phone, plan:selected.name, network:selected.network, custom_fields:[{display_name:'Phone',variable_name:'phone',value:phone}]},
        callback:function(res){
          setLoading(false)
          // Simulate VTU.ng delivery
          setResult({type:tab, token:'1234-5678-9012-3456-7890', plan:selected.name, phone, ref:res.reference, amount:selected.price})
          setTimeout(()=>alert('VTU.ng: Delivered! Token: 1234-5678-9012-3456-7890'),500)
        },
        onClose:function(){setLoading(false); alert('Payment cancelled')}
      });handler.openIframe()
    }
  }

  return (
    <div style={{fontFamily:'sans-serif',maxWidth:420,margin:'0 auto',padding:20}}>
      <h1 style={{color:'#0A4FFF',textAlign:'center'}}>Ever_X Datapoint</h1>
      <p style={{textAlign:'center',fontSize:12}}>Live! Data, Electricity, Cable, Airtime, Education<br/>VTU.ng + Paystack • +2349115683624</p>

      <div style={{display:'flex',gap:6,margin:'20px 0',overflowX:'auto'}}>
        {['data','electricity','cable','airtime','education'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{padding:'8px 12px',borderRadius:20,border:'none',background:tab===t?'#0A4FFF':'#eee',color:tab===t?'white':'black',textTransform:'capitalize'}}>{t}</button>
        ))}
      </div>

      {result?(
        <div style={{background:'#e6ffe6',padding:20,borderRadius:12,textAlign:'center'}}>
          <h2>✅ Payment Success!</h2>
          <p>Ref: {result.ref}</p>
          <p>Phone: {result.phone}</p>
          {result.token&&<div><p>Token:</p><h3 style={{letterSpacing:2}}>{result.token}</h3><button onClick={()=>navigator.clipboard.writeText(result.token)}>Copy Token</button></div>}
          <p>Amount: ₦{result.amount}</p>
          <button onClick={()=>setResult(null)} style={{marginTop:10}}>Buy Again</button>
        </div>
      ):(
        <div style={{background:'white',border:'1px solid #eee',padding:20,borderRadius:12}}>
          <h3>Buy {tab}</h3>
          <label>Select Plan</label>
          <select value={selected.id} onChange={e=>setSelected(PLANS.find(p=>p.id===e.target.value))} style={{width:'100%',padding:10,margin:'10px 0',borderRadius:8}}>
            {PLANS.map(p=><option key={p.id} value={p.id}>{p.network} {p.name} - ₦{p.price} ({p.validity})</option>)}
          </select>
          <input placeholder="Phone number 080..." value={phone} onChange={e=>setPhone(e.target.value)} style={{width:'100%',padding:10,margin:'10px 0',borderRadius:8,border:'1px solid #ccc'}}/>
          <input placeholder="Email for receipt" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:10,margin:'10px 0',borderRadius:8,border:'1px solid #ccc'}}/>
          <button onClick={payWithPaystack} disabled={loading} style={{width:'100%',padding:14,background:'black',color:'white',borderRadius:10,fontWeight:'bold',marginTop:10}}>
            {loading?'Processing...':`Pay ₦${selected.price} with Paystack - Card, Bank, USSD`}
          </button>
          <p style={{fontSize:10,textAlign:'center',marginTop:8}}>🔒 Secure by Paystack • Test Card: 4084084084084081</p>
          <a href="https://wa.me/2349115683624" style={{display:'block',textAlign:'center',marginTop:15,color:'#0A4FFF'}}>WhatsApp: +2349115683624</a>
        </div>
      )}
    </div>
  )
}
