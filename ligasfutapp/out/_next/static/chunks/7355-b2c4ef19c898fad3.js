"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7355],{6463:function(e,s,a){var l=a(1169);a.o(l,"useRouter")&&a.d(s,{useRouter:function(){return l.useRouter}}),a.o(l,"useSearchParams")&&a.d(s,{useSearchParams:function(){return l.useSearchParams}})},7355:function(e,s,a){a.r(s),a.d(s,{default:function(){return p}});var l=a(7437),t=a(2265),r=a(6648),o=()=>(0,l.jsxs)("div",{className:"flex items-center p-4 text-shadow-lg",children:[(0,l.jsx)(r.default,{src:"/images/logos/Icono_Nuevo.png",alt:"Nuevo Evento",className:"w-10 h-10 mr-2 opacity-50",width:100,height:100}),(0,l.jsx)("h2",{className:"text-4xl font-bold text-black opacity-50",children:"Iniciar Nuevo Torneo"})]}),c=a(4787),i=()=>{let[e,s]=(0,t.useState)([]);return(0,l.jsxs)("div",{className:"my-6 text-shadow-lg",children:[(0,l.jsxs)("div",{className:"flex justify-center items-center h-20",children:[(0,l.jsx)(r.default,{src:"/images/logos/Icono_Categoria.png",className:"shadow-lgh-20 w-12 h-12 opacity-40",alt:"Icono Categor\xeda",width:100,height:100}),(0,l.jsx)("p",{className:"text-black text-5xl opacity-50",children:"Selecciona la categor\xeda"})]}),(0,l.jsx)("div",{className:"flex items-center justify-center",children:(0,l.jsx)("div",{className:"flex justify-center items-center h-20 w-3/4",children:(0,l.jsx)(c.ZP,{value:e,onChange:e=>{s(e||[])},options:[{value:"Senior",label:"Senior"},{value:"Super Senior",label:"Super Senior"},{value:"Junior",label:"Junior"},{value:"Dorado",label:"Dorado"}],className:"w-full text-black"})})})]})},n=e=>{let{}=e;return(0,l.jsxs)("div",{className:"my-6 text-shadow-lg",children:[(0,l.jsxs)("div",{className:"flex justify-center items-center h-20",children:[(0,l.jsx)(r.default,{src:"/images/logos/Icono_Torneo.png",className:"shadow-lgh-20 w-12 h-12 opacity-40",alt:"Icono Categor\xeda",width:100,height:100}),(0,l.jsx)("p",{className:"text-black text-5xl opacity-50",children:"Escriba el nombre del torneo"})]}),(0,l.jsx)("div",{className:"flex justify-center items-center h-20",children:(0,l.jsx)("input",{className:"p-2 border border-gray-300 rounded text-black font-bold opacity-50 w-3/4 shadow-lg"})})]})},d=()=>{let[e,s]=(0,t.useState)(0),[a,o]=(0,t.useState)([]),[c,i]=(0,t.useState)([]),n=[{value:"Estadio Nacional",label:"Estadio Nacional"},{value:"Estadio Monumental",label:"Estadio Monumental"},{value:"Estadio Matute",label:"Estadio Matute"},{value:"Estadio San Marcos",label:"Estadio San Marcos"}],d=(e,s)=>{let l=[...a];l[e]=s.target.value,o(l)},x=(e,s)=>{let a=[...c];a[e]=s.target.value,i(a)};return(0,l.jsx)("div",{className:"flex flex-col items-center justify-center",children:(0,l.jsxs)("div",{className:"flex flex-col items-center w-3/4 mb-6",children:[(0,l.jsxs)("div",{className:"flex flex-col items-start mb-4 flex items-center justify-center",children:[(0,l.jsx)("label",{className:"text-xl font-bold text-black opacity-60 mb-1",children:"N\xfamero de fechas:"}),(0,l.jsx)("form",{className:"flex items-center justify-center",children:(0,l.jsx)("input",{type:"number",min:"0",value:e,onChange:e=>{let l=parseInt(e.target.value,10)||0;s(l),o(Array.from({length:l},(e,s)=>a[s]||"")),i(Array.from({length:l},(e,s)=>c[s]||""))},className:"border border-gray-300 rounded-md p-2 text-gray-700 text-center w-[100%]",autoComplete:"off",inputMode:"numeric",pattern:"\\d*"})})]}),Array.from({length:e}).map((e,s)=>(0,l.jsxs)("div",{className:"flex flex-col items-start mb-4 w-full",children:[(0,l.jsxs)("div",{className:"flex items-center mb-1 opacity-60",children:[(0,l.jsx)(r.default,{src:"/images/logos/Icono_Fecha.png",alt:"Icono de Calendario",width:20,height:20,className:"mr-2"}),(0,l.jsxs)("span",{className:"text-xl font-bold text-black opacity-60",children:["Fecha ",s+1,":"]})]}),(0,l.jsx)("input",{type:"date",value:a[s]||"",onChange:e=>d(s,e),className:"border border-gray-300 rounded-md p-2 text-gray-700 w-full"}),(0,l.jsxs)("select",{value:c[s]||"",onChange:e=>x(s,e),className:"border border-gray-300 rounded-md p-2 text-gray-700 w-full mt-2",children:[(0,l.jsx)("option",{value:"",children:"Selecciona el estadio"}),n.map((e,s)=>(0,l.jsx)("option",{value:e.value,children:e.label},s))]})]},s))]})})},x=a(6463),m=()=>{(0,x.useRouter)();let[e,s]=(0,t.useState)([{resultados:"Ganador",puntos:"2"},{resultados:"Perdedor",puntos:"0"},{resultados:"Empate",puntos:"1"},{resultados:"Desempate",puntos:"0"}]),a=(a,l)=>{let t=[...e];t[l].puntos=a.target.value,s(t)};return(0,l.jsxs)("div",{className:"mt-10",children:[(0,l.jsx)("div",{className:"mb-4",children:(0,l.jsx)("div",{className:"flex flex-col lg:flex-row items-center justify-center relative",children:(0,l.jsxs)("div",{className:"flex items-center",children:[(0,l.jsx)(r.default,{width:100,height:100,src:"/images/logos/Icono_Tabla.png",className:"shadow-lg h-10 w-10 mt-1 mr-2 opacity-60",alt:"Icono Tabla"}),(0,l.jsx)("h3",{className:"text-5xl font-bold text-black opacity-40 mr-1 text-black text-shadow-lg",children:"Tabla de puntajes"})]})})}),(0,l.jsx)("div",{className:"overflow-x-auto w-full flex items-center justify-center",children:(0,l.jsx)("div",{className:"overflow-y-auto h-[205px] custom-scrollbar custom-scrollbarH w-full md:w-2/3 lg:w-11/12 xl:w-10/12 shadow-lg",children:(0,l.jsxs)("table",{className:"w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg",children:[(0,l.jsx)("thead",{className:"bg-gray-100",children:(0,l.jsxs)("tr",{className:"border border-gray-300",children:[(0,l.jsx)("th",{className:"py-2 text-black border border-gray-300",children:"N\xb0"}),(0,l.jsx)("th",{className:"py-2 text-black border border-gray-300",children:"Resultados"}),(0,l.jsx)("th",{className:"py-2 text-black border border-gray-300",children:"Puntos"})]})}),(0,l.jsx)("tbody",{children:e.slice(0,10).map((e,s)=>(0,l.jsxs)("tr",{className:"border border-gray-300",children:[(0,l.jsx)("td",{className:"py-2 text-black text-center border border-gray-300",children:s+1}),(0,l.jsx)("td",{className:"py-2 text-black text-center border border-gray-300",children:e.resultados}),(0,l.jsx)("td",{className:"py-2 text-black text-center border border-gray-300",children:(0,l.jsx)("input",{type:"number",value:e.puntos,onChange:e=>a(e,s),className:"border border-gray-300 rounded p-1 text-center w-20"})})]},s))})]})})})]})},h=e=>{let{tipo_torneo:s,no_grupo:a,rondas:t,clasificados:o,onEditTournament:c}=e;return(0,l.jsxs)("div",{className:"flex flex-col items-center justify-center mt-10 text-2xl text-black",children:[(0,l.jsxs)("div",{className:"flex items-center opacity-60",children:[(0,l.jsx)(r.default,{width:100,height:100,src:"/images/logos/Icono_Tipo.png",className:"h-10 w-10 mr-2",alt:"Icono Posici\xf3n Actual"}),(0,l.jsx)("span",{children:"Tipo de torneo"})]}),(0,l.jsx)("div",{className:"bg-white w-1/6 flex items-center justify-center mt-3 rounded-xl border shadow-lg border-black",children:s}),(0,l.jsx)("br",{}),(0,l.jsxs)("div",{className:"flex justify-between w-full max-w-7xl",children:[(0,l.jsxs)("div",{className:"flex flex-col items-center mr-4 w-96",children:[(0,l.jsxs)("div",{className:"flex items-center",children:[(0,l.jsx)(r.default,{width:100,height:100,src:"/images/logos/Icono_Grupos.png",className:"h-10 w-10 mr-2 mt-1 opacity-60",alt:"Goles a favor"}),(0,l.jsx)("span",{className:"opacity-60",children:"N\xb0 Grupos"})]}),(0,l.jsx)("div",{className:"w-2/3 flex items-center justify-center mt-3 rounded-xl border shadow-lg ".concat(void 0===a?"bg-gray-200 text-gray-500":"bg-white border-black"),children:void 0!==a?a:"-"})]}),(0,l.jsxs)("div",{className:"flex flex-col items-center mr-4 w-96",children:[(0,l.jsxs)("div",{className:"flex items-center",children:[(0,l.jsx)(r.default,{width:100,height:100,src:"/images/logos/Icono_Rondas.png",className:"h-10 w-10 mr-2 mt-1 opacity-60",alt:"Goles en contra"}),(0,l.jsx)("span",{className:"opacity-60",children:"Rondas"})]}),(0,l.jsx)("div",{className:"bg-white w-2/3 flex items-center justify-center mt-3 rounded-xl border shadow-lg border-black",children:t})]}),(0,l.jsxs)("div",{className:"flex flex-col items-center w-96 mr-3 sm:mr-0",children:[(0,l.jsxs)("div",{className:"flex items-center opacity-60",children:[(0,l.jsx)(r.default,{width:100,height:100,src:"/images/logos/Icono_Clasificados.png",className:"h-10 w-10 mr-2 mt-1 opacity-70",alt:"Victorias"}),(0,l.jsx)("span",{children:"Clasificados"})]}),(0,l.jsx)("div",{className:"w-2/3 flex items-center justify-center mt-3 rounded-xl border shadow-lg ".concat(void 0===o?"bg-gray-200 text-gray-500":"bg-white border-black"),children:void 0!==o?o:"-"})]})]}),(0,l.jsx)("br",{}),(0,l.jsx)("div",{className:"flex items-center justify-center w-full",children:(0,l.jsxs)("button",{onClick:c,className:"bg-blue-500 hover:bg-blue-700 w-1/2 h-14 rounded-xl flex items-center justify-center shadow-xl",children:[(0,l.jsx)("a",{className:"text-white mr-4 font-semibold",children:"Editar Tipo Torneo"}),(0,l.jsx)(r.default,{width:100,height:100,src:"/images/logos/Icono_Editar_Blanco.png",className:"h-10 w-10 mr-2 mt-1",alt:"Editar"})]})})]})},u=()=>{(0,x.useRouter)();let[e,s]=(0,t.useState)(null),a=e=>{s(e)};return(0,l.jsxs)("div",{className:"mt-10",children:[(0,l.jsx)("div",{className:"mb-4",children:(0,l.jsx)("div",{className:"flex flex-col lg:flex-row items-center justify-center relative",children:(0,l.jsxs)("div",{className:"flex items-center",children:[(0,l.jsx)(r.default,{width:100,height:100,src:"/images/logos/Icono_Tabla.png",className:"shadow-lg h-10 w-10 mt-1 mr-2 opacity-60",alt:"Icono Tabla"}),(0,l.jsx)("h3",{className:"text-5xl font-bold text-black opacity-40 mr-1 text-black text-shadow-lg",children:"Tabla de equipos"})]})})}),(0,l.jsx)("div",{className:"overflow-x-auto w-full flex items-center justify-center",children:(0,l.jsx)("div",{className:"overflow-y-auto h-96 custom-scrollbar custom-scrollbarH w-full md:w-2/3 w-full lg:w-11/12 xl:w-10/12 shadow-lg",children:(0,l.jsxs)("table",{className:"w-full bg-white border border-gray-300 rounded-lg overflow-hidden",children:[(0,l.jsx)("thead",{className:"bg-gray-100",children:(0,l.jsxs)("tr",{className:"border border-gray-300",children:[(0,l.jsx)("th",{className:"py-2 text-black border border-gray-300",children:"N\xb0"}),(0,l.jsx)("th",{className:"py-2 text-black border border-gray-300",children:"Equipo"})]})}),(0,l.jsx)("tbody",{children:[{equipo:"Real Madrid"},{equipo:"FC Barcelona"},{equipo:"Atl\xe9tico Madrid"},{equipo:"Sevilla FC"},{equipo:"Valencia CF"},{equipo:"Real Betis"},{equipo:"Real Sociedad"},{equipo:"Villarreal CF"},{equipo:"Athletic Bilbao"},{equipo:"Granada CF"}].map((s,t)=>(0,l.jsxs)("tr",{className:"border border-gray-300 cursor-pointer ".concat(e===t?"bg-blue-200":""),onClick:()=>a(t),children:[(0,l.jsx)("td",{className:"py-2 text-black text-center border border-gray-300",children:t+1}),(0,l.jsx)("td",{className:"py-2 text-black text-center border border-gray-300",children:s.equipo})]},t))})]})})})]})},g=e=>{let{onAddTeam:s}=e;return(0,l.jsxs)("div",{className:"flex justify-center space-x-4 my-4",children:[(0,l.jsxs)("button",{onClick:s,className:"flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700",children:[(0,l.jsx)("span",{className:"mr-2 text-3xl",children:"Agregar Equipo"}),(0,l.jsx)(r.default,{src:"/images/logos/Icono_Nuevo_Blanco.png",alt:"Agregar Evento",className:"w-10 h-10",width:100,height:100})]}),(0,l.jsxs)("button",{className:"flex items-center bg-red-500 text-white px-4 py-2 rounded shadow-lg hover:bg-red-700",children:[(0,l.jsx)("span",{className:"mr-2 text-3xl",children:"Eliminar Equipo"}),(0,l.jsx)(r.default,{src:"/images/logos/Icono_Cancelar_Blanco.png",alt:"Eliminar Evento",className:"w-10 h-10",width:100,height:100})]})]})},b=e=>{let{onInit:s}=e;return(0,l.jsx)("div",{className:"flex justify-center space-x-4 p-4 mb-6",children:(0,l.jsxs)("button",{className:"bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center text-shadow-default shadow-lg w-1/2 text-3xl",onClick:s,children:[(0,l.jsx)(r.default,{src:"/images/logos/Icono_Confirmar_Blanco.png",alt:"Cancelar",className:"w-8 h-8 mr-2",width:100,height:100}),"Iniciar Torneo"]})})},f=a(351),j=a(6470),p=e=>{let{onInit:s}=e,[a,r]=(0,t.useState)(!1),[c,x]=(0,t.useState)(!1),[p,w]=(0,t.useState)(!1);return(0,l.jsx)("div",{className:"fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10",children:(0,l.jsxs)("div",{className:"bg-white rounded-lg overflow-y-auto max-h-screen w-full max-w-3xl",children:[(0,l.jsx)(o,{}),(0,l.jsx)("br",{})," ",(0,l.jsx)(n,{}),(0,l.jsx)(i,{})," ",(0,l.jsx)(d,{}),(0,l.jsx)(m,{}),(0,l.jsx)("br",{}),(0,l.jsx)("br",{}),(0,l.jsx)(h,{tipo_torneo:"Liga",no_grupo:void 0,rondas:3,clasificados:void 0,onEditTournament:()=>x(!0)}),c&&(0,l.jsx)(f.default,{onClose:()=>x(!1)}),(0,l.jsx)("br",{}),(0,l.jsx)(u,{}),(0,l.jsx)("br",{}),(0,l.jsx)(g,{onAddTeam:()=>w(!0)}),p&&(0,l.jsx)(j.default,{onClose:()=>w(!1)}),(0,l.jsx)("br",{}),(0,l.jsx)(b,{onInit:s})]})})}},6470:function(e,s,a){a.r(s),a.d(s,{default:function(){return i}});var l=a(7437);a(2265);var t=a(6648),r=()=>(0,l.jsxs)("div",{className:"flex items-center p-4 text-shadow-lg",children:[(0,l.jsx)(t.default,{src:"/images/logos/Icono_Nuevo.png",alt:"Nuevo Evento",className:"w-10 h-10 mr-2 opacity-50",width:100,height:100}),(0,l.jsx)("h2",{className:"text-4xl font-bold text-black opacity-50",children:"Agregar Equipo"})]}),o=()=>(0,l.jsx)("div",{className:"flex flex-col w-100 mx-auto p-4 rounded-lg text-shadow-lg text-3xl font-bold text-black opacity-70",children:(0,l.jsxs)("div",{className:"flex items-center mb-4",children:[(0,l.jsx)(t.default,{src:"/images/logos/Icono_Equipo.png",alt:"\xcdcono de G\xe9nero",className:"mr-2 w-11 h-11 opacity-70",width:100,height:100}),(0,l.jsx)("label",{htmlFor:"genero",className:"mr-2 text-gray-700",children:"Equipo:"}),(0,l.jsxs)("select",{id:"genero",name:"genero",className:"flex-grow border border-gray-300 rounded-md p-2",children:[(0,l.jsx)("option",{value:"Real Madrid",children:"Real Madrid"}),(0,l.jsx)("option",{value:"Barcelona",children:"Barcelona"}),(0,l.jsx)("option",{value:"Villa Real",children:"Villa Real"}),(0,l.jsx)("option",{value:"Levante",children:"Levante"})]})]})}),c=e=>{let{onClose:s}=e;return(0,l.jsxs)("div",{className:"flex justify-center space-x-4 p-4 mb-6",children:[(0,l.jsxs)("button",{className:"bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center text-shadow-default shadow-lg w-1/2 text-3xl",onClick:s,children:[(0,l.jsx)(t.default,{src:"/images/logos/Icono_Cancelar_Blanco.png",alt:"Cancelar",className:"w-8 h-8 mr-2",width:100,height:100}),"Cancelar"]}),(0,l.jsxs)("button",{className:"bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center text-shadow-default shadow-lg w-1/2 text-3xl",onClick:s,children:[(0,l.jsx)(t.default,{src:"/images/logos/Icono_Guardar_Blanco.png",alt:"Guardar cambios",className:"w-8 h-8 mr-2",width:100,height:100}),"Agregar"]})]})},i=e=>{let{onInit:s,onClose:a}=e;return(0,l.jsx)("div",{className:"fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10",children:(0,l.jsxs)("div",{className:"bg-white rounded-lg overflow-y-auto max-h-screen w-full max-w-3xl",children:[(0,l.jsx)(r,{}),(0,l.jsx)("br",{}),(0,l.jsx)(o,{}),(0,l.jsx)("br",{}),(0,l.jsx)(c,{onClose:a})]})})}},351:function(e,s,a){a.r(s),a.d(s,{default:function(){return i}});var l=a(7437);a(2265);var t=a(6648),r=()=>(0,l.jsxs)("div",{className:"flex items-center p-4 text-shadow-lg",children:[(0,l.jsx)(t.default,{src:"/images/logos/Icono_Editar.png",alt:"Nuevo Evento",className:"w-10 h-10 mr-2 opacity-50",width:100,height:100}),(0,l.jsx)("h2",{className:"text-4xl font-bold text-black opacity-50",children:"Editar Tipo Torneo"})]}),o=()=>(0,l.jsxs)("div",{className:"flex flex-col w-100 mx-auto p-4 rounded-lg text-shadow-lg text-3xl font-bold text-black opacity-70",children:[(0,l.jsxs)("div",{className:"flex items-center mb-4",children:[(0,l.jsx)(t.default,{src:"/images/logos/Icono_Tipo.png",alt:"\xcdcono de Tipo Torneo",className:"mr-2 w-11 h-11 opacity-70",width:100,height:100}),(0,l.jsx)("label",{htmlFor:"genero",className:"mr-2 text-gray-700",children:"Tipo Torneo:"}),(0,l.jsxs)("select",{id:"genero",name:"genero",className:"flex-grow border border-gray-300 rounded-md p-2",children:[(0,l.jsx)("option",{value:"Liga",children:"Liga"}),(0,l.jsx)("option",{value:"Play-Off",children:"Play-Off"}),(0,l.jsx)("option",{value:"Liga/Play-Off",children:"Liga/Play-Off"})]})]}),(0,l.jsxs)("div",{className:"flex items-center mb-4",children:[(0,l.jsx)(t.default,{src:"/images/logos/Icono_Rondas.png",alt:"\xcdcono de Rondas",className:"mr-2 w-11 h-11 opacity-70",width:100,height:100}),(0,l.jsx)("label",{htmlFor:"rondas",className:"mr-2 text-gray-700",children:"Rondas:"}),(0,l.jsx)("input",{type:"number",id:"rondas",name:"rondas",placeholder:"Inicial",className:"w-40 border border-gray-300 rounded-md p-2"})]}),(0,l.jsxs)("div",{className:"flex items-center mb-4",children:[(0,l.jsx)(t.default,{src:"/images/logos/Icono_Grupos.png",alt:"\xcdcono de N\xb0 Grupos",className:"mr-2 w-11 h-11 opacity-70",width:100,height:100}),(0,l.jsx)("label",{htmlFor:"no_grupos",className:"mr-2 text-gray-700",children:"N\xb0 Grupos:"}),(0,l.jsx)("input",{type:"number",id:"no_grupos",name:"no_grupos",placeholder:"Inicial",className:"w-40 border border-gray-300 rounded-md p-2"})]}),(0,l.jsxs)("div",{className:"flex items-center mb-4",children:[(0,l.jsx)(t.default,{src:"/images/logos/Icono_Clasificados.png",alt:"\xcdcono de Clasificados",className:"mr-2 w-11 h-11 opacity-70",width:100,height:100}),(0,l.jsx)("label",{htmlFor:"clasificados",className:"mr-2 text-gray-700",children:"Clasificados:"}),(0,l.jsx)("input",{type:"number",id:"clasificados",name:"clasificados",placeholder:"Inicial",className:"w-40 border border-gray-300 rounded-md p-2"})]})]}),c=e=>{let{onClose:s}=e;return(0,l.jsxs)("div",{className:"flex justify-center space-x-4 p-4 mb-6",children:[(0,l.jsxs)("button",{className:"bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center text-shadow-default shadow-lg w-1/2 text-3xl",onClick:s,children:[(0,l.jsx)(t.default,{src:"/images/logos/Icono_Cancelar_Blanco.png",alt:"Cancelar",className:"w-8 h-8 mr-2",width:100,height:100}),"Cancelar"]}),(0,l.jsxs)("button",{className:"bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center text-shadow-default shadow-lg w-1/2 text-3xl",onClick:s,children:[(0,l.jsx)(t.default,{src:"/images/logos/Icono_Guardar_Blanco.png",alt:"Guardar cambios",className:"w-8 h-8 mr-2",width:100,height:100}),"Guardar Cambios"]})]})},i=e=>{let{onInit:s,onClose:a}=e;return(0,l.jsx)("div",{className:"fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10",children:(0,l.jsxs)("div",{className:"bg-white rounded-lg overflow-y-auto max-h-screen w-full max-w-3xl",children:[(0,l.jsx)(r,{}),(0,l.jsx)("br",{}),(0,l.jsx)(o,{}),(0,l.jsx)("br",{}),(0,l.jsx)(c,{onClose:a})]})})}}}]);