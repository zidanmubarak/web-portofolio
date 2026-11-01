import { chromium } from 'playwright';
const b=await chromium.launch();
const jobs=[
 ['alejandroha','https://alejandroha.com',['.hero','.about','.services','.portfolio','.contact','.footer-wrap','.header','.container','.service-row','.service-visual','.portfolio-orbit__card']],
 ['curtisdesignr','https://curtisdesignr.me',['#scroll-container','nav','#home-hero','.stat-stage','#selected-work-outer','.worked-at','footer','.work-card','.stat-box','.worked-at-row','.preloader']]
];
for (const [name,url,sels] of jobs) for (const vp of [{width:1440,height:900},{width:390,height:844}]) {
  const ctx=await b.newContext({viewport:vp}); const p=await ctx.newPage();
  await p.goto(url,{waitUntil:'domcontentloaded'}); await p.waitForLoadState('networkidle').catch(()=>{}); await p.waitForTimeout(3500);
  const data=await p.evaluate((sels)=>{
    const out={};
    for(const sel of sels){const els=[...document.querySelectorAll(sel)].slice(0,3); if(!els.length) continue;
      out[sel]=els.map(e=>{const s=getComputedStyle(e);const r=e.getBoundingClientRect();return {box:{x:+r.x.toFixed(1),y:+r.y.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1)},pad:`${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,disp:s.display,cols:s.gridTemplateColumns,gap:s.gap,bg:s.backgroundColor,color:s.color,font:s.fontFamily.split(',')[0],size:s.fontSize,lh:s.lineHeight,ls:s.letterSpacing,radius:s.borderRadius,overflow:s.overflow,pos:s.position};});}
    return out;
  },sels);
  console.log('\n###',name,vp.width,JSON.stringify(data,null,1));
  await ctx.close();
}
await b.close();
