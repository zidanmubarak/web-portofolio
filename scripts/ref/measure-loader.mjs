import { chromium } from 'playwright';
const b=await chromium.launch();
for (const [name,url] of [['alejandroha','https://alejandroha.com'],['curtisdesignr','https://curtisdesignr.me']]) {
  const ctx=await b.newContext({viewport:{width:1440,height:900}}); const p=await ctx.newPage();
  const t0=Date.now();
  await p.goto(url,{waitUntil:'commit',timeout:90000});
  const log=[];
  for(let i=0;i<50;i++){
    const s=await p.evaluate(()=>{
      const pct=[...document.querySelectorAll('body *')].map(e=>[(e.innerText||'').trim(),e]).find(([t])=> /^\d{1,3}%$/.test(t));
      const fixed=[...document.querySelectorAll('body *')].filter(e=>{const st=getComputedStyle(e);const r=e.getBoundingClientRect();return st.position==='fixed'&&r.width>innerWidth*0.5&&r.height>innerHeight*0.5&&st.visibility!=='hidden'&&parseFloat(st.opacity)>0.1;}).map(e=>({cls:String(e.className).slice(0,50),text:(e.innerText||'').replace(/\s+/g,' ').trim().slice(0,60)}));
      const h1=document.querySelector('h1');
      return {pct:pct?pct[0]:null,fixed:fixed.slice(0,3),h1:h1?{txt:(h1.innerText||'').trim().slice(0,30),op:getComputedStyle(h1).opacity,ls:getComputedStyle(h1).letterSpacing}:null,ready:document.readyState};
    }).catch(e=>({err:e.message}));
    log.push({t:Date.now()-t0,...s});
    await p.waitForTimeout(150);
  }
  console.log('\n###',name); for(const l of log) console.log(JSON.stringify(l));
  await ctx.close();
}
await b.close();
