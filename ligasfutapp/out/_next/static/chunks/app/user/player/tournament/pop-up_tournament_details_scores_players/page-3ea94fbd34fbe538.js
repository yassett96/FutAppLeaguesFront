(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4189],{4954:function(e,t,s){Promise.resolve().then(s.bind(s,4466))},4466:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return n}});var a=s(7437);s(2265);var l=s(6648),c=()=>(0,a.jsxs)("div",{className:"flex items-center p-4 text-shadow-lg",children:[(0,a.jsx)(l.default,{width:100,height:100,src:"/images/logos/Icono_Detalle_Blanco.png",alt:"Nuevo Evento",className:"w-12 h-12 mr-2 opacity-50"}),(0,a.jsx)("h2",{className:"text-4xl font-bold text-white",children:"Detalle Goleador"})]}),o=()=>(0,a.jsx)("div",{className:"bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto xl1800:w-[97%] ml-[1%] h-auto mb-6",children:(0,a.jsx)("div",{className:"overflow-x-auto overflow-y-auto custom-scrollbar h-[615px]",children:(0,a.jsxs)("table",{className:"w-full table-auto bg-gray-700",children:[(0,a.jsx)("thead",{className:"bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10",style:{clipPath:"inset(0 0 0 0 round 0px)"},children:(0,a.jsxs)("tr",{children:[(0,a.jsx)("th",{className:"py-3 px-6 text-left text-sm sm590:text-base sm670:text-xl font-medium tracking-tight",children:"N\xb0"}),(0,a.jsx)("th",{className:"py-3 px-14 text-left text-sm sm590:text-base sm670:text-xl font-medium tracking-tight",children:"Equipo"}),(0,a.jsx)("th",{className:"py-3 px-6 text-left text-sm sm590:text-base sm670:text-xl font-medium tracking-tight",children:"N\xb0 Goles"}),(0,a.jsx)("th",{className:"py-3 px-6 text-left text-sm sm590:text-base sm670:text-xl font-medium tracking-tight",children:"Fecha"})]})}),(0,a.jsx)("tbody",{className:"bg-white",children:[{equipo:"Real Madrid",goles:3,fecha:"12/04/2024"},{equipo:"FC Barcelona",goles:2,fecha:"13/04/2024"},{equipo:"Atl\xe9tico Madrid",goles:1,fecha:"14/04/2024"},{equipo:"Sevilla FC",goles:2,fecha:"15/04/2024"},{equipo:"Valencia CF",goles:1,fecha:"16/04/2024"},{equipo:"Real Sociedad",goles:3,fecha:"17/04/2024"},{equipo:"Villarreal CF",goles:2,fecha:"18/04/2024"},{equipo:"Real Betis",goles:1,fecha:"19/04/2024"},{equipo:"Athletic Bilbao",goles:2,fecha:"20/04/2024"},{equipo:"Getafe CF",goles:1,fecha:"21/04/2024"},{equipo:"Granada CF",goles:3,fecha:"22/04/2024"},{equipo:"Osasuna",goles:2,fecha:"23/04/2024"},{equipo:"Levante UD",goles:1,fecha:"24/04/2024"},{equipo:"Celta de Vigo",goles:2,fecha:"25/04/2024"},{equipo:"M\xe1laga CF",goles:1,fecha:"26/04/2024"}].map((e,t)=>(0,a.jsxs)("tr",{className:"border-b border-gray-200 cursor-pointer",children:[(0,a.jsx)("td",{className:"py-4 px-6 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center",children:t+1}),(0,a.jsx)("td",{className:"py-4 px-14 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center",children:e.equipo}),(0,a.jsx)("td",{className:"py-4 px-6 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center",children:e.goles}),(0,a.jsx)("td",{className:"py-4 px-6 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center",children:e.fecha})]},t))})]})})}),i=s(3984),n=e=>{let{onClose:t}=e;return(0,a.jsx)("div",{className:"fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30",children:(0,a.jsxs)("div",{className:"bg-blue-900 rounded-lg overflow-auto w-full max-w-3xl max-h-[97vh]",children:[(0,a.jsx)(c,{}),(0,a.jsx)("br",{}),(0,a.jsx)(o,{}),(0,a.jsx)("div",{className:"flex items-center justify-center mb-5",children:(0,a.jsx)(i.Z,{text:"Aceptar",color:"#24b364",width:"20%",height:"40px",onClick:t,className:"",icon:"/images/logos/Icono_Confirmar_Blanco.png"})})]})})}},3984:function(e,t,s){"use strict";var a=s(7437),l=s(2265);t.Z=e=>{let{text:t,color:s,width:c,height:o,onClick:i,className:n,icon:r,classNameText:x="",classNameIcon:h="w-6 h-6",disabled:m=!1}=e,[d,u]=(0,l.useState)(s),[p,g]=(0,l.useState)({}),[f,b]=(0,l.useState)(!1),[j,N]=(0,l.useState)(!1),y=(e,t)=>{let s=parseInt(e.replace("#",""),16),a=Math.round(2.55*t),l=(s>>16)+a,c=(s>>8&255)+a,o=(255&s)+a;return"#"+(16777216+(l<255?l<1?0:l:255)*65536+(c<255?c<1?0:c:255)*256+(o<255?o<1?0:o:255)).toString(16).slice(1)},w="string"!=typeof r;return(0,a.jsxs)("button",{className:"custom-button shadow-lg flex items-center justify-center ".concat(n),style:{backgroundColor:d,width:c,height:o,borderRadius:"8px",position:"relative",overflow:"hidden"},onMouseEnter:()=>{u(y(s,-10)),N(!0)},onMouseLeave:()=>{u(s),N(!1)},onClick:e=>{let t=e.currentTarget.getBoundingClientRect(),s=Math.max(t.width,t.height),a=e.clientX-t.left-s/2,l=e.clientY-t.top-s/2;g({width:"".concat(s,"px"),height:"".concat(s,"px"),top:"".concat(l,"px"),left:"".concat(a,"px")}),b(!0),setTimeout(()=>{b(!1)},600),i&&i()},disabled:m,children:[f&&(0,a.jsx)("span",{className:"ripple",style:{...p,backgroundColor:"rgba(255, 255, 255, 0.5)"}}),r&&(0,a.jsx)("span",{className:"mr-2",children:w?l.cloneElement(r,{className:"mr-2 ".concat(j?"ml-0":"-ml-2"),size:20}):(0,a.jsx)("img",{src:r,alt:"icon",className:"".concat(h)})}),(0,a.jsx)("span",{className:"button-text text-center ".concat(x),children:t})]})}}},function(e){e.O(0,[6648,2971,7023,1744],function(){return e(e.s=4954)}),_N_E=e.O()}]);