// Sinh cover blog (PNG) — template "B" (brand tím) + motif theo chủ đề:
//  · charts ECharts dark, port faithful quy ước từ src/scripts/blog-charts.ts + codebase sản phẩm
//  · sơ đồ SVG (star-schema/cube/flow/two-path/layers) · icon Lucide fallback theo category
// Lưu SOURCE từng bài ở covers-src/<slug>.html (sửa tay rồi render lại bằng scripts/render-cover.mjs).
// Chạy:  node scripts/gen-covers.mjs [slug ...]      (không slug = toàn bộ)
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(process.cwd());
const BLOG = path.join(ROOT, 'src/content/blog');
const OUT = path.join(ROOT, 'public/blog/covers');
const SRC = path.join(ROOT, 'covers-src');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
fs.mkdirSync(SRC, { recursive: true });

// ── accent presets ──
const VIOLET = { accT: '#C4B5FD', acc: '#8B5CF6', acc2: '#6366F1' };
const GREEN = { accT: '#86EFAC', acc: '#22C55E', acc2: '#16A34A' };
const CYAN = { accT: '#67E8F9', acc: '#22D3EE', acc2: '#0891B2' };
const BLUE = { accT: '#93C5FD', acc: '#3B82F6', acc2: '#2563EB' };
const INDIGO = { accT: '#A5B4FC', acc: '#6366F1', acc2: '#4F46E5' };

// ── category → accent + icon Lucide (fallback) ──
const I = {
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  bar: '<line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>',
  checks: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
  cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
  scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
  book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  // ── icon Lucide riêng cho từng khái niệm (không dùng icon category chung) ──
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  key: '<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  bell: '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  brain: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
  filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  broom: '<path d="m13 11 9-9"/><path d="M14.6 12.6c.8.8.9 2.1.2 3L10 22l-8-8 6.4-4.8c.9-.7 2.2-.6 3 .2Z"/><path d="m6.8 10.4 6.8 6.8"/><path d="m5 17 1.4-1.4"/>',
};
const CAT = {
  'Kiến Thức Nền Tảng':   { ...VIOLET, kicker: 'Kiến thức nền tảng', icon: I.layers },
  'Phân Tích Dữ Liệu':    { ...CYAN, kicker: 'Phân tích dữ liệu', icon: I.bar },
  'Hướng Dẫn Thực Chiến': { ...GREEN, kicker: 'Hướng dẫn thực chiến', icon: I.checks },
  'AI & Công Nghệ':       { accT: '#F0ABFC', acc: '#D946EF', acc2: '#A855F7', kicker: 'AI & công nghệ', icon: I.cpu },
  'So Sánh & Lựa Chọn':   { accT: '#FCD34D', acc: '#F59E0B', acc2: '#FB923C', kicker: 'So sánh & lựa chọn', icon: I.scale },
  'Câu Chuyện & Use Case':{ accT: '#FDA4AF', acc: '#FB7185', acc2: '#F43F5E', kicker: 'Câu chuyện & use case', icon: I.book },
};
const DEF = CAT['Kiến Thức Nền Tảng'];

// ── CHART builders (trả về JS dùng biến `el`, dark, KHÔNG label thừa) ──
const FT = "'Inter'";
const C = {
  growth: (a, mode) => {
    if (mode === 'count4' || mode === 'count4qr') {   // ĐẾM khách, 4 nhóm (New/Expansion +, Contraction/Churn −); count4qr thêm line Quick Ratio
      const qr = mode === 'count4qr';
      return `
   var P=['T10','T11','T12','T1','T2','T3','T4'];
   // Identity: new(t-1)+repeat(t-1)+revive(t-1) = churn(t)+repeat(t)  → repeat(t)=active(t-1)-churn(t)
   var bars=[{c:'#8b5cf6',v:[0,35,47,51,53,58,60]},{c:'#3b82f6',v:[0,4,6,5,7,5,6]},{c:'#22c55e',v:[45,22,18,15,20,16,24]},{c:'#ef4444',v:[0,-10,-14,-20,-18,-22,-19]}];
   var R=5,nC=P.length,tp=[],bn=[];
   for(var c=0;c<nC;c++){var hp=-1,ln=-1;bars.forEach(function(b,i){var x=b.v[c];if(x>0)hp=i;if(x<0)ln=i;});tp[c]=hp;bn[c]=ln;}
   var series=bars.map(function(b,i){return {type:'bar',stack:'g',yAxisIndex:0,barMaxWidth:54,data:b.v.map(function(v,c){var br=0;if(v>0&&tp[c]===i)br=[R,R,0,0];else if(v<0&&bn[c]===i)br=[0,0,R,R];return {value:v,itemStyle:{color:b.c,borderRadius:br}};})};});
   ${qr ? `series.push({type:'line',yAxisIndex:1,smooth:true,symbol:'circle',symbolSize:6,z:6,connectNulls:true,data:[null,2.6,1.71,1.0,1.5,0.95,1.58],lineStyle:{width:3.5,color:'#f97316'},itemStyle:{color:'#f97316'}});` : ''}
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',textStyle:{fontFamily:${FT}},grid:{left:8,right:8,top:20,bottom:24},xAxis:{type:'category',data:P,axisLine:{lineStyle:{color:'rgba(148,163,184,.3)'}},axisTick:{show:false},axisLabel:{color:'#7C8AA3',fontSize:12,fontFamily:${FT}}},yAxis:[{type:'value',show:false},{type:'value',show:false,max:3}],series:series});`;
    }
    return `
   var P=['T10','T11','T12','T1','T2','T3','T4'];
   var bars=[{c:'#8b5cf6',v:[0,573,575,1140,290,452,338]},{c:'#3b82f6',v:[0,323,399,82,215,215,129]},{c:'#4ade80',v:[0,0,0,0,0,14,0]},{c:'#10b981',v:[1450,323,978,0,224,224,66]},{c:'#ec4899',v:[0,-204,-204,-607,-171,-186,-214]},{c:'#ef4444',v:[0,-873,-97,-884,-548,-905,-202]}];
   var R=5,nC=P.length,tp=[],bn=[];
   for(var c=0;c<nC;c++){var hp=-1,ln=-1;bars.forEach(function(b,i){var x=b.v[c];if(x>0)hp=i;if(x<0)ln=i;});tp[c]=hp;bn[c]=ln;}
   var series=bars.map(function(b,i){return {type:'bar',stack:'g',yAxisIndex:0,barMaxWidth:54,data:b.v.map(function(v,c){var br=0;if(v>0&&tp[c]===i)br=[R,R,0,0];else if(v<0&&bn[c]===i)br=[0,0,R,R];return {value:v,itemStyle:{color:b.c,borderRadius:br}};})};});
   series.push({type:'line',yAxisIndex:1,smooth:true,symbol:'circle',symbolSize:6,z:6,data:[0,0.29,4.57,0.06,0.40,1.09,9.19],lineStyle:{width:3.5,color:'#f97316'},itemStyle:{color:'#f97316'}});
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',textStyle:{fontFamily:${FT}},grid:{left:8,right:8,top:20,bottom:24},xAxis:{type:'category',data:P,axisLine:{lineStyle:{color:'rgba(148,163,184,.3)'}},axisTick:{show:false},axisLabel:{color:'#7C8AA3',fontSize:12,fontFamily:${FT}}},yAxis:[{type:'value',show:false},{type:'value',show:false,max:10}],series:series});`;
  },
  cohort: () => `
   var co=['T10','T11','T12','T1','T2','T3','T4'],pe=['1','2','3','4','5','6','7'],y=co.slice().reverse(),pts=[],seed=[15,6,3,1.6,1,0.7,0.4];
   co.forEach(function(c,ci){for(var p=0;p<7-ci;p++){var v=+(seed[p]*(0.7+(ci%3)*0.45)).toFixed(2);pts.push([p,y.indexOf(c),v]);}});
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',textStyle:{fontFamily:${FT}},grid:{left:2,right:2,top:2,bottom:2},xAxis:{type:'category',data:pe,show:false},yAxis:{type:'category',data:y,show:false},visualMap:{show:false,min:0,max:16,inRange:{color:['#064e3b','#047857','#10b981','#34d399']}},series:[{type:'heatmap',data:pts,itemStyle:{borderColor:'#0f172a',borderWidth:3,borderRadius:3},label:{show:true,fontFamily:${FT},fontSize:13,fontWeight:700,color:'#fff',formatter:function(p){return p.value[2]+'%';}}}]});`,
  funnel: (a, stages) => `
   var S=${JSON.stringify(stages || [['Xem SP', 100], ['Thêm giỏ', 44], ['Thanh toán', 33], ['Mua', 25]])},A=['${a.accT}','${a.acc}','${a.acc2}'];
   var data=S.map(function(s,i){var c=i===0?A[0]:(i===S.length-1?A[2]:A[1]);return {value:s[1],name:s[0],itemStyle:{color:c}};});
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',series:[{type:'funnel',left:'8%',right:'8%',top:'4%',bottom:'4%',minSize:'24%',gap:6,sort:'descending',label:{show:true,position:'inside',color:'#0B1120',fontSize:15,fontWeight:800,fontFamily:${FT},formatter:'{b}  {c}%'},itemStyle:{borderWidth:0},data:data}]});`,
  line: (a) => `
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',grid:{left:6,right:6,top:18,bottom:14},xAxis:{type:'category',boundaryGap:false,data:[0,1,2,3,4,5,6,7,8],show:false},yAxis:{type:'value',show:false},series:[{type:'line',smooth:true,symbol:'none',data:[20,30,26,42,38,55,63,58,76],lineStyle:{width:5,color:'${a.acc}'},areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'${a.acc}59'},{offset:1,color:'${a.acc}00'}]}}},{type:'line',smooth:true,symbol:'none',data:[null,null,null,null,null,null,63,72,92],lineStyle:{width:4,color:'${a.accT}',type:'dashed'}}]});`,
  signalNoise: (a) => `
   var noise=[40,58,43,66,47,71,51,75,57,80],base=[42,46,50,54,58,62,66,70,74,80];
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',grid:{left:6,right:16,top:24,bottom:16},xAxis:{type:'category',boundaryGap:false,data:noise.map(function(_,i){return i;}),show:false},yAxis:{type:'value',show:false,min:20,max:100},series:[{type:'line',data:noise,symbol:'none',lineStyle:{width:2,color:'${a.acc}',opacity:.38},z:1},{type:'line',data:base,smooth:true,symbol:'none',lineStyle:{width:5,color:'${a.acc}'},z:2,markPoint:{symbol:'circle',symbolSize:15,itemStyle:{color:'${a.accT}',borderColor:'#0B1120',borderWidth:3},label:{show:false},data:[{coord:[9,80]}]}}]});`,
  twoLine: (a) => `
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',grid:{left:6,right:6,top:20,bottom:16},xAxis:{type:'category',boundaryGap:false,data:[0,1,2,3,4,5,6],show:false},yAxis:{type:'value',show:false},series:[{type:'line',smooth:true,symbol:'none',data:[40,48,55,63,70,78,86],lineStyle:{width:5,color:'${a.acc}'}},{type:'line',smooth:true,symbol:'none',data:[62,53,45,35,26,18,10],lineStyle:{width:5,color:'#F87171'}}]});`,
  seasonal: (a) => `
   var d=[];for(var i=0;i<=36;i++){d.push(+(48+22*Math.sin(i/2.9)+i*0.7).toFixed(2));}
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',grid:{left:6,right:6,top:20,bottom:16},xAxis:{type:'category',data:d.map(function(_,i){return i;}),boundaryGap:false,show:false},yAxis:{type:'value',show:false},series:[{type:'line',data:d,smooth:true,symbol:'none',lineStyle:{width:4.5,color:'${a.acc}'},areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'${a.acc}4d'},{offset:1,color:'${a.acc}00'}]}}}]});`,
  peak: (a) => `
   var v=[18,24,20,30,28,42,90,66,38,30,26,20],hi=6;
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',grid:{left:6,right:6,top:20,bottom:14},xAxis:{type:'category',data:v.map(function(_,i){return i;}),show:false},yAxis:{type:'value',show:false},series:[{type:'bar',barWidth:'62%',data:v.map(function(x,i){return {value:x,itemStyle:{borderRadius:[4,4,0,0],color:i===hi?'#FBBF24':'${a.acc}'}};})}]});`,
  decay: (a) => `
   function dc(s){var o=[],v=100;for(var i=0;i<8;i++){o.push(+v.toFixed(1));v*=s;}return o;}
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',grid:{left:6,right:6,top:18,bottom:16},xAxis:{type:'category',boundaryGap:false,data:[0,1,2,3,4,5,6,7],show:false},yAxis:{type:'value',show:false,min:0,max:100},series:[{type:'line',data:dc(0.78),smooth:true,symbol:'none',lineStyle:{width:4.5,color:'${a.acc}'},areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'${a.acc}45'},{offset:1,color:'${a.acc}00'}]}}},{type:'line',data:dc(0.66),smooth:true,symbol:'none',lineStyle:{width:3,color:'${a.accT}',opacity:.7}},{type:'line',data:dc(0.55),smooth:true,symbol:'none',lineStyle:{width:3,color:'${a.acc2}',opacity:.6}}]});`,
  waterfall: (a, items, mode) => {
    const posC = mode === 'cost' ? '#ef4444' : '#10b981';   // cost: cột tăng = đỏ
    const negC = mode === 'savings' ? '#22c55e' : '#ef4444'; // savings: cột giảm = xanh
    return `
   var R=5,items=${JSON.stringify(items || [{ l: 'Lợi nhuận', v: 120, t: 1 }, { l: 'Phải thu', v: -70 }, { l: 'Tồn kho', v: -40 }, { l: 'Trả trước', v: 25 }, { l: 'Tiền mặt', v: 35, t: 1 }])},X=[],B=[],P=[],N=[],T=[],run=0;
   items.forEach(function(it){X.push(it.l);if(it.t){B.push(0);P.push('-');N.push('-');T.push({value:it.v,itemStyle:{color:'#2563eb',borderRadius:[R,R,0,0]}});run=it.v;}else if(it.v>=0){B.push(run);P.push(it.v);N.push('-');T.push('-');run+=it.v;}else{run+=it.v;B.push(run);P.push('-');N.push(Math.abs(it.v));T.push('-');}});
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',textStyle:{fontFamily:${FT}},grid:{left:6,right:6,top:22,bottom:30},xAxis:{type:'category',data:X,axisLine:{lineStyle:{color:'rgba(148,163,184,.3)'}},axisTick:{show:false},axisLabel:{color:'#9AA7BD',fontFamily:${FT},fontSize:12,fontWeight:600,interval:0}},yAxis:{type:'value',show:false},series:[{type:'bar',stack:'w',silent:true,itemStyle:{color:'transparent'},data:B,barMaxWidth:54},{type:'bar',stack:'w',barMaxWidth:54,itemStyle:{color:'${posC}',borderRadius:[R,R,0,0]},data:P},{type:'bar',stack:'w',barMaxWidth:54,itemStyle:{color:'${negC}',borderRadius:[0,0,R,R]},data:N},{type:'bar',stack:'w',barMaxWidth:54,itemStyle:{color:'#2563eb',borderRadius:[R,R,0,0]},data:T}]});`;
  },
  scatter: (a, mode = 'regression') => `
   var MODE='${mode}';
   var reg=[[12,20],[20,28],[28,26],[35,44],[40,40],[52,55],[60,64],[68,58],[75,80]];
   var clusters=[[16,24],[22,30],[19,36],[27,27],[24,40],[34,64],[40,70],[37,78],[45,66],[42,58],[64,32],[70,42],[74,34],[68,48],[78,40]];
   var outl=[[20,30],[27,37],[31,30],[24,44],[35,40],[39,46],[30,52],[33,34],[26,28]];
   var opt={animation:false,backgroundColor:'transparent',grid:{left:14,right:18,top:16,bottom:16},xAxis:{type:'value',show:false,min:0,max:90},yAxis:{type:'value',show:false,min:0,max:100}};
   if(MODE==='regression')opt.series=[{type:'line',data:reg,smooth:true,symbol:'none',silent:true,lineStyle:{color:'${a.acc}80',width:2,type:'dashed'}},{type:'scatter',data:reg,symbolSize:18,itemStyle:{color:'${a.acc}',opacity:.85}}];
   else if(MODE==='spurious')opt.series=[{type:'scatter',data:reg,symbolSize:17,itemStyle:{color:'${a.acc}',opacity:.55}},{type:'line',data:[[10,28],[80,62]],symbol:'none',silent:true,lineStyle:{color:'#F87171',width:2.5,type:'dashed'}}];
   else if(MODE==='clusters')opt.series=[{type:'scatter',data:clusters,symbolSize:17,itemStyle:{color:'${a.acc}',opacity:.85}}];
   else opt.series=[{type:'scatter',data:outl,symbolSize:16,itemStyle:{color:'${a.acc}',opacity:.65}},{type:'scatter',data:[[80,90]],symbolSize:26,itemStyle:{color:'#F87171',shadowColor:'#F87171',shadowBlur:16}}];
   echarts.init(el).setOption(opt);`,
  radar: (a, names, vals) => `
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',radar:{indicator:${JSON.stringify((names || ['Happiness', 'Engagement', 'Adoption', 'Retention', 'Task']).map(n => ({ name: n, max: 100 })))},radius:'62%',center:['50%','52%'],axisName:{color:'#9AA7BD',fontFamily:${FT},fontSize:13,fontWeight:600},splitLine:{lineStyle:{color:'rgba(148,163,184,.25)'}},splitArea:{areaStyle:{color:['rgba(255,255,255,.02)','rgba(255,255,255,.05)']}},axisLine:{lineStyle:{color:'rgba(148,163,184,.25)'}}},series:[{type:'radar',data:[{value:${JSON.stringify(vals || [80, 68, 74, 60, 72])},itemStyle:{color:'${a.acc}'},lineStyle:{width:2.5,color:'${a.acc}'},areaStyle:{color:'${a.acc}40'}}]}]});`,
  bar: (a, mode = 'plain') => {
    const grad = `{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'${a.accT}'},{offset:1,color:'${a.acc2}'}]}`;
    let series;
    if (mode === 'target') // cột + ngưỡng mục tiêu; dưới ngưỡng = mờ (metric sliced by dimension + KPI)
      series = `[{type:'bar',barWidth:'56%',data:[70,48,92,60,84,40].map(function(v){return {value:v,itemStyle:{borderRadius:[6,6,0,0],color:v>=65?${grad}:'color-mix(in srgb,#94A3B8 45%,transparent)'}};}),markLine:{silent:true,symbol:'none',lineStyle:{color:'#F87171',width:2.5,type:'dashed'},label:{show:true,position:'insideEndTop',color:'#F87171',fontFamily:${FT},fontWeight:700,fontSize:13,formatter:'Mục tiêu'},data:[{yAxis:65}]}}]`;
    else if (mode === 'delta') // MoM/YoY: có kỳ tăng có kỳ giảm (bẫy: không phải lúc nào cũng lên)
      series = `[{type:'bar',barWidth:'56%',data:[52,74,44,68,34,86].map(function(v,i){var down=(i===2||i===4);return {value:v,itemStyle:{borderRadius:[6,6,0,0],color:down?{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'#fca5a5'},{offset:1,color:'#ef4444'}]}:${grad}}};})}]`;
    else if (mode === 'weighted') // bình quân giản đơn (đỏ) vs có trọng số (accent) lệch nhau
      series = `[{type:'bar',barWidth:'52%',data:[30,42,90,36,78],itemStyle:{borderRadius:[6,6,0,0],color:${grad}},markLine:{silent:true,symbol:'none',label:{show:false},data:[{yAxis:55,lineStyle:{color:'#F87171',width:2.5,type:'dashed'}},{yAxis:73,lineStyle:{color:'${a.accT}',width:2.5,type:'dashed'}}]}}]`;
    else
      series = `[{type:'bar',data:[40,62,55,80,72,95],barWidth:'56%',itemStyle:{borderRadius:[6,6,0,0],color:${grad}}}]`;
    return `echarts.init(el).setOption({animation:false,backgroundColor:'transparent',grid:{left:6,right:6,top:24,bottom:14},xAxis:{type:'category',data:[0,1,2,3,4,5],show:false},yAxis:{type:'value',show:false,max:105},series:${series}});`;
  },
  gauge: (a) => `
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',series:[{type:'gauge',startAngle:210,endAngle:-30,min:0,max:100,progress:{show:true,width:22,itemStyle:{color:'${a.acc}'}},axisLine:{lineStyle:{width:22,color:[[1,'#23304d']]}},pointer:{show:false},axisTick:{show:false},splitLine:{show:false},axisLabel:{show:false},anchor:{show:false},title:{show:false},detail:{valueAnimation:false,fontSize:56,fontWeight:900,fontFamily:${FT},color:'#fff',offsetCenter:[0,0],formatter:'{value}%'},data:[{value:70}]}]});`,
  threshold: () => `
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',grid:{left:6,right:6,top:26,bottom:16},xAxis:{type:'category',boundaryGap:false,data:[0,1,2,3,4,5,6,7],show:false},yAxis:{type:'value',show:false,min:0,max:100},series:[{type:'line',smooth:true,symbol:'circle',symbolSize:8,data:[84,88,80,66,50,30,24,17],lineStyle:{width:4.5,color:'#6366f1'},itemStyle:{color:'#818cf8'},markLine:{silent:true,symbol:'none',lineStyle:{color:'#ef4444',width:2.5,type:'dashed'},label:{show:true,position:'insideStartTop',color:'#f87171',fontFamily:${FT},fontWeight:700,fontSize:14,formatter:'Ngưỡng cảnh báo'},data:[{yAxis:45}]},markPoint:{symbol:'circle',symbolSize:18,itemStyle:{color:'#ef4444',borderColor:'#0F172A',borderWidth:3},label:{show:false},data:[{coord:[5,30]}]}}]});`,
  pareto: (a) => `
   var v=[42,26,14,8,5,3,2],cum=[],s=0,tot=v.reduce(function(x,y){return x+y;},0);v.forEach(function(x){s+=x;cum.push(+(s/tot*100).toFixed(0));});
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',textStyle:{fontFamily:${FT}},grid:{left:6,right:6,top:22,bottom:16},xAxis:{type:'category',data:v.map(function(_,i){return i;}),show:false},yAxis:[{type:'value',show:false},{type:'value',show:false,max:100}],series:[{type:'bar',data:v,barWidth:'62%',itemStyle:{borderRadius:[5,5,0,0],color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'${a.accT}'},{offset:1,color:'${a.acc2}'}]}}},{type:'line',yAxisIndex:1,smooth:true,symbol:'circle',symbolSize:6,data:cum,lineStyle:{width:3.5,color:'#F59E0B'},itemStyle:{color:'#F59E0B'},markLine:{silent:true,symbol:'none',lineStyle:{color:'rgba(245,158,11,.5)',type:'dashed'},label:{show:false},data:[{yAxis:80}]}}]});`,
  distribution: (a, shape = 'normal') => `
   var xs=[],ys=[],y2=[],SH='${shape}';
   for(var i=0;i<=48;i++){var x=(i-24)/7,v;
     if(SH==='skewed'){var t=i/48*4.2;v=t*t*Math.exp(-t)*180;}
     else if(SH==='bimodal'){v=(Math.exp(-Math.pow((i-15)/5.5,2)/2)+0.82*Math.exp(-Math.pow((i-34)/5.5,2)/2))*100;}
     else{v=Math.exp(-x*x/2)*100;}
     xs.push(i);ys.push(+v.toFixed(2));
     if(SH==='sample')y2.push(+(Math.exp(-Math.pow((i-24)/4,2)/2)*100).toFixed(2));}
   var mark=SH==='bimodal'||SH==='sample'?[]:(SH==='skewed'?[{xAxis:9},{xAxis:17}]:SH==='spread'?[{xAxis:17},{xAxis:31}]:SH==='percentile'?[{xAxis:24},{xAxis:33},{xAxis:41}]:SH==='tail'?[{xAxis:34}]:[{xAxis:24}]);
   var area={type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'${a.acc}6b'},{offset:1,color:'${a.acc}00'}]};
   var series=[{type:'line',data:ys,smooth:true,symbol:'none',lineStyle:{width:4,color:'${a.acc}'},areaStyle:{color:area},markLine:{silent:true,symbol:'none',lineStyle:{color:'${a.accT}',width:2,type:'dashed'},label:{show:false},data:mark}}];
   if(SH==='sample')series.push({type:'line',data:y2,smooth:true,symbol:'none',lineStyle:{width:3.5,color:'${a.accT}'},areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'${a.accT}55'},{offset:1,color:'${a.accT}00'}]}}});
   if(SH==='tail')series.push({type:'line',data:xs.map(function(_,ii){return ii>=34?ys[ii]:null;}),smooth:true,symbol:'none',lineStyle:{width:0},areaStyle:{color:'#F8717155'},z:1});
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',grid:{left:6,right:6,top:22,bottom:20},xAxis:{type:'category',data:xs,show:false},yAxis:{type:'value',show:false},series:series});`,
  rfmGrid: () => `
   var pts=[];for(var r=0;r<5;r++)for(var c=0;c<5;c++){pts.push([c,r,(r*1.4+c*1.1)]);}
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',grid:{left:4,right:4,top:4,bottom:4},xAxis:{type:'category',data:[1,2,3,4,5],show:false},yAxis:{type:'category',data:[1,2,3,4,5],show:false},visualMap:{show:false,min:0,max:10,inRange:{color:['#312e81','#4f46e5','#8b5cf6','#c4b5fd']}},series:[{type:'heatmap',data:pts,itemStyle:{borderColor:'#0B1120',borderWidth:4,borderRadius:6}}]});`,
  ltv: (a) => `
   var P=['M1','M2','M3','M4','M5','M6'],inc=[100,70,52,40,32,26],cum=[],s=0;inc.forEach(function(x){s+=x;cum.push(s);});
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',textStyle:{fontFamily:${FT}},grid:{left:6,right:6,top:22,bottom:18},xAxis:{type:'category',data:P,show:false},yAxis:[{type:'value',show:false},{type:'value',show:false}],series:[{type:'bar',data:inc,barWidth:'54%',itemStyle:{borderRadius:[5,5,0,0],color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'${a.accT}'},{offset:1,color:'${a.acc2}'}]}}},{type:'line',yAxisIndex:1,smooth:true,symbol:'circle',symbolSize:6,data:cum,lineStyle:{width:3.5,color:'${a.acc}'},itemStyle:{color:'${a.acc}'}}]});`,
  // survival: nhiều đường sống sót, có 1 đường chững lại (đi ngang) = nhóm giữ chân tốt
  survival: (a) => `
   function sv(rate,fl){var o=[],v=100;for(var i=0;i<9;i++){o.push(+Math.max(fl,v).toFixed(1));v=fl+(v-fl)*rate;}return o;}
   var s1=sv(0.74,58),s2=sv(0.6,28),s3=sv(0.5,10);
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',grid:{left:6,right:6,top:18,bottom:16},xAxis:{type:'category',data:[0,1,2,3,4,5,6,7,8],boundaryGap:false,show:false},yAxis:{type:'value',show:false,min:0,max:100},series:[{type:'line',data:s1,smooth:true,symbol:'none',lineStyle:{width:4.5,color:'${a.acc}'},areaStyle:{color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'${a.acc}40'},{offset:1,color:'${a.acc}00'}]}}},{type:'line',data:s2,smooth:true,symbol:'none',lineStyle:{width:3,color:'${a.accT}',opacity:.75}},{type:'line',data:s3,smooth:true,symbol:'none',lineStyle:{width:3,color:'${a.acc2}',opacity:.65}}]});`,
  // vintage: các đường tích luỹ đi LÊN, mỗi lứa plateau ở mức khác nhau
  vintage: (a) => `
   function vt(k){var o=[],v=0;for(var i=0;i<9;i++){o.push(+v.toFixed(1));v=v+(k-v)*0.36;}return o;}
   var v1=vt(90),v2=vt(66),v3=vt(42);
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',grid:{left:6,right:6,top:18,bottom:16},xAxis:{type:'category',data:[0,1,2,3,4,5,6,7,8],boundaryGap:false,show:false},yAxis:{type:'value',show:false,min:0,max:100},series:[{type:'line',data:v1,smooth:true,symbol:'none',lineStyle:{width:4.5,color:'${a.acc}'}},{type:'line',data:v2,smooth:true,symbol:'none',lineStyle:{width:3.5,color:'${a.accT}',opacity:.8}},{type:'line',data:v3,smooth:true,symbol:'none',lineStyle:{width:3.5,color:'${a.acc2}',opacity:.7}}]});`,
  // roll-rate: ma trận chuyển trạng thái, đậm dần theo đường chéo (trượt về xấu)
  rollrate: (a) => `
   var M=[[66,22,7,3,2],[12,50,25,9,4],[5,13,44,28,10],[3,6,15,40,36],[1,3,5,11,80]],pts=[];
   for(var r=0;r<5;r++)for(var c=0;c<5;c++){var v=M[r][c],col;
     if(c===r)col='#FDE047';        /* chéo: đứng yên = vàng neon */
     else if(c>r)col='#FF2D75';     /* tiến tới trạng thái xấu = đỏ neon */
     else col='#2DFB77';            /* lùi về trạng thái tốt = xanh neon */
     pts.push({value:[c,4-r,v],itemStyle:{color:col,opacity:v<3?0.16:(0.4+v/100*0.6),shadowColor:col,shadowBlur:v>=20?12:0}});}
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',textStyle:{fontFamily:${FT}},grid:{left:2,right:2,top:2,bottom:2},xAxis:{type:'category',data:[0,1,2,3,4],show:false},yAxis:{type:'category',data:[0,1,2,3,4],show:false},series:[{type:'heatmap',data:pts,itemStyle:{borderColor:'#0b1120',borderWidth:3,borderRadius:4},label:{show:true,fontFamily:${FT},fontSize:12,fontWeight:800,color:'#0b1120',formatter:function(p){return p.value[2]>=3?p.value[2]:'';}}}]});`,
  // CLV theo phân khúc + trần CAC (được phép chi bao nhiêu để có 1 khách)
  clvcac: (a) => `
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',textStyle:{fontFamily:${FT}},grid:{left:10,right:20,top:34,bottom:18},xAxis:{type:'category',data:['VIP','Thân thiết','Thường','Mới'],axisLine:{lineStyle:{color:'rgba(148,163,184,.3)'}},axisTick:{show:false},axisLabel:{color:'#9AA7BD',fontFamily:${FT},fontSize:12,fontWeight:600}},yAxis:{type:'value',show:false,max:118},series:[{type:'bar',data:[95,68,42,24],barWidth:'52%',itemStyle:{borderRadius:[6,6,0,0],color:{type:'linear',x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:'${a.accT}'},{offset:1,color:'${a.acc2}'}]}},markLine:{silent:true,symbol:'none',lineStyle:{color:'#F87171',width:2.5,type:'dashed'},label:{show:true,position:'insideEndTop',color:'#F87171',backgroundColor:'rgba(11,17,32,0.85)',padding:[3,7],borderRadius:5,fontFamily:${FT},fontWeight:700,fontSize:13,formatter:'Trần CAC'},data:[{yAxis:52}]}}]});`,
  // ABC: cột giảm dần tô theo dải A/B/C + nền + line tích luỹ (80/20)
  abc: (a) => `
   var v=[42,26,14,8,5,3,2],cum=[],s=0,tot=v.reduce(function(x,y){return x+y;},0);v.forEach(function(x){s+=x;cum.push(+(s/tot*100).toFixed(0));});
   var col=['#34d399','#34d399','#fbbf24','#fbbf24','#94a3b8','#94a3b8','#94a3b8'];
   echarts.init(el).setOption({animation:false,backgroundColor:'transparent',textStyle:{fontFamily:${FT}},grid:{left:6,right:6,top:30,bottom:14},xAxis:{type:'category',data:v.map(function(_,i){return i;}),show:false},yAxis:[{type:'value',show:false},{type:'value',show:false,max:100}],series:[{type:'bar',barWidth:'62%',z:3,data:v.map(function(x,i){return {value:x,itemStyle:{borderRadius:[4,4,0,0],color:col[i]}};}),markArea:{silent:true,z:0,itemStyle:{color:'transparent'},label:{show:true,position:'insideTop',fontWeight:800,fontFamily:${FT},fontSize:16},data:[[{xAxis:-0.5,label:{color:'#34d399',formatter:'A'}},{xAxis:1.5}],[{xAxis:1.5,label:{color:'#fbbf24',formatter:'B'}},{xAxis:3.5}],[{xAxis:3.5,label:{color:'#94a3b8',formatter:'C'}},{xAxis:6.5}]]}},{type:'line',yAxisIndex:1,smooth:true,symbol:'circle',symbolSize:5,data:cum,lineStyle:{width:3,color:'#f59e0b'},itemStyle:{color:'#f59e0b'}}]});`,
};

// ── SVG diagrams (dùng biến CSS --accT / --acc) ──
const NODE = 'fill:color-mix(in srgb,var(--acc) 24%,#0B1120);stroke:color-mix(in srgb,var(--accT) 50%,transparent);stroke-width:2';
const SVGD = {
  star: (mode) => {
    const snow = mode === 'snowflake';
    const dims = [['30', '56', 'Sản phẩm'], ['290', '56', 'Khách'], ['30', '320', 'Thời gian'], ['290', '320', 'Kênh']];
    const dimBoxes = dims.map(([x, y, t]) => `<rect x="${x}" y="${y}" width="120" height="60" rx="12" style="${NODE}"/><text x="${+x + 16}" y="${+y + 26}" class="ts">DIM</text><text x="${+x + 16}" y="${+y + 48}" class="tl" style="font-size:15px">${t}</text>`).join('');
    const snowNodes = snow ? `<line x1="90" y1="56" x2="82" y2="36" class="lnk"/><rect x="28" y="6" width="108" height="30" rx="8" style="${NODE};opacity:.72"/><text x="42" y="26" class="tl" style="font-size:12px">Nhóm SP</text>
     <line x1="350" y1="380" x2="358" y2="400" class="lnk"/><rect x="304" y="400" width="108" height="30" rx="8" style="${NODE};opacity:.72"/><text x="318" y="420" class="tl" style="font-size:12px">Chiến dịch</text>` : '';
    return `<svg viewBox="0 0 440 440" class="md"><line x1="220" y1="220" x2="90" y2="86" class="lnk"/><line x1="220" y1="220" x2="350" y2="86" class="lnk"/><line x1="220" y1="220" x2="90" y2="350" class="lnk"/><line x1="220" y1="220" x2="350" y2="350" class="lnk"/>
     <rect x="160" y="182" width="120" height="76" rx="14" style="fill:color-mix(in srgb,var(--acc) 34%,#0B1120);stroke:var(--accT);stroke-width:2.5"/><text x="178" y="214" class="ts">FACT</text><text x="178" y="240" class="tl">Đơn hàng</text>
     ${dimBoxes}${snowNodes}</svg>`;
  },
  cube: () => `<svg viewBox="0 0 440 440" class="md"><g transform="translate(220,230)">
   <polygon points="0,-150 130,-75 0,0 -130,-75" style="fill:color-mix(in srgb,var(--accT) 30%,#0B1120);stroke:var(--accT);stroke-width:2.5"/>
   <polygon points="-130,-75 0,0 0,150 -130,75" style="fill:color-mix(in srgb,var(--acc) 26%,#0B1120);stroke:var(--accT);stroke-width:2.5"/>
   <polygon points="130,-75 0,0 0,150 130,75" style="fill:color-mix(in srgb,var(--acc) 14%,#0B1120);stroke:var(--accT);stroke-width:2.5"/>
   <line x1="-87" y1="-50" x2="-87" y2="100" class="lnk"/><line x1="-43" y1="-25" x2="-43" y2="125" class="lnk"/><line x1="87" y1="-50" x2="87" y2="100" class="lnk"/><line x1="43" y1="-25" x2="43" y2="125" class="lnk"/><line x1="-130" y1="-25" x2="0" y2="50" class="lnk"/><line x1="0" y1="50" x2="130" y2="-25" class="lnk"/></g></svg>`,
  flow: () => `<svg viewBox="0 0 440 440" class="md">${[0,1,2].map(i=>`<rect x="40" y="${70+i*120}" width="360" height="84" rx="16" style="${NODE}"/><text x="64" y="${108+i*120}" class="ts">BƯỚC ${i+1}</text><text x="64" y="${134+i*120}" class="tl" style="font-size:17px">${['Nguồn dữ liệu','Lớp ngữ nghĩa','Câu trả lời'][i]}</text>`).join('')}<path d="M220 154 L220 190" class="arr"/><path d="M220 274 L220 310" class="arr"/></svg>`,
  twoPath: () => `<svg viewBox="0 0 440 440" class="md"><circle cx="60" cy="220" r="16" style="fill:color-mix(in srgb,var(--acc) 30%,#0B1120);stroke:var(--accT);stroke-width:2.5"/>
   <path d="M76 212 C 170 150, 230 120, 330 110" class="lnk" fill="none" stroke-width="3"/><path d="M76 228 C 170 290, 230 320, 330 330" class="lnk" fill="none" stroke-width="3" stroke-dasharray="2 9"/>
   <rect x="320" y="74" width="116" height="74" rx="14" style="fill:color-mix(in srgb,var(--acc) 26%,#0B1120);stroke:var(--accT);stroke-width:2.5"/><text x="338" y="104" class="ts" style="fill:var(--accT)">NHANH</text><text x="338" y="128" class="tl" style="font-size:15px">Hỏi &amp; đáp</text>
   <rect x="320" y="296" width="116" height="74" rx="14" style="${NODE};opacity:.65"/><text x="338" y="326" class="ts" style="fill:#94A3B8">CHẬM</text><text x="338" y="350" class="tl" style="font-size:15px;fill:#94A3B8">Làm tay</text></svg>`,
  layers: () => `<svg viewBox="0 0 440 440" class="md"><g transform="translate(220,220)">${[0,1,2,3].map(i=>`<polygon points="${[-150,150].map(x=>x+','+(-90+i*60-x*0.0)).join(' ')} ${[150,-150].map(x=>x+','+(-90+i*60+45)).join(' ')}" style="fill:color-mix(in srgb,var(--acc) ${28-i*5}%,#0B1120);stroke:var(--accT);stroke-width:2"/>`).join('')}</g></svg>`,
  // hội tụ N nguồn → 1 định nghĩa (semantic-layer, mot-nguon, hợp nhất, chuỗi FnB)
  converge: (lbls = ['Sales', 'Finance', 'Marketing', 'Kho', 'CRM'], one = ['1 ĐỊNH NGHĨA', '= 1 sự thật']) => {
    const n = lbls.length, ch = n > 6 ? 40 : 52, gap = n > 5 ? 14 : 22, fz = n > 5 ? 14 : 16;
    const tot = n * ch + (n - 1) * gap, y0 = 220 - tot / 2;                       // căn giữa quanh tâm 220 theo số lượng
    const chips = lbls.map((L, i) => { const y = y0 + i * (ch + gap); return `<rect x="0" y="${y}" width="152" height="${ch}" rx="10" style="${NODE}"/><text x="76" y="${y + ch / 2 + 6}" class="tl" text-anchor="middle" style="font-size:${fz}px">${L}</text>`; }).join('');
    const arrows = lbls.map((_, i) => { const y = y0 + i * (ch + gap) + ch / 2; return `<path d="M154 ${y} C224 ${y} 244 220 300 220" class="lnk" fill="none" stroke-width="3" marker-end="url(#cv)"/>`; }).join('');
    return `<svg viewBox="0 0 440 440" class="md"><defs><marker id="cv" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 z" fill="var(--accT)"/></marker></defs>
     ${chips}${arrows}
     <rect x="300" y="174" width="134" height="92" rx="16" style="fill:#0B1220;stroke:var(--accT);stroke-width:2.5"/><text x="367" y="210" class="ts" text-anchor="middle" style="fill:var(--accT);font-size:13px">${one[0]}</text><text x="367" y="238" class="tl" text-anchor="middle" style="font-size:15px">${one[1]}</text></svg>`;
  },
  // cầu thang bậc tăng dần (thang đo, mức độ trưởng thành)
  staircase: (lbls = ['Định danh', 'Thứ bậc', 'Khoảng', 'Tỉ lệ'], hi) => { const H = (hi == null ? lbls.length - 1 : hi); return `<svg viewBox="0 0 440 440" class="md">${lbls.map((L, i) => { const w = 92, x = 12 + i * (w + 10), h = 96 + i * 78, y = 404 - h, on = i === H; const lines = String(L).split('\n'); const txt = lines.map((ln, li) => `<tspan x="${x + w / 2}" dy="${li === 0 ? 0 : 15}">${ln}</tspan>`).join(''); return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" style="fill:color-mix(in srgb,var(--acc) ${on ? 46 : 13 + i * 6}%,#0B1120);stroke:${on ? 'var(--accT)' : 'color-mix(in srgb,var(--accT) 40%,transparent)'};stroke-width:${on ? 3.5 : 2}${on ? ';filter:drop-shadow(0 0 10px color-mix(in srgb,var(--acc) 55%,transparent))' : ''}"/><text x="${x + w / 2}" y="${y - (lines.length > 1 ? 28 : 14)}" class="ts" text-anchor="middle" style="font-size:12px;fill:${on ? 'var(--accT)' : '#94A3B8'}">${txt}</text>`; }).join('')}<line x1="8" y1="406" x2="426" y2="406" class="lnk"/></svg>`; },
  // đồng xu 2 mặt (business vs customer)
  coin: (l = 'Kinh doanh', r = 'Khách hàng') => `<svg viewBox="0 0 440 440" class="md"><g transform="translate(220,218)"><circle r="162" style="fill:#0B1220;stroke:var(--accT);stroke-width:3"/><path d="M0 -162 A162 162 0 0 0 0 162 Z" style="fill:color-mix(in srgb,var(--acc) 20%,transparent)"/><line x1="0" y1="-162" x2="0" y2="162" style="stroke:color-mix(in srgb,var(--accT) 55%,transparent);stroke-width:2;stroke-dasharray:6 8"/><text x="-82" y="0" class="tl" text-anchor="middle" style="font-size:18px">${l}</text><text x="82" y="0" class="tl" text-anchor="middle" style="font-size:18px;fill:var(--accT)">${r}</text></g></svg>`,
  // 1 nguồn toả ra N (dimension, scenario)
  fanout: (lbls = ['Nhánh A', 'Nhánh B', 'Nhánh C', 'Nhánh D'], src = '1 nguồn') => {
    const n = lbls.length, ch = 54, gap = n > 4 ? 16 : 30, tot = n * ch + (n - 1) * gap, y0 = 220 - tot / 2;
    const branches = lbls.map((L, i) => { const y = y0 + i * (ch + gap), yc = y + ch / 2; return `<path d="M134 220 C210 220 232 ${yc} 300 ${yc}" class="lnk" fill="none" stroke-width="3" marker-end="url(#fo)"/><rect x="300" y="${y}" width="134" height="${ch}" rx="10" style="${NODE}"/><text x="367" y="${yc + 6}" class="tl" text-anchor="middle" style="font-size:15px">${L}</text>`; }).join('');
    return `<svg viewBox="0 0 440 440" class="md"><defs><marker id="fo" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 z" fill="var(--accT)"/></marker></defs>
     <rect x="6" y="184" width="128" height="72" rx="16" style="fill:#0B1220;stroke:var(--accT);stroke-width:2.5"/><text x="70" y="225" class="tl" text-anchor="middle" style="font-size:15px">${src}</text>
     ${branches}</svg>`;
  },
  // hai cột so sánh + huy hiệu VS (mọi bài So Sánh)
  // hai panel nghiêng đối đầu + badge VS phát sáng + hàng "tính năng"; win='l'|'r' để nêu bên hơn (✓ sáng / ✗ mờ), null = trung tính
  versus: (l = ['Bên A', ''], r = ['Bên B', ''], win = null) => {
    const side = (lbl, cx, px, rot, lose, isR) => {
      const pf = lose ? 'fill:color-mix(in srgb,#64748B 13%,#0B1120);stroke:color-mix(in srgb,#94A3B8 38%,transparent);stroke-width:2'
        : 'fill:color-mix(in srgb,var(--acc) 22%,#0B1120);stroke:var(--accT);stroke-width:2.5';
      const dot = lose ? '#64748B' : 'var(--accT)';
      const barF = lose ? 'color-mix(in srgb,#94A3B8 20%,transparent)' : 'color-mix(in srgb,var(--acc) 55%,transparent)';
      const tcol = lose ? '#CBD5E1' : (isR ? 'var(--accT)' : '#fff');
      let chip = '';
      if (win) chip = lose
        ? `<circle cx="${cx}" cy="116" r="21" style="fill:color-mix(in srgb,#EF4444 22%,#0B1120);stroke:#F87171;stroke-width:2"/><path d="M${cx - 8} 108 l16 16 M${cx + 8} 108 l-16 16" style="stroke:#F87171;stroke-width:3;stroke-linecap:round"/>`
        : `<circle cx="${cx}" cy="116" r="21" style="fill:color-mix(in srgb,var(--acc) 34%,#0B1120);stroke:var(--accT);stroke-width:2"/><path d="M${cx - 9} 116 l7 8 12 -15" style="fill:none;stroke:var(--accT);stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round"/>`;
      const ty = win ? 190 : 166, ry = win ? 258 : 232;
      const txt = (Array.isArray(lbl) ? lbl.join(' ') : lbl);
      const fz = txt.length <= 8 ? 23 : txt.length <= 13 ? 20 : txt.length <= 18 ? 16 : 14;
      const rows = [0, 1, 2].map(i => `<circle cx="${cx - 56}" cy="${ry + i * 38}" r="5" style="fill:${dot}"/><rect x="${cx - 40}" y="${ry - 5 + i * 38}" width="92" height="9" rx="4" style="fill:${barF}"/>`).join('');
      return `<g transform="rotate(${rot} ${cx} 220)"><rect x="${px}" y="72" width="184" height="296" rx="20" style="${pf}"/>${chip}<text x="${cx}" y="${ty}" text-anchor="middle" class="tl" style="font-size:${fz}px;fill:${tcol}">${txt}</text>${rows}</g>`;
    };
    return `<svg viewBox="0 0 440 440" class="md">
     ${side(l, 96, 4, -5, win === 'r', false)}
     ${side(r, 344, 252, 5, win === 'l', true)}
     <circle cx="220" cy="220" r="50" style="fill:#0B1120;stroke:var(--accT);stroke-width:3.5;filter:drop-shadow(0 0 16px color-mix(in srgb,var(--acc) 75%,transparent))"/>
     <text x="220" y="233" text-anchor="middle" style="fill:#fff;font-weight:900;font-size:30px;font-family:Inter">VS</text></svg>`;
  },
  // pipeline khối dọc + mũi tên (ETL/ELT, text2sql layers, RAG)
  pipeline: (steps = ['Nguồn', 'Biến đổi', 'Nạp']) => `<svg viewBox="0 0 440 440" class="md">${steps.map((S, i) => { const n = steps.length, h = 62, gap = 30, tot = n * h + (n - 1) * gap, y0 = (440 - tot) / 2, y = y0 + i * (h + gap); return `<rect x="56" y="${y}" width="328" height="${h}" rx="14" style="${NODE}"/><text x="220" y="${y + h / 2 + 7}" class="tl" text-anchor="middle" style="font-size:19px">${S}</text>${i < n - 1 ? `<path d="M220 ${y + h + 3} L220 ${y + h + gap - 9}" class="lnk" stroke-width="3"/><path d="M213 ${y + h + gap - 15} L220 ${y + h + gap - 5} L227 ${y + h + gap - 15}" style="fill:none;stroke:var(--accT);stroke-width:3"/>` : ''}`; }).join('')}</svg>`,
  // khiên bảo vệ + hàng dữ liệu + dấu tick (bảo mật/quyền/governance)
  shield: () => `<svg viewBox="0 0 440 440" class="md">
   ${[0, 1, 2].map(i => `<rect x="34" y="${128 + i * 56}" width="150" height="40" rx="8" style="${NODE}"/>`).join('')}
   <g transform="translate(300,222)"><path d="M0 -112 C 46 -86 88 -80 98 -80 L 98 6 C 98 76 44 106 0 120 C -44 106 -98 76 -98 6 L -98 -80 C -88 -80 -46 -86 0 -112 Z" style="fill:color-mix(in srgb,var(--acc) 26%,#0B1120);stroke:var(--accT);stroke-width:3"/><path d="M-36 6 L-8 36 L42 -28" style="fill:none;stroke:var(--accT);stroke-width:9;stroke-linecap:round;stroke-linejoin:round"/></g></svg>`,
  // bong bóng chat chứa báo cáo mini + đồng hồ (báo cáo hẹn giờ Telegram/Zalo, COO)
  // hai bong bóng hội thoại: người dùng hỏi → AI hỏi lại (?) — vòng lặp làm rõ
  // thân + đuôi vẽ LIỀN 1 path (không seam), đuôi ở đáy-trái chĩa xuống
  chat: () => {
    const bub = (x, y, w, h, r, fill, stroke, sw, side = 'l') => {
      const tail = side === 'r' ? `H${x + w - 58} L${x + w - 42} ${y + h + 34} L${x + w - 84} ${y + h}` : `H${x + 84} L${x + 42} ${y + h + 34} L${x + 58} ${y + h}`;
      return `<path d="M${x + r} ${y} H${x + w - r} A${r} ${r} 0 0 1 ${x + w} ${y + r} V${y + h - r} A${r} ${r} 0 0 1 ${x + w - r} ${y + h} ${tail} H${x + r} A${r} ${r} 0 0 1 ${x} ${y + h - r} V${y + r} A${r} ${r} 0 0 1 ${x + r} ${y} Z" style="fill:${fill};stroke:${stroke};stroke-width:${sw};stroke-linejoin:round"/>`;
    };
    const A = 'var(--acc)', T = 'var(--accT)';
    return `<svg viewBox="0 0 440 440" class="md">
     ${bub(54, 84, 204, 118, 22, `color-mix(in srgb,${A} 15%,#0B1120)`, `color-mix(in srgb,${T} 45%,transparent)`, 2, 'l')}
     ${[0, 1].map(i => `<rect x="84" y="${122 + i * 30}" width="${146 - i * 52}" height="13" rx="6" style="fill:color-mix(in srgb,${T} 42%,transparent)"/>`).join('')}
     ${bub(206, 214, 182, 132, 22, `color-mix(in srgb,${A} 30%,#0B1120)`, T, 2.5, 'r')}
     <text x="297" y="308" text-anchor="middle" style="fill:${T};font-weight:900;font-size:78px;font-family:Inter">?</text></svg>`;
  },
  // não (trực giác) + con số bẻ cong mũi tên quyết định
  brain: () => `<svg viewBox="0 0 440 440" class="md">
   <g transform="translate(70,120) scale(5.6)" fill="none" stroke="var(--accT)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">${I.brain}</g>
   <path d="M150 316 C 224 316 250 264 330 264" style="fill:none;stroke:color-mix(in srgb,var(--accT) 65%,transparent);stroke-width:4"/><path d="M320 256 L336 264 L320 272" style="fill:none;stroke:var(--accT);stroke-width:4"/>
   <rect x="236" y="222" width="80" height="50" rx="10" style="fill:#0B1220;stroke:var(--accT);stroke-width:2"/><text x="276" y="254" class="tl" text-anchor="middle" style="font-size:22px">42%</text></svg>`,
  // máy ảnh chụp trạng thái theo ngày (snapshot table)
  camera: () => `<svg viewBox="0 0 440 440" class="md">
   ${[0, 1, 2].map(i => `<rect x="${52 + i * 24}" y="${248 - i * 24}" width="150" height="150" rx="12" style="fill:color-mix(in srgb,var(--acc) ${13 + i * 6}%,#0B1120);stroke:var(--accT);stroke-width:2"/>`).join('')}
   <g transform="translate(286,150) scale(6)" fill="none" stroke="var(--accT)" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">${I.camera}</g></svg>`,
  // chìa khoá của bạn → định tuyến nhiều nhà cung cấp (BYOK)
  router: (provs = ['GPT', 'Claude', 'Gemini', 'Local']) => `<svg viewBox="0 0 440 440" class="md">
   <g transform="translate(30,188) scale(4)" fill="none" stroke="var(--accT)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${I.key}</g>
   ${provs.map((P, i) => { const y = 44 + i * 90; return `<path d="M150 220 C 220 220 236 ${y + 26} 300 ${y + 26}" class="lnk" fill="none" stroke-width="3"/><rect x="300" y="${y}" width="130" height="54" rx="10" style="${NODE}"/><text x="365" y="${y + 33}" class="tl" text-anchor="middle" style="font-size:16px">${P}</text>`; }).join('')}</svg>`,
  // lưới thẻ bảng/cột (data catalog / từ điển dữ liệu)
  catalog: () => `<svg viewBox="0 0 440 440" class="md">${[0, 1, 2, 3, 4, 5].map(i => { const c = i % 2, r = Math.floor(i / 2), x = 40 + c * 192, y = 66 + r * 108; return `<rect x="${x}" y="${y}" width="168" height="88" rx="12" style="${NODE}"/><rect x="${x + 16}" y="${y + 18}" width="66" height="12" rx="6" style="fill:var(--accT);opacity:.85"/><rect x="${x + 16}" y="${y + 44}" width="118" height="9" rx="4" style="fill:#475569"/><rect x="${x + 16}" y="${y + 62}" width="92" height="9" rx="4" style="fill:#475569"/>`; }).join('')}</svg>`,
  // kho lớn → quầy chuyên nhỏ (warehouse → mart); icon Lucide warehouse + store
  warehouse: (mode = 'mart') => {
    const WH = '<path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/><path d="M6 10h12"/>';
    const ST = '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/>';
    const bigL = mode === 'sme' ? 'KHO LỚN?' : 'KHO LỚN', smallL = mode === 'sme' ? 'VỪA ĐỦ' : 'MART';
    const q = mode === 'sme' ? `<circle cx="196" cy="116" r="23" style="fill:#0B1220;stroke:var(--accT);stroke-width:2.5"/><text x="196" y="126" text-anchor="middle" style="fill:var(--accT);font-weight:900;font-size:28px;font-family:Inter">?</text>` : '';
    return `<svg viewBox="0 0 440 440" class="md">
     <g transform="translate(16,112) scale(7.6)" fill="none" stroke="var(--accT)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${WH}</g>
     <text x="107" y="326" class="ts" text-anchor="middle">${bigL}</text>${q}
     <path d="M228 214 L292 214" class="lnk" stroke-width="3"/><path d="M284 206 L296 214 L284 222" style="fill:none;stroke:var(--accT);stroke-width:3"/>
     <g transform="translate(312,166) scale(4.2)" fill="none" stroke="var(--accT)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ST}</g>
     <text x="362" y="288" class="ts" text-anchor="middle">${smallL}</text></svg>`;
  },
  // hàng lộn xộn (đỏ) + chổi quét thành hàng sạch (dữ liệu bẩn)
  broom: (mode = 'clean') => {
    const dirty = [0, 1, 2, 3].map(i => `<rect x="28" y="${94 + i * 58}" width="${118 + (i % 3) * 12}" height="34" rx="7" style="fill:#3a1d24;stroke:#7f1d1d;stroke-width:1.5" transform="rotate(${i % 2 ? 2.5 : -2.5} 90 ${111 + i * 58})"/>`).join('');
    const out = mode === 'model'
      ? `<rect x="284" y="150" width="130" height="120" rx="16" style="fill:#0B1220;stroke:#F87171;stroke-width:2.5"/><path d="M312 178 l74 74 M386 178 l-74 74" style="stroke:#F87171;stroke-width:5;stroke-linecap:round"/><text x="349" y="300" class="ts" text-anchor="middle" style="fill:#F87171">MODEL</text>`
      : [0, 1, 2, 3].map(i => `<rect x="272" y="${100 + i * 58}" width="140" height="34" rx="7" style="${NODE}"/>`).join('');
    return `<svg viewBox="0 0 440 440" class="md">${dirty}${out}<g transform="translate(196,196) scale(4.6)" fill="none" stroke="var(--accT)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${I.broom}</g></svg>`;
  },
  // dấu ? lớn → mũi tên → biểu đồ (bắt đầu từ câu hỏi, self-service, text-to-sql)
  question: () => `<svg viewBox="0 0 440 440" class="md">
   <circle cx="118" cy="200" r="90" style="fill:color-mix(in srgb,var(--acc) 22%,#0B1120);stroke:var(--accT);stroke-width:3"/><text x="118" y="246" text-anchor="middle" style="fill:var(--accT);font-weight:900;font-size:120px;font-family:Inter">?</text>
   <path d="M222 200 L300 200" class="lnk" stroke-width="3"/><path d="M291 192 L305 200 L291 208" style="fill:none;stroke:var(--accT);stroke-width:4"/>
   <g transform="translate(316,132)">${[64, 96, 54, 116].map((h, i) => `<rect x="${i * 30}" y="${132 - h}" width="20" height="${h}" rx="4" style="fill:var(--accT);opacity:.9"/>`).join('')}</g></svg>`,
  // dãy cột phần lớn mờ, kính lúp soi vài cột (thiên kiến / né số liệu)
  lens: () => `<svg viewBox="0 0 440 440" class="md">
   ${[70, 112, 90, 142, 100, 132, 82].map((h, i) => { const hi = i === 3 || i === 5; return `<rect x="${28 + i * 55}" y="${306 - h}" width="38" height="${h}" rx="6" style="fill:var(--accT);opacity:${hi ? 1 : .26}"/>`; }).join('')}
   <g transform="translate(292,150) scale(4.6)" fill="none" stroke="var(--accT)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${I.search}</g></svg>`,
  // ma trận 2x2, điểm nổi bật góc phải trên (định vị/2x2)
  matrix2x2: () => `<svg viewBox="0 0 440 440" class="md"><g transform="translate(70,66)">
   <rect x="0" y="0" width="300" height="300" rx="12" style="fill:none;stroke:color-mix(in srgb,var(--accT) 42%,transparent);stroke-width:2"/>
   <line x1="150" y1="0" x2="150" y2="300" class="lnk"/><line x1="0" y1="150" x2="300" y2="150" class="lnk"/>
   <circle cx="222" cy="80" r="22" style="fill:var(--accT)"/><circle cx="90" cy="210" r="13" style="fill:#475569"/><circle cx="205" cy="222" r="13" style="fill:#475569"/><circle cx="82" cy="92" r="13" style="fill:#475569"/></g></svg>`,
  // bong bóng mờ (mơ hồ) → bong bóng rõ (câu hỏi mơ hồ vs rõ)
  bubbles: () => `<svg viewBox="0 0 440 440" class="md"><defs><filter id="bl"><feGaussianBlur stdDeviation="3.2"/></filter></defs>
   <g filter="url(#bl)"><rect x="40" y="132" width="176" height="112" rx="22" style="fill:#241a2e;stroke:#7f1d1d;stroke-width:2"/><rect x="66" y="166" width="118" height="13" rx="6" fill="#64748b"/><rect x="66" y="196" width="88" height="13" rx="6" fill="#64748b"/></g>
   <path d="M232 190 L300 190" class="lnk" stroke-width="3"/><path d="M291 182 L305 190 L291 198" style="fill:none;stroke:var(--accT);stroke-width:4"/>
   <rect x="248" y="132" width="176" height="112" rx="22" style="fill:color-mix(in srgb,var(--acc) 24%,#0B1120);stroke:var(--accT);stroke-width:2.5"/><rect x="274" y="166" width="118" height="13" rx="6" style="fill:var(--accT)"/><rect x="274" y="196" width="128" height="13" rx="6" style="fill:var(--accT);opacity:.7"/></svg>`,
  // hai làn hội tụ về hành trình chung (marketing & sản phẩm)
  twoLane: (a = 'Marketing', b = 'Sản phẩm') => `<svg viewBox="0 0 440 440" class="md"><defs><marker id="tw" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 z" fill="var(--accT)"/></marker></defs>
   <rect x="18" y="90" width="150" height="52" rx="12" style="${NODE}"/><text x="93" y="122" class="tl" text-anchor="middle" style="font-size:16px">${a}</text>
   <rect x="18" y="298" width="150" height="52" rx="12" style="${NODE}"/><text x="93" y="330" class="tl" text-anchor="middle" style="font-size:16px">${b}</text>
   <path d="M170 116 C 250 116 250 220 320 220" class="lnk" fill="none" stroke-width="3" marker-end="url(#tw)"/>
   <path d="M170 324 C 250 324 250 220 320 220" class="lnk" fill="none" stroke-width="3" marker-end="url(#tw)"/>
   <rect x="320" y="186" width="114" height="68" rx="14" style="fill:#0B1220;stroke:var(--accT);stroke-width:2.5"/><text x="377" y="216" class="ts" text-anchor="middle">HÀNH TRÌNH</text><text x="377" y="240" class="tl" text-anchor="middle" style="font-size:14px">chung</text></svg>`,
  // nút đầu vào (điều khiển được) → kết quả đầu ra (input vs output metrics)
  inout: () => `<svg viewBox="0 0 440 440" class="md"><defs><marker id="io" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 z" fill="var(--accT)"/></marker></defs>
   ${['Giá', 'Kênh', 'Nội dung'].map((L, i) => { const y = 88 + i * 82; return `<rect x="18" y="${y}" width="132" height="56" rx="12" style="${NODE}"/><text x="84" y="${y + 34}" class="tl" text-anchor="middle" style="font-size:16px">${L}</text><path d="M152 ${y + 28} C 214 ${y + 28} 234 220 300 220" class="lnk" fill="none" stroke-width="3" marker-end="url(#io)"/>`; }).join('')}
   <circle cx="360" cy="220" r="66" style="fill:#0B1220;stroke:var(--accT);stroke-width:3"/><text x="360" y="214" class="ts" text-anchor="middle">DOANH THU</text><text x="360" y="244" class="tl" text-anchor="middle" style="font-size:18px">= đầu ra</text></svg>`,
  // lưới bảng tính, hàng tiêu đề nhấn (Google Sheets / quá tải)
  // bảng tính: variant plain | dashboard (sheet→chart) | overload (đầy ô) | gaps (ô trống)
  sheet: (variant = 'plain') => {
    const cw = 68, rh = 50, W = 340, H = 300;
    const dataCell = (c, r) => `<rect x="${cw * c + 14}" y="${rh * r + 20}" width="40" height="10" rx="5" style="fill:color-mix(in srgb,var(--accT) 55%,transparent)"/>`;
    const barCell = (c, r, h) => `<rect x="${cw * c + 24}" y="${rh * (r + 1) - 6 - h}" width="20" height="${h}" rx="3" style="fill:var(--accT)"/>`;
    const gapCell = (c, r) => `<rect x="${cw * c + 12}" y="${rh * r + 14}" width="44" height="22" rx="5" style="fill:none;stroke:#F87171;stroke-width:1.6;stroke-dasharray:4 4"/>`;
    let extra = '';
    if (variant === 'dashboard') extra = [[1, 3, 18], [2, 3, 30], [3, 3, 22], [1, 4, 26], [2, 4, 40], [3, 4, 34]].map(([c, r, h]) => barCell(c, r, h)).join('') + [1, 2, 3].map(r => dataCell(0, r)).join('');
    else if (variant === 'overload') { for (let r = 1; r < 6; r++) for (let c = 0; c < 5; c++) extra += dataCell(c, r); }
    else if (variant === 'gaps') extra = [[1, 2], [3, 3], [2, 4], [4, 1]].map(([c, r]) => gapCell(c, r)).join('') + [[0, 1], [2, 1], [0, 3], [4, 4], [1, 5]].map(([c, r]) => dataCell(c, r)).join('');
    else extra = [[0, 1], [1, 1], [2, 2], [0, 3], [3, 2], [1, 4], [4, 3]].map(([c, r]) => dataCell(c, r)).join('');
    return `<svg viewBox="0 0 440 440" class="md"><g transform="translate(50,70)"><rect x="0" y="0" width="${W}" height="${H}" rx="10" style="fill:#0B1220;stroke:var(--accT);stroke-width:2"/>${[1, 2, 3, 4, 5].map(r => `<line x1="0" y1="${rh * r}" x2="${W}" y2="${rh * r}" class="lnk"/>`).join('')}${[1, 2, 3, 4].map(c => `<line x1="${cw * c}" y1="0" x2="${cw * c}" y2="${H}" class="lnk"/>`).join('')}<rect x="0" y="0" width="${W}" height="${rh}" style="fill:color-mix(in srgb,var(--acc) 26%,transparent)"/>${[0, 1, 2, 3, 4].map(c => `<rect x="${cw * c + 12}" y="18" width="44" height="14" rx="4" style="fill:var(--accT);opacity:.8"/>`).join('')}${extra}</g></svg>`;
  },
  // bảng KPI cards + biểu đồ (dashboard); variant 'threshold' = có ngưỡng đỏ + màu chủ đích
  dashboard: (variant = 'bars') => {
    const cards = [0, 1, 2].map(i => `<rect x="${i * 114}" y="0" width="98" height="72" rx="12" style="${NODE}"/><rect x="${i * 114 + 16}" y="16" width="42" height="10" rx="5" style="fill:var(--accT);opacity:.7"/><text x="${i * 114 + 16}" y="58" class="tl" style="font-size:23px">${['4,2', '+18%', '92'][i]}</text>`).join('');
    const hs = [90, 142, 70, 160, 112, 150], thr = 128;
    const bars = hs.map((h, i) => { const col = variant === 'threshold' ? (h >= thr ? 'var(--accT)' : 'color-mix(in srgb,#94A3B8 50%,transparent)') : 'var(--accT)'; return `<rect x="${i * 50}" y="${172 - h}" width="34" height="${h}" rx="5" style="fill:${col};opacity:.9"/>`; }).join('');
    const thrLine = variant === 'threshold' ? `<line x1="-6" y1="${172 - thr}" x2="300" y2="${172 - thr}" style="stroke:#F87171;stroke-width:2;stroke-dasharray:8 6"/>` : '';
    return `<svg viewBox="0 0 440 440" class="md"><g transform="translate(48,68)">${cards}
     <rect x="0" y="92" width="326" height="204" rx="14" style="fill:#0B1220;stroke:color-mix(in srgb,var(--accT) 40%,transparent);stroke-width:2"/><g transform="translate(22,112)">${bars}${thrLine}</g></g></svg>`;
  },
  // 2x2 loại biểu đồ (cột/đường/tròn/scatter), chọn đúng cái — cho "chọn đúng biểu đồ"
  chartpicker: () => `<svg viewBox="0 0 440 440" class="md"><g transform="translate(40,58)">
   ${[0, 1, 2, 3].map(q => { const c = q % 2, r = Math.floor(q / 2), x = c * 185, y = r * 165, hi = q === 0; return `<rect x="${x}" y="${y}" width="165" height="145" rx="14" style="fill:${hi ? 'color-mix(in srgb,var(--acc) 22%,#0B1120)' : '#0B1220'};stroke:${hi ? 'var(--accT)' : 'color-mix(in srgb,var(--accT) 32%,transparent)'};stroke-width:${hi ? 2.5 : 1.6}"/>`; }).join('')}
   <g transform="translate(30,36)">${[46, 74, 58, 92].map((h, i) => `<rect x="${i * 30}" y="${100 - h}" width="20" height="${h}" rx="3" style="fill:var(--accT)"/>`).join('')}</g>
   <polyline points="212,116 240,86 268,102 296,60 326,78" style="fill:none;stroke:color-mix(in srgb,var(--accT) 72%,transparent);stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round"/>
   <g transform="translate(82,238)"><circle r="44" style="fill:none;stroke:color-mix(in srgb,var(--accT) 28%,transparent);stroke-width:15"/><circle r="44" style="fill:none;stroke:color-mix(in srgb,var(--accT) 72%,transparent);stroke-width:15;stroke-dasharray:100 177"/></g>
   ${[[212, 288], [244, 250], [272, 266], [300, 232], [326, 250]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" style="fill:color-mix(in srgb,var(--accT) 70%,transparent)"/>`).join('')}
   </g></svg>`,
  // slide trình bày 1 thông điệp; variant 'export' = có nút tải (PowerPoint 1-click)
  slide: (mode = 'present') => {
    const dl = mode === 'export' ? `<g transform="translate(356,330)"><circle r="34" style="fill:color-mix(in srgb,var(--acc) 30%,#0B1120);stroke:var(--accT);stroke-width:2.5"/><path d="M0 -13 L0 9 M-11 -2 L0 11 L11 -2" style="fill:none;stroke:var(--accT);stroke-width:3;stroke-linecap:round;stroke-linejoin:round"/></g>` : '';
    return `<svg viewBox="0 0 440 440" class="md">
     <rect x="44" y="78" width="352" height="284" rx="16" style="fill:#0B1220;stroke:var(--accT);stroke-width:2.5"/>
     <rect x="44" y="78" width="352" height="54" rx="16" style="fill:color-mix(in srgb,var(--acc) 24%,transparent)"/><rect x="70" y="97" width="150" height="16" rx="8" style="fill:var(--accT);opacity:.85"/>
     <text x="74" y="214" style="font-size:70px;font-weight:900;fill:var(--accT);font-family:Inter">↑18%</text>
     <rect x="76" y="242" width="236" height="13" rx="6" style="fill:color-mix(in srgb,var(--accT) 40%,transparent)"/>
     <rect x="76" y="302" width="164" height="42" rx="11" style="fill:color-mix(in srgb,var(--acc) 26%,#0B1120);stroke:var(--accT);stroke-width:2"/><text x="158" y="329" class="ts" text-anchor="middle" style="fill:var(--accT);font-size:14px">→ HÀNH ĐỘNG</text>${dl}</svg>`;
  },
  // tương quan ≠ nhân quả: Ads →(?)→ Khách, yếu tố ẩn kéo cả hai
  causal: () => `<svg viewBox="0 0 440 440" class="md"><defs><marker id="ca" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 z" fill="var(--accT)"/></marker><marker id="cr" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9 z" fill="#F87171"/></marker></defs>
   <rect x="18" y="118" width="140" height="66" rx="14" style="${NODE}"/><text x="88" y="158" class="tl" text-anchor="middle" style="font-size:19px">Chạy ads</text>
   <rect x="282" y="118" width="140" height="66" rx="14" style="${NODE}"/><text x="352" y="158" class="tl" text-anchor="middle" style="font-size:18px">Đông khách</text>
   <path d="M160 151 L276 151" style="fill:none;stroke:#F87171;stroke-width:3;stroke-dasharray:9 7" marker-end="url(#cr)"/>
   <circle cx="220" cy="118" r="21" style="fill:#0B1220;stroke:#F87171;stroke-width:2.5"/><text x="220" y="127" text-anchor="middle" style="fill:#F87171;font-weight:900;font-size:23px;font-family:Inter">?</text>
   <rect x="150" y="300" width="140" height="70" rx="14" style="fill:color-mix(in srgb,var(--acc) 24%,#0B1120);stroke:var(--accT);stroke-width:2.5"/><text x="220" y="332" class="ts" text-anchor="middle" style="fill:var(--accT);font-size:12px">YẾU TỐ ẨN</text><text x="220" y="354" class="tl" text-anchor="middle" style="font-size:15px">Mùa vụ</text>
   <path d="M186 300 C 150 254 112 214 92 186" class="lnk" fill="none" stroke-width="2.5" marker-end="url(#ca)"/>
   <path d="M254 300 C 290 254 328 214 348 186" class="lnk" fill="none" stroke-width="2.5" marker-end="url(#ca)"/></svg>`,
  // phần trăm vs điểm phần trăm: 20% → 22% = +2 điểm % (không phải +10%)
  pctpoint: () => `<svg viewBox="0 0 440 440" class="md">
   <rect x="34" y="150" width="130" height="92" rx="16" style="${NODE}"/><text x="99" y="210" class="tl" text-anchor="middle" style="font-size:42px">20%</text>
   <path d="M176 196 L246 196" class="lnk" stroke-width="3"/><path d="M238 188 L250 196 L238 204" style="fill:none;stroke:var(--accT);stroke-width:3"/>
   <rect x="262" y="150" width="130" height="92" rx="16" style="fill:color-mix(in srgb,var(--acc) 22%,#0B1120);stroke:var(--accT);stroke-width:2.5"/><text x="327" y="210" class="tl" text-anchor="middle" style="font-size:42px;fill:var(--accT)">22%</text>
   <rect x="70" y="288" width="140" height="54" rx="12" style="fill:color-mix(in srgb,#10b981 16%,#0B1120);stroke:#34d399;stroke-width:2"/><text x="140" y="321" class="tl" text-anchor="middle" style="font-size:18px;fill:#6ee7b7">+2 điểm %</text>
   <rect x="230" y="288" width="140" height="54" rx="12" style="fill:color-mix(in srgb,#ef4444 14%,#0B1120);stroke:#f87171;stroke-width:2"/><text x="300" y="321" class="tl" text-anchor="middle" style="font-size:18px;fill:#fca5a5">≠ +10%</text></svg>`,
  // đường có 1 gai vọt qua ngưỡng đỏ + chuông (anomaly detection)
  alertBell: () => `<svg viewBox="0 0 440 440" class="md">
   <line x1="16" y1="188" x2="322" y2="188" style="stroke:#EF4444;stroke-width:2.5;stroke-dasharray:10 8"/><text x="16" y="176" style="fill:#F87171;font-size:15px;font-weight:700;font-family:Inter">Ngưỡng thường</text>
   <polyline points="16,258 56,248 96,262 136,244 176,256 216,126 256,246 296,254 322,250" fill="none" stroke="var(--accT)" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
   <circle cx="216" cy="126" r="10" style="fill:#EF4444;stroke:#0F172A;stroke-width:2.5"/>
   <g transform="translate(330,160) scale(4.2)" fill="none" stroke="#F87171" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${I.bell}</g>
   <path d="M416 168 q11 16 0 32" fill="none" stroke="#F87171" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  // A/B test: 2 cột A/B + thanh sai số (CI) chồng nhau => chênh lệch có thật không
  abtest: () => `<svg viewBox="0 0 440 440" class="md"><line x1="56" y1="360" x2="400" y2="360" class="lnk"/>
   <rect x="110" y="200" width="92" height="160" rx="9" style="fill:color-mix(in srgb,#94A3B8 26%,#0B1120);stroke:#94A3B8;stroke-width:2"/><text x="156" y="392" class="tl" text-anchor="middle" style="font-size:22px;fill:#94A3B8">A</text>
   <line x1="156" y1="168" x2="156" y2="232" style="stroke:#CBD5E1;stroke-width:2.5"/><line x1="142" y1="168" x2="170" y2="168" style="stroke:#CBD5E1;stroke-width:2.5"/><line x1="142" y1="232" x2="170" y2="232" style="stroke:#CBD5E1;stroke-width:2.5"/>
   <rect x="252" y="150" width="92" height="210" rx="9" style="fill:color-mix(in srgb,var(--acc) 32%,#0B1120);stroke:var(--accT);stroke-width:2.5"/><text x="298" y="392" class="tl" text-anchor="middle" style="font-size:22px;fill:var(--accT)">B</text>
   <line x1="298" y1="120" x2="298" y2="184" style="stroke:var(--accT);stroke-width:2.5"/><line x1="284" y1="120" x2="312" y2="120" style="stroke:var(--accT);stroke-width:2.5"/><line x1="284" y1="184" x2="312" y2="184" style="stroke:var(--accT);stroke-width:2.5"/>
   <text x="227" y="86" text-anchor="middle" style="fill:var(--accT);font-weight:900;font-size:30px;font-family:Inter">+3% <tspan fill="#FF3B4E">?</tspan></text></svg>`,
  // Google Sheets -> dashboard: lưới sheet nhỏ + mũi tên + bảng dashboard có chart
  sheet2dash: () => `<svg viewBox="0 0 440 440" class="md">
   <g transform="translate(6,150)"><rect x="0" y="0" width="150" height="140" rx="8" style="fill:#0B1220;stroke:color-mix(in srgb,var(--accT) 45%,transparent);stroke-width:2"/><rect x="0" y="0" width="150" height="28" style="fill:color-mix(in srgb,var(--acc) 24%,transparent)"/>${[1, 2, 3, 4].map(r => `<line x1="0" y1="${28 + r * 28}" x2="150" y2="${28 + r * 28}" class="lnk"/>`).join('')}${[1, 2].map(c => `<line x1="${50 * c}" y1="0" x2="${50 * c}" y2="140" class="lnk"/>`).join('')}</g>
   <path d="M170 220 L214 220" class="lnk" stroke-width="3"/><path d="M206 212 L218 220 L206 228" style="fill:none;stroke:var(--accT);stroke-width:3"/>
   <g transform="translate(232,96)"><rect x="0" y="0" width="200" height="248" rx="16" style="fill:#0B1220;stroke:var(--accT);stroke-width:2.5"/>
     ${[0, 1].map(i => `<rect x="${18 + i * 92}" y="18" width="74" height="48" rx="9" style="${NODE}"/><text x="${30 + i * 92}" y="50" class="tl" style="font-size:19px">${['4,2', '+18%'][i]}</text>`).join('')}
     <g transform="translate(20,90)">${[54, 88, 40, 96, 68].map((h, i) => `<rect x="${i * 34}" y="${140 - h}" width="22" height="${h}" rx="4" style="fill:var(--accT);opacity:.9"/>`).join('')}</g></g></svg>`,
};

// ── motif registry ──
const M = {
  growth: { acc: VIOLET, chart: C.growth }, cohort: { acc: GREEN, chart: C.cohort },
  funnel: { acc: CYAN, chart: C.funnel }, line: { acc: CYAN, chart: C.line },
  signalNoise: { chart: C.signalNoise }, twoLine: { chart: C.twoLine }, decay: { chart: C.decay },
  seasonal: { chart: C.seasonal }, peak: { chart: C.peak },
  waterfall: { acc: BLUE, chart: C.waterfall }, scatter: { acc: INDIGO, chart: C.scatter },
  radar: { acc: VIOLET, chart: C.radar }, bar: { acc: CYAN, chart: C.bar }, gauge: { chart: C.gauge },
  threshold: { acc: INDIGO, chart: C.threshold },
  star: { svg: SVGD.star }, cube: { svg: SVGD.cube }, flow: { svg: SVGD.flow }, twoPath: { svg: SVGD.twoPath }, layers: { svg: SVGD.layers },
  converge: { svg: SVGD.converge }, staircase: { svg: SVGD.staircase }, coin: { svg: SVGD.coin }, fanout: { svg: SVGD.fanout },
  // icon Lucide riêng (khái niệm đơn) — hiện trong panel thay icon category chung
  lock: { icon: I.shield }, key: { icon: I.key }, clock: { icon: I.clock }, bell: { icon: I.bell },
  camera: { icon: I.camera }, brain: { icon: I.brain }, message: { icon: I.message }, database: { icon: I.database },
  filter: { icon: I.filter }, search: { icon: I.search }, target: { icon: I.target }, book: { icon: I.book }, checklist: { icon: I.checks },
  // charts mới
  pareto: { acc: CYAN, chart: C.pareto }, distribution: { acc: VIOLET, chart: C.distribution },
  rfmGrid: { acc: VIOLET, chart: C.rfmGrid }, ltv: { acc: CYAN, chart: C.ltv },
  survival: { chart: C.survival }, vintage: { chart: C.vintage }, rollrate: { chart: C.rollrate }, clvcac: { chart: C.clvcac }, abc: { chart: C.abc },
  // sơ đồ bespoke mới
  versus: { svg: SVGD.versus }, pipeline: { svg: SVGD.pipeline }, shield: { svg: SVGD.shield }, chat: { svg: SVGD.chat },
  brainDia: { svg: SVGD.brain }, cameraDia: { svg: SVGD.camera }, router: { svg: SVGD.router }, catalog: { svg: SVGD.catalog },
  warehouse: { svg: SVGD.warehouse }, broomDia: { svg: SVGD.broom }, question: { svg: SVGD.question }, lens: { svg: SVGD.lens },
  matrix2x2: { svg: SVGD.matrix2x2 }, bubbles: { svg: SVGD.bubbles }, twoLane: { svg: SVGD.twoLane }, inout: { svg: SVGD.inout },
  sheet: { svg: SVGD.sheet }, dashboard: { svg: SVGD.dashboard }, chartpicker: { svg: SVGD.chartpicker }, slide: { svg: SVGD.slide },
  causal: { svg: SVGD.causal }, pctpoint: { svg: SVGD.pctpoint }, alertBell: { svg: SVGD.alertBell },
  abtest: { svg: SVGD.abtest }, sheet2dash: { svg: SVGD.sheet2dash },
};

// ── MAP per-slug: chốt kỹ thuật đẹp nhất cho từng bài (ưu tiên hơn resolveMotif) ──
// hành trình "Từ Excel đến Semantix" — 4 nấc thống nhất, mỗi phần làm sáng nấc của nó
const JRN = ['Excel\nSheets', 'Power BI\nData Studio', 'Superset\nMetabase', 'Semantix'];
const MAP = {
  // staircase (cầu thang / tiến hoá)
  '4-loai-thang-do-du-lieu': 'staircase',
  'tien-hoa-bi': ['staircase', ['Có dashboard', 'Hiểu vì sao', 'Dự báo', 'Tự quyết']],
  'hanh-trinh-thoi-excel': ['staircase', JRN, 0],
  'hanh-trinh-power-bi-data-studio': ['staircase', JRN, 1],
  'hanh-trinh-superset-metabase': ['staircase', JRN, 2],
  'hanh-trinh-tu-xay-semantix': ['staircase', JRN, 3],
  // converge (N nguồn → 1) — nội dung riêng từng bài
  'mot-nguon-su-that': ['converge', ['Sales', 'Finance', 'Marketing', 'Kho', 'CRM'], ['1 ĐỊNH NGHĨA', '= 1 sự thật']],
  'semantic-layer': ['converge', ['Sales', 'Finance', 'BI'], ['SEMANTIC LAYER', '1 định nghĩa']],
  'xay-semantic-layer-dau-tien': ['converge', ['DT Sales', 'DT Finance', 'DT Web'], ['1 ĐỊNH NGHĨA', 'dùng chung']],
  'hop-nhat-da-kenh': ['converge', ['Website', 'Cửa hàng', 'Sàn TMĐT'], ['1 KHÁCH HÀNG', 'hợp nhất']],
  'chuoi-fnb-8-chi-nhanh': ['converge', ['CN Hoàn Kiếm', 'CN Đống Đa', 'CN Cầu Giấy', 'CN Hà Đông', '+4 nữa'], ['1 MÀN HÌNH', 'cả chuỗi']],
  'bi-cho-sme': ['converge', ['Bán hàng', 'Kho', 'Marketing'], ['1 DASHBOARD', 'ra quyết định']],
  'bang-ao-gop-du-lieu': ['converge', ['Bảng đơn', 'Bảng khách', 'Bảng kho'], ['BẢNG ẢO', 'gộp tại chỗ']],
  'chu-shop-da-kenh': ['converge', ['Shopee', 'TikTok', 'Website', 'Cửa hàng'], ['1 CÂU TRẢ LỜI', 'lúc 11h đêm']],
  'bi-analyst-dinh-nghia-metric': ['converge', ['Sales hỏi', 'Marketing hỏi', 'CEO hỏi'], ['1 ĐỊNH NGHĨA', 'metric chuẩn']],
  'de-dup-khach-hang-truoc-khi-tinh-ltv': ['converge', ['Hồ sơ Shopee', 'Hồ sơ Web', 'Hồ sơ Zalo', 'Hồ sơ POS', 'Hồ sơ CRM'], ['1 KHÁCH HÀNG', 'gộp trùng']],
  'marketing-do-roi-ads': ['converge', ['Facebook', 'Google', 'TikTok'], ['DOANH THU', 'thật sự']],
  'tu-cong-cu-den-tu-duy': ['converge', ['Excel', 'Power BI', 'SQL', 'AI'], ['NGỮ CẢNH', 'là vua']],
  // fanout (1 → N)
  'dimension-table-vs-dimension': ['fanout', ['Thời gian', 'Sản phẩm', 'Kênh', 'Vùng'], '1 bảng'],
  'scenario-analysis': ['fanout', ['Lạc quan', 'Cơ sở', 'Bi quan'], 'Hôm nay'],
  'chia-se-bao-cao-khong-lo-data': ['fanout', ['Sếp', 'Sales', 'Kho'], '1 báo cáo'],
  // coin / twoLane / inout / lens / matrix / bubbles
  'business-metrics-vs-customer-metrics': 'coin',
  'khung-san-pham-vs-marketing': ['twoLane', 'Marketing', 'Sản phẩm'], 'dual-agent-debate': ['twoLane', 'Agent A', 'Agent B'],
  'input-vs-output-metrics': 'inout',
  'thien-kien-trong-doc-so': 'lens', 'ne-so-lieu-bat-tien': 'lens', 'vanity-metrics': 'lens', 'sai-lam-khi-phan-tich-du-lieu': 'lens',
  'vs-thoughtspot': 'matrix2x2',
  '7-cau-hoi-sai-voi-ai': 'bubbles', 'viet-cau-hoi-cho-ai': 'bubbles',
  // shield (bảo mật / quyền / governance)
  'data-cho-ai-an-toan': 'shield', 'row-level-security': 'shield', 'bao-ve-du-lieu-ca-nhan-nghi-dinh-13': 'shield', 'data-governance': 'shield',
  // chat (báo cáo hẹn giờ / review)
  'bao-cao-telegram-zalo': 'message', 'coo-bao-cao-tuc-thi': 'clock', 'sentiment-analysis': 'bubbles', 'ai-biet-hoi-lai': 'chat',
  // các sơ đồ khái niệm khác
  'multi-provider-byok': 'router', 'tu-duy-du-lieu-la-gi': 'brainDia', 'snapshot-table': 'cameraDia',
  'du-lieu-ban': 'broomDia', 'du-lieu-ban-giet-model': ['broomDia', 'model'], 'chuyen-nghe-data-analyst': 'broomDia',
  'data-catalog-tu-dien-du-lieu': 'catalog',
  'data-mart-la-gi': 'warehouse', 'data-warehouse-sme': ['warehouse', 'sme'],
  // question (bắt đầu từ câu hỏi / self-service / NL→SQL)
  'bat-dau-tu-cau-hoi': 'question', 'self-service-analytics': 'question',
  'text-to-sql': ['pipeline', ['Câu hỏi tiếng Việt', 'Lớp ngữ nghĩa', 'SQL đúng']],
  'ai-questions': 'question', 'schema-linking': 'search', 'checklist-chon-bi-cho-sme': 'checklist',
  // sheet (bảng tính)
  'google-sheets-dashboard': 'sheet2dash', 'khi-nao-len-database': ['sheet', 'overload'], 'thieu-du-lieu-cung-la-tin-hieu': ['sheet', 'gaps'],
  // dashboard
  'dashboard-doanh-thu-fnb': 'dashboard', 'dashboard-hanh-dong-duoc': ['dashboard', 'threshold'], 'chart-junk-toi-gian': 'bar',
  'chon-dung-bieu-do': 'chartpicker', 'trinh-bay-so-cho-sep': 'slide', 'xuat-bao-cao-powerpoint': ['slide', 'export'],
  // pipeline (ETL / text2sql / RAG / metric)
  'kien-truc-text2sql-4-lop': ['pipeline', ['Câu hỏi', 'Hiểu ý định', 'Lấy schema', 'Sinh SQL']],
  'rag-la-gi': ['pipeline', ['Câu hỏi', 'Tra cứu kho tri thức', 'Trả lời có nguồn']],
  'tao-metric-tinh-toan': ['pipeline', ['Cột nguồn', 'Công thức', 'Metric dùng chung']],
  'nocobase-semantix': ['pipeline', ['Định nghĩa 1 lần', 'Semantix hiểu ngay', 'Không khai lại']],
  'llm-bia-sql': ['pipeline', ['Câu hỏi', 'AI viết SQL trơn tru', 'Cột bịa → số sai']],
  // star / cube
  'kimball-dimensional-modeling': 'star', 'star-vs-snowflake-schema': ['star', 'snowflake'], 'data-modeling-fact-dimension': 'star',
  'olap-cube-drill-pivot': 'cube',
  // versus (So Sánh & Lựa Chọn + đối lập) — nhãn thật hai bên
  'build-vs-buy-bi': ['versus', ['Tự dựng'], ['Mua sẵn']],
  'semantix-vs-power-bi': ['versus', ['Power BI'], ['Semantix'], 'r'],
  'vs-metabase-superset': ['versus', ['Metabase', '& Superset'], ['Semantix'], 'r'],
  'vs-powerbi-tableau': ['versus', ['Power BI', '& Tableau'], ['Semantix'], 'r'],
  'on-premise-vs-cloud-ai-bi': ['versus', ['On-premise'], ['Cloud']],
  'thue-doi-data-hay-ai-bi': ['versus', ['Đội data'], ['AI BI'], 'r'],
  'vs-dashboard-saas-co-san': ['versus', ['Dashboard', 'có sẵn'], ['Semantix'], 'r'],
  'vs-freelancer-dashboard': ['versus', ['Freelancer'], ['AI BI'], 'r'],
  'vs-google-sheets': ['versus', ['Google', 'Sheets'], ['Semantix'], 'r'],
  'vs-looker-studio-pro': ['versus', ['Looker', 'Pro'], ['Semantix'], 'r'],
  'vs-looker-studio': ['versus', ['Looker', 'Studio'], ['Semantix'], 'r'],
  'vs-wrenai-text2sql': ['versus', ['WrenAI'], ['Semantix'], 'r'],
  'oltp-vs-olap': ['versus', ['OLTP'], ['OLAP']],
  'etl-vs-elt': ['versus', ['ETL'], ['ELT']],
  'inmon-vs-kimball': ['versus', ['Inmon'], ['Kimball']],
  'data-lake-vs-warehouse': ['versus', ['Data Lake'], ['Warehouse']],
  'hippo-vs-thu-nghiem': ['versus', ['HiPPO'], ['Thử nghiệm'], 'r'],
  'semantic-layer-vs-chatbot-database': ['versus', ['Semantic', 'Layer'], ['Chatbot', '→ DB'], 'l'],
  'doc-ket-qua-ab-test': 'abtest', 'thiet-ke-ab-test': ['versus', ['Bản A'], ['Bản B']],
  // ECharts — threshold / funnel / cohort / rfm / scatter / radar / pareto / distribution / line / growth / ltv / waterfall / bar / gauge
  'canh-bao-kpi': 'threshold', 'theo-doi-ton-kho-realtime': 'threshold', 'anomaly-detection': 'alertBell',
  'aarrr-pirate-metrics': ['funnel', [['Acquisition', 100], ['Activation', 62], ['Retention', 42], ['Referral', 28], ['Revenue', 18]]],
  'funnel-analysis': 'funnel',
  'funnel-nang-cao': ['funnel', [['Truy cập', 100], ['Quan tâm', 56], ['Cân nhắc', 34], ['Hành động', 20]]],
  'gio-hang-bo-quen': ['funnel', [['Thêm giỏ', 100], ['Checkout', 60], ['Nhập TT', 38], ['Đặt hàng', 20]]],
  'cohort-behavioral': ['funnel', [['Cài app', 100], ['Đăng ký', 50], ['Quay lại', 30], ['Trả phí', 16]]],
  'cohort-analysis': 'cohort', 'vintage-analysis': 'vintage',
  'rfm-segmentation': 'rfmGrid', 'rfm-nang-cao': 'rfmGrid', 'roll-rate': 'rollrate',
  'correlation-regression': ['scatter', 'regression'], 'pca-principal-component': ['scatter', 'clusters'],
  'tuong-quan-nhan-qua': 'causal', 'outlier-rac-hay-mo-vang': ['scatter', 'outlier'],
  'embedding-vector-search': ['scatter', 'clusters'], 'market-basket-ban-kem': ['scatter', 'clusters'],
  'heart-framework': 'radar',
  'data-quality-la-gi': ['radar', ['Đầy đủ', 'Chính xác', 'Nhất quán', 'Kịp thời', 'Hợp lệ', 'Duy nhất'], [86, 72, 78, 50, 82, 66]],
  'pareto-80-20': 'pareto', 'abc-inventory': 'abc',
  'do-lech-chuan': ['distribution', 'spread'], 'do-tin-cay-p-value': ['distribution', 'tail'], 'doc-hinh-dang-phan-phoi': ['distribution', 'bimodal'],
  'trung-binh-noi-doi': ['distribution', 'skewed'], 'mau-va-tong-the': ['distribution', 'sample'], 'phan-vi-percentile': ['distribution', 'percentile'],
  'base-rate-xac-suat-nguoc': 'lens', 'phan-khuc-model-theo-do-day-du-lieu': ['distribution', 'skewed'],
  // decay (đường tụt dần — giữ chân / sống sót / rời bỏ)
  'cohort-retention-pmf': 'decay', 'survival-analysis': 'survival', 'churn-prediction': 'decay',
  // line (xu hướng + dự báo nét đứt)
  'time-series-forecast': 'line', 'du-bao-la-gi': 'line', 'du-bao-ton-kho-thuc-chien': 'line',
  'mua-vu-tet-seasonality': 'seasonal', 'doc-tang-truong-mom-yoy': ['bar', 'delta'], 'tiktok-shop-mua-sale-gia-theo-gio': 'peak',
  // signalNoise (nhiễu răng cưa + tín hiệu mượt)
  'tin-hieu-vs-nhieu': 'signalNoise',
  // twoLine (hai đường trái chiều)
  'dong-tien-vs-loi-nhuan': 'twoLine', 'goodhart-guardrail-metrics': 'twoLine',
  'leading-lagging-indicator': 'twoLine', 'chi-so-dong-chay-vs-diem': 'twoLine',
  // scd — bản ghi đổi giá trị qua các phiên bản
  'scd-slowly-changing-dimension': ['pipeline', ['Địa chỉ v1', 'Địa chỉ v2 (đổi)', 'Lịch sử giữ lại']],
  'growth-accounting': ['growth', 'count4'], 'growth-accounting-thuc-chien': 'growth', 'growth-accounting-quick-ratio': ['growth', 'count4qr'], 'growth-accounting-revenue': 'growth',
  'clv-framework': 'clvcac', 'cohort-revenue-ltv': 'ltv',
  'why-analysis': ['waterfall', [{ l: 'Kỳ trước', v: 100, t: 1 }, { l: 'Giá', v: 30 }, { l: 'Số lượng', v: -45 }, { l: 'Kênh mới', v: 25 }, { l: 'Kỳ này', v: 110, t: 1 }]],
  'tco-cong-cu-bi': ['waterfall', [{ l: 'Giá niêm yết', v: 40, t: 1 }, { l: 'Setup', v: 25 }, { l: 'Đào tạo', v: 20 }, { l: 'Tích hợp', v: 30 }, { l: 'Bảo trì', v: 35 }, { l: 'Tổng thật', v: 150, t: 1 }], 'cost'],
  'toi-uu-chi-phi-token-ai': ['waterfall', [{ l: 'Gốc', v: 100, t: 1 }, { l: 'Cache', v: -35 }, { l: 'Nén prompt', v: -25 }, { l: 'Model rẻ', v: -18 }, { l: 'Còn lại', v: 22, t: 1 }], 'savings'],
  'metric-dimension-kpi': ['bar', 'target'], 'phan-tram-vs-diem-phan-tram': 'pctpoint', 'trung-binh-co-trong-so': ['bar', 'weighted'],
  'quyet-dinh-khi-thieu-du-lieu': 'gauge',
};

// keyword (slug + title) -> motif
function resolveMotif(slug, title, cat) {
  const s = (slug + ' ' + title).toLowerCase();
  const has = (...k) => k.some(x => s.includes(x));
  if (has('cohort')) return 'cohort';
  if (has('funnel', 'phễu', 'phieu')) return 'funnel';
  if (has('growth-account', 'growth account', 'quick-ratio', 'quick ratio', 'tăng trưởng', 'tang-truong')) return 'growth';
  if (has('olap', 'cube', 'khối lập', 'khoi-lap')) return 'cube';
  if (has('star-vs', 'snowflake', 'kimball', 'fact-dimension', 'fact & dimension', 'data-modeling', 'dimensional-modeling', 'inmon')) return 'star';
  if (has('semantic-layer', 'semantic layer', 'mot-nguon-su-that', 'etl-vs-elt', 'etl', ' elt', 'pipeline', 'data-pipeline')) return 'flow';
  if (has('forecast', 'dự báo', 'du-bao', 'time-series', 'seasonality', 'mua-vu', 'survival', 'churn-pred')) return 'line';
  if (has('waterfall', 'bắc cầu', 'dong-tien', 'dòng tiền', 'cash', 'pareto', '80-20')) return 'waterfall';
  if (has('correlation', 'regression', 'tương quan', 'scatter', 'pca', 'do-lech', 'phan-vi', 'percentile', 'outlier')) return 'scatter';
  if (has('heart', 'radar')) return 'radar';
  if (has('rfm')) return 'scatter';
  if (has('kpi', 'metric-dimension', 'canh-bao-kpi', 'goodhart', 'north-star', 'gauge', 'leading-lagging')) return 'gauge';
  if (has('vs-', 'so-sanh', 'so sánh', 'build-vs-buy', 'tco-') || cat === 'So Sánh & Lựa Chọn') return 'twoPath';
  if (has('inventory', 'tồn kho', 'ton-kho', 'roll-rate', 'abc-', 'aarrr', 'market-basket', 'rollrate', 'growth-')) return 'bar';
  return null; // -> icon theo category
}

// ── frontmatter + tách tiêu đề ──
function fm(raw) {
  raw = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---/); if (!m) return {};
  const o = {};
  for (const line of m[1].split('\n')) {
    const mm = line.match(/^(\w+):\s*(.*)$/); if (!mm) continue;
    let v = mm[2].trim();
    if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    else v = v.replace(/^'|'$/g, '');
    o[mm[1]] = v;
  }
  return o;
}
function splitTitle(title, desc) {
  let t = (title || '').trim(), sub = '';
  const cands = [[t.indexOf(':'), 'c'], [t.indexOf('?'), 'q'], [t.indexOf(' - '), 'd'], [t.indexOf('—'), 'e']].filter(([i]) => i > 0).sort((a, b) => a[0] - b[0]);
  if (cands.length) { const [i, k] = cands[0]; if (k === 'q') { sub = t.slice(i + 1); t = t.slice(0, i + 1); } else if (k === 'd') { sub = t.slice(i + 3); t = t.slice(0, i); } else { sub = t.slice(i + 1); t = t.slice(0, i); } }
  sub = (sub || desc || '').trim().replace(/^["'\-—\s]+/, '');
  const dot = sub.search(/[.!?]\s/); if (dot > 30) sub = sub.slice(0, dot + 1);
  if (sub.length > 76) {
    const dash = sub.indexOf(' - ');                          // ưu tiên cắt ở ranh giới mệnh đề (câu trọn vẹn)
    if (dash >= 30 && dash <= 88) sub = sub.slice(0, dash);
    else {
      const cut = sub.slice(0, 76), comma = cut.lastIndexOf(', ');
      if (comma >= 40) sub = sub.slice(0, comma);             // cắt ở dấu phẩy gần cuối
      else sub = cut.slice(0, cut.lastIndexOf(' ')) + '…';    // cùng lắm mới cắt từ + …
    }
  }
  if (sub && !/[.!?…]$/.test(sub)) sub += '.';
  return { t: t.trim(), sub };
}
const esc = s => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildHtml(post) {
  const cat = CAT[post.category] || DEF;
  const raw = MAP[post.slug] || resolveMotif(post.slug, post.title, post.category);
  const key = Array.isArray(raw) ? raw[0] : raw;
  const margs = Array.isArray(raw) ? raw.slice(1) : [];
  const m = key ? M[key] : null;
  // màu LUÔN theo category (đồng bộ blog/thumbnail); chart tự phối theo accent này.
  // Vài chart giữ bảng màu ngữ nghĩa riêng (growth/cohort/threshold/waterfall/rfmGrid) — chúng bỏ qua `a`.
  const a = cat;
  const { t, sub } = splitTitle(post.title, post.description || '');
  const isChart = m && m.chart, isSvg = m && m.svg;
  const icon = (m && m.icon) || cat.icon;
  const fs1 = t.length <= 20 ? 58 : t.length <= 30 ? 52 : t.length <= 42 ? 44 : 38;
  const viz = isChart ? `<div class="viz chartviz" id="viz"></div>`
    : isSvg ? `<div class="viz svgviz">${m.svg(...margs)}</div>`
    : `<div class="panel"><svg viewBox="0 0 24 24" fill="none" stroke="${a.accT}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${icon}</svg></div>`;
  const head = isChart ? `<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js"></script>` : '';
  const script = isChart ? `<script>window.addEventListener('load',function(){if(!window.echarts)return;var el=document.getElementById('viz');${m.chart(a, ...margs)}});</script>` : '';
  return `<!doctype html><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700;800;900&display=swap" rel="stylesheet">${head}
<style>
 *{margin:0;box-sizing:border-box} html,body{width:1200px;height:630px} body{font-family:'Inter',system-ui,Arial,sans-serif;--accT:${a.accT};--acc:${a.acc};--acc2:${a.acc2};color:#fff;overflow:hidden;position:relative;background:linear-gradient(150deg,#0B1120 0%,#0F1729 55%,#0A0F1C 100%)}
 .dots{position:absolute;inset:0;background-image:radial-gradient(color-mix(in srgb,var(--accT) 13%,transparent) 1.1px,transparent 1.1px);background-size:28px 28px;opacity:.42;z-index:1}
 .glow{position:absolute;right:-40px;top:-80px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--acc2) 24%,transparent),transparent 62%);z-index:1}
 .wrap{position:absolute;left:0;top:0;bottom:0;width:${isChart || isSvg ? 540 : 720}px;padding:70px 0 70px 76px;display:flex;flex-direction:column;justify-content:center;z-index:3}
 .kicker{display:flex;align-items:center;gap:13px;color:var(--accT);font-weight:800;font-size:19px;letter-spacing:3px;text-transform:uppercase}
 .kicker::before{content:'';width:34px;height:3px;border-radius:2px;background:linear-gradient(90deg,var(--acc),var(--acc2))}
 h1{font-weight:900;font-size:${fs1}px;line-height:1.08;letter-spacing:-1.3px;margin:22px 0 0;max-width:${isChart || isSvg ? 440 : 720}px}
 .sub{margin-top:18px;font-size:22px;font-weight:500;color:#9AA7BD;max-width:${isChart || isSvg ? 420 : 660}px;line-height:1.4}
 .foot{position:absolute;left:76px;bottom:48px;color:#64748B;font-weight:800;font-size:17px;letter-spacing:3px;z-index:3}.foot b{color:#E2E8F0}
 .rule{position:absolute;left:0;bottom:0;height:6px;width:100%;z-index:3;background:linear-gradient(90deg,var(--acc),var(--acc2))}
 .viz{position:absolute;z-index:2}
 .chartviz{right:40px;top:72px;bottom:72px;width:600px}
 .svgviz{right:48px;top:50%;transform:translateY(-50%);width:440px;height:440px;display:flex;align-items:center;justify-content:center}
 .svgviz .md{width:430px;height:430px;overflow:visible}
 .md .lnk{stroke:color-mix(in srgb,var(--accT) 42%,transparent);stroke-width:2;fill:none}
 .md .arr{stroke:color-mix(in srgb,var(--accT) 60%,transparent);stroke-width:2.5;marker-end:none}
 .md .ts{fill:var(--accT);font-weight:800;font-size:12px;letter-spacing:1px;font-family:Inter}
 .md .tl{fill:#E2E8F0;font-weight:800;font-size:18px;font-family:Inter}
 .panel{right:74px;top:50%;transform:translateY(-50%);width:236px;height:236px;border-radius:40px;position:absolute;z-index:2;background:color-mix(in srgb,var(--acc) 16%,transparent);border:1px solid color-mix(in srgb,var(--accT) 40%,transparent);display:flex;align-items:center;justify-content:center;box-shadow:0 36px 90px color-mix(in srgb,var(--acc) 26%,transparent)}
 .panel svg{width:128px;height:128px}
</style>
<div class="dots"></div><div class="glow"></div>
<div class="wrap"><div class="kicker">${esc(cat.kicker)}</div><h1>${esc(t)}</h1>${sub ? `<div class="sub">${esc(sub)}</div>` : ''}</div>
${viz}<div class="rule"></div><div class="foot"><b>TUẤN LA LAB</b> · BLOG</div>${script}`;
}

// ── main ──
const args = process.argv.slice(2);
const slugs = args.length ? args : fs.readdirSync(BLOG).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
let ok = 0, skip = 0;
for (const slug of slugs) {
  const file = path.join(BLOG, slug + '.md');
  if (!fs.existsSync(file)) { console.log('skip (no md):', slug); skip++; continue; }
  const d = fm(fs.readFileSync(file, 'utf8'));
  if (!d.title) { console.log('skip (no title):', slug); skip++; continue; }
  d.slug = slug;
  const html = buildHtml(d);
  fs.writeFileSync(path.join(SRC, slug + '.html'), html, 'utf8');   // lưu source
  await page.setContent(html, { waitUntil: 'load', timeout: 60000 });
  await page.evaluate(() => Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 5000))]));
  await new Promise(r => setTimeout(r, 380));
  await page.screenshot({ path: path.join(OUT, slug + '.png'), type: 'png' });
  ok++; if (ok % 20 === 0) console.log(`...${ok}`);
}
await browser.close();
console.log(`XONG: ${ok} cover, ${skip} bỏ qua. PNG -> public/blog/covers/  · source -> covers-src/`);
