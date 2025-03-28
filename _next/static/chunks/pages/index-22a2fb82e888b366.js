(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(932)}])},591:function(e,r,t){"use strict";var n=t(2734),i=t(5812);let a=()=>{let e=(0,n.Z)();return{primaryFilled:{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main},primaryLight:{color:e.palette.primary.main,backgroundColor:(0,i.E)(e.palette.primary.main,.16)},secondaryFilled:{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main},secondaryLight:{color:e.palette.secondary.main,backgroundColor:(0,i.E)(e.palette.secondary.main,.16)},successFilled:{color:e.palette.success.contrastText,backgroundColor:e.palette.success.main},successLight:{color:e.palette.success.main,backgroundColor:(0,i.E)(e.palette.success.main,.16)},errorFilled:{color:e.palette.error.contrastText,backgroundColor:e.palette.error.main},errorLight:{color:e.palette.error.main,backgroundColor:(0,i.E)(e.palette.error.main,.16)},warningFilled:{color:e.palette.warning.contrastText,backgroundColor:e.palette.warning.main},warningLight:{color:e.palette.warning.main,backgroundColor:(0,i.E)(e.palette.warning.main,.16)},infoFilled:{color:e.palette.info.contrastText,backgroundColor:e.palette.info.main},infoLight:{color:e.palette.info.main,backgroundColor:(0,i.E)(e.palette.info.main,.16)}}};r.Z=a},932:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return G}});var n=t(5893),i=t(6242),a=t(948),o=t(4267),s=t(7357),l=t(7906),c=t(3321),d=t(3816),x=t(3184),p=t(295),h=t(3252),u=t(5861),m=t(2882),g=t(3730),f=t(7918),j=t(6010),y=t(591);let b=e=>{let{sx:r,skin:t,color:i,rounded:a}=e,o=(0,y.Z)(),s={primary:{...o.primaryLight},secondary:{...o.secondaryLight},success:{...o.successLight},error:{...o.errorLight},warning:{...o.warningLight},info:{...o.infoLight}},l={...e};return l.rounded=void 0,(0,n.jsx)(f.Z,{...l,variant:"filled",className:(0,j.Z)({"MuiChip-rounded":a,"MuiChip-light":"light"===t}),sx:"light"===t&&i?Object.assign(s[i],r):r})};var Z=t(7294),v=t(9661),w=t(2734),C=t(1796);let k=(0,Z.forwardRef)((e,r)=>{let{sx:t,src:i,skin:a,color:o}=e,s=(0,w.Z)(),l=(0,y.Z)(),c=(e,r)=>"light"===e?{...l["".concat(r,"Light")]}:"light-static"===e?{color:l["".concat(r,"Light")].color,backgroundColor:(0,C.$n)(s.palette[r].main,.88)}:{...l["".concat(r,"Filled")]},d={primary:c(a,"primary"),secondary:c(a,"secondary"),success:c(a,"success"),error:c(a,"error"),warning:c(a,"warning"),info:c(a,"info")};return(0,n.jsx)(v.Z,{ref:r,...e,sx:!i&&a&&o?Object.assign(d[o],t):t})});k.defaultProps={skin:"filled",color:"primary"};let S=e=>{let{pricingTable:r}=e,t=e=>"boolean"==typeof e.pro?(0,n.jsx)(s.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,n.jsx)(k,{skin:"light",sx:{width:20,height:20},color:e.pro?"primary":"error",children:(0,n.jsx)(g.Z,{fontSize:"0.875rem",icon:e.pro?"tabler:check":"tabler:x"})})}):(0,n.jsx)(b,{rounded:!0,size:"small",skin:"light",label:e.pro,color:"primary"});return r?(0,n.jsxs)("div",{children:[(0,n.jsxs)(s.Z,{sx:{mb:10,textAlign:"center"},children:[(0,n.jsx)(u.Z,{variant:"h2",sx:{mb:2.5},children:"Elegi el mejor plan para vos"}),(0,n.jsx)(u.Z,{sx:{color:"text.disabled"},children:"Funcionalidades para diferentes roles: administradores, jugadores y planilleros"})]}),(0,n.jsx)(s.Z,{sx:{mt:8,borderRadius:1,border:"1px solid",borderColor:"divider","& .MuiTableRow-root:nth-of-type(even)":{backgroundColor:"action.hover"}},children:(0,n.jsx)(m.Z,{children:(0,n.jsxs)(l.Z,{children:[(0,n.jsx)(x.Z,{children:(0,n.jsx)(d.Z,{children:r.header.map((e,r)=>(0,n.jsx)(h.Z,{children:(0,n.jsxs)(s.Z,{sx:{display:"flex",flexDirection:"column",alignItems:0===r?"flex-start":"center"},children:[e.isPro?(0,n.jsx)(s.Z,{sx:{position:"relative"},children:(0,n.jsx)(u.Z,{noWrap:!0,variant:"body2",sx:{mb:1,fontWeight:500,color:"text.primary",lineHeight:1.154},children:e.title})}):(0,n.jsx)(u.Z,{noWrap:!0,variant:"body2",sx:{mb:1,fontWeight:500,color:"text.primary",lineHeight:1.154},children:e.title}),(0,n.jsx)(u.Z,{noWrap:!0,variant:"body2",sx:{color:"text.disabled",textTransform:"capitalize"},children:e.subtitle})]})},r))})}),(0,n.jsxs)(p.Z,{children:[r.rows.map((e,r)=>(0,n.jsxs)(d.Z,{sx:{"& .MuiTableCell-root":{py:e=>"".concat(e.spacing(3)," !important")}},children:[(0,n.jsx)(h.Z,{sx:{whiteSpace:"nowrap"},children:(0,n.jsx)(u.Z,{sx:{color:"text.secondary"},children:e.feature})}),(0,n.jsx)(h.Z,{children:(0,n.jsx)(s.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,n.jsx)(k,{skin:"light",sx:{width:20,height:20},color:e.starter?"primary":"error",children:(0,n.jsx)(g.Z,{fontSize:"0.875rem",icon:e.starter?"tabler:check":"tabler:x"})})})}),(0,n.jsx)(h.Z,{align:"center",children:t(e)}),(0,n.jsx)(h.Z,{children:(0,n.jsx)(s.Z,{sx:{display:"flex",justifyContent:"center"},children:(0,n.jsx)(k,{skin:"light",sx:{width:20,height:20},color:e.enterprise?"primary":"secondary",children:(0,n.jsx)(g.Z,{fontSize:"0.875rem",icon:e.enterprise?"tabler:check":"tabler:x"})})})})]},r)),(0,n.jsxs)(d.Z,{sx:{"& .MuiTableCell-root":{border:0}},children:[(0,n.jsx)(h.Z,{}),(0,n.jsx)(h.Z,{align:"center",sx:{whiteSpace:"nowrap"},children:(0,n.jsx)(c.Z,{variant:"tonal",children:"Elegir Plan"})}),(0,n.jsx)(h.Z,{align:"center",sx:{whiteSpace:"nowrap"},children:(0,n.jsx)(c.Z,{variant:"tonal",children:"Elegir Plan"})}),(0,n.jsx)(h.Z,{align:"center",sx:{whiteSpace:"nowrap"},children:(0,n.jsx)(c.Z,{variant:"contained",children:"Elegir Plan"})})]})]})]})})})]}):null};var T=t(1664),P=t.n(T);let z=(0,a.ZP)("img")(e=>{let{theme:r}=e;return{borderRadius:r.shape.borderRadius,position:"absolute",left:"50%",translate:"-50%",bottom:-250,zIndex:2,maxHeight:450,marginTop:r.spacing(12),marginBottom:r.spacing(12),[r.breakpoints.down("lg")]:{maxHeight:300,bottom:-150}}}),F=()=>(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u.Z,{variant:"h1",sx:{fontWeight:700,mb:8,color:e=>e.palette.primary.contrastText},children:"Lleva tu liga a otro nivel"}),(0,n.jsx)(u.Z,{variant:"h5",component:"h2",sx:{mb:8,maxWidth:700,color:e=>e.palette.grey[300]},children:"Simplifica la gesti\xf3n de tu liga y ofrece a tus equipos y jugadores una mejor experiencia."}),(0,n.jsxs)(s.Z,{sx:{display:"flex",gap:4,mb:8,"& button":{whiteSpace:"nowrap"}},children:[(0,n.jsx)(P(),{href:"#tabla-cuentas",children:(0,n.jsx)(c.Z,{variant:"contained",color:"secondary",children:"Solicitar cuenta"})}),(0,n.jsx)(P(),{href:"#features",children:(0,n.jsx)(c.Z,{variant:"outlined",color:"secondary",children:"Saber mas"})})]}),(0,n.jsx)(z,{alt:"demo app image",src:"/images/pages/demo-app.png"})]});var I=t(1426);let R=()=>(0,n.jsxs)(s.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:[(0,n.jsx)(b,{label:"Features",skin:"light",color:"primary",sx:{mb:8}}),(0,n.jsx)(u.Z,{component:"h1",variant:"h2",sx:{textAlign:"center",fontWeight:700,mb:4,color:e=>e.palette.primary.main},children:"Simplifica la gesti\xf3n de tu liga"}),(0,n.jsx)(u.Z,{variant:"body1",component:"h2",sx:{textAlign:"center",mb:16,maxWidth:700,color:e=>e.palette.grey[500]},children:"Funcionalidades para diferentes roles: administradores, jugadores y planilleros"}),(0,n.jsxs)(I.Z,{container:!0,spacing:6,sx:{maxWidth:900},children:[(0,n.jsx)(I.Z,{sm:4,children:(0,n.jsxs)(s.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,p:6,borderRadius:1,transitionDuration:"0.2s",transitionTimingFunction:"ease-in","&:hover ":{boxShadow:e=>e.shadows[3]}},children:[(0,n.jsx)(s.Z,{sx:{color:e=>e.palette.primary.main},children:(0,n.jsx)(g.Z,{icon:"tabler:social",fontSize:48})}),(0,n.jsx)(u.Z,{component:"h3",variant:"h4",textAlign:"center",children:"Comunicaciones"}),(0,n.jsx)(u.Z,{variant:"body2",sx:{textAlign:"center",color:e=>e.palette.grey[500]},children:"Conecta con delegados y jugadores de forma aut\xf3noma para mantener informado de los distintos acontecimientos de tu liga"})]})}),(0,n.jsx)(I.Z,{sm:4,children:(0,n.jsxs)(s.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,p:6,borderRadius:1,transitionDuration:"0.2s",transitionTimingFunction:"ease-in","&:hover ":{boxShadow:e=>e.shadows[3]}},children:[(0,n.jsx)(s.Z,{sx:{color:e=>e.palette.primary.main},children:(0,n.jsx)(g.Z,{icon:"tabler:ball-football",fontSize:48})}),(0,n.jsx)(u.Z,{component:"h3",variant:"h4",textAlign:"center",children:"Gesti\xf3n Liga"}),(0,n.jsx)(u.Z,{variant:"body2",sx:{textAlign:"center",color:e=>e.palette.grey[500]},children:"Facilita la organizaci\xf3n y desarrollo de la liga o torneo, automatizando creaci\xf3n de fixture y c\xe1lculo de tablas"})]})}),(0,n.jsx)(I.Z,{sm:4,children:(0,n.jsxs)(s.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,p:6,borderRadius:1,transitionDuration:"0.2s",transitionTimingFunction:"ease-in","&:hover ":{boxShadow:e=>e.shadows[3]}},children:[(0,n.jsx)(s.Z,{sx:{color:e=>e.palette.primary.main},children:(0,n.jsx)(g.Z,{icon:"tabler:arrow-big-up-line",fontSize:48})}),(0,n.jsx)(u.Z,{component:"h3",variant:"h4",textAlign:"center",children:"Ingreso Resultados"}),(0,n.jsx)(u.Z,{variant:"body2",sx:{textAlign:"center",color:e=>e.palette.grey[500]},children:"Planilleros ingresan resultados al instante digitalmente, no m\xe1s planillas y papeleo"})]})}),(0,n.jsx)(I.Z,{sm:4,children:(0,n.jsxs)(s.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,p:6,borderRadius:1,transitionDuration:"0.2s",transitionTimingFunction:"ease-in","&:hover ":{boxShadow:e=>e.shadows[3]}},children:[(0,n.jsx)(s.Z,{sx:{color:e=>e.palette.primary.main},children:(0,n.jsx)(g.Z,{icon:"tabler:3d-cube-sphere",fontSize:48})}),(0,n.jsx)(u.Z,{component:"h3",variant:"h4",textAlign:"center",children:"Informaci\xf3n Online"}),(0,n.jsx)(u.Z,{variant:"body2",sx:{textAlign:"center",color:e=>e.palette.grey[500]},children:"Jugadores obtienen informaci\xf3n online de goles, resultados, actualizaci\xf3n de tablas y sancionados"})]})}),(0,n.jsx)(I.Z,{sm:4,children:(0,n.jsxs)(s.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,p:6,borderRadius:1,transitionDuration:"0.2s",transitionTimingFunction:"ease-in","&:hover ":{boxShadow:e=>e.shadows[3]}},children:[(0,n.jsx)(s.Z,{sx:{color:e=>e.palette.primary.main},children:(0,n.jsx)(g.Z,{icon:"tabler:diamond",fontSize:48})}),(0,n.jsx)(u.Z,{component:"h3",variant:"h4",textAlign:"center",children:"Datos Hist\xf3ricos"}),(0,n.jsx)(u.Z,{variant:"body2",sx:{textAlign:"center",color:e=>e.palette.grey[500]},children:"Registro hist\xf3rico de la liga, palmar\xe9s, estad\xedsticas, comparativas de desempe\xf1o a nivel equipo o jugador"})]})}),(0,n.jsx)(I.Z,{sm:4,children:(0,n.jsxs)(s.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,p:6,borderRadius:1,transitionDuration:"0.2s",transitionTimingFunction:"ease-in","&:hover ":{boxShadow:e=>e.shadows[3]}},children:[(0,n.jsx)(s.Z,{sx:{color:e=>e.palette.primary.main},children:(0,n.jsx)(g.Z,{icon:"tabler:fingerprint",fontSize:48})}),(0,n.jsx)(u.Z,{component:"h3",variant:"h4",textAlign:"center",children:"Fidelizaci\xf3n"}),(0,n.jsx)(u.Z,{variant:"body2",sx:{textAlign:"center",color:e=>e.palette.grey[500]},children:"Mant\xe9n a tu audiencia conectada y cultiva lealtad a hacia tu liga"})]})})]})]}),A=()=>(0,n.jsxs)(s.Z,{sx:{minHeight:"100vh",p:6,position:"relative",bgcolor:"rgba(0,0,0,.4)",display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,n.jsx)(s.Z,{sx:{position:"absolute",height:"100%",width:"100%",zIndex:-1},children:(0,n.jsx)("img",{src:"/images/pages/football-field.jpg",alt:"pricing bg",style:{width:"100%",height:"100%",objectFit:"cover"}})}),(0,n.jsx)(u.Z,{component:"p",variant:"h1",color:e=>e.palette.primary.contrastText,sx:{textAlign:"center",maxWidth:700},children:"Lleva tus ligas y torneos a otro nivel con Futapp Leagues. Automatiza y facilita la gesti\xf3n de los distintos roles, entregado a los jugadores una mejor experiencia."})]});var L=t(2293),D=t(5582),E=t(155),W=t(6148);let q=()=>{let e=(0,w.Z)();return(0,n.jsx)(s.Z,{sx:{position:"fixed",zIndex:2,top:16,left:"50%",translate:"-50%",width:"100%",bgcolor:"transparent",[e.breakpoints.down("lg")]:{top:0}},children:(0,n.jsx)(L.Z,{position:"static",color:"transparent",sx:{boxShadow:"none"},children:(0,n.jsx)(D.Z,{sx:{bgcolor:e=>e.palette.secondary.main,borderRadius:1,boxShadow:e=>e.shadows[10],[e.breakpoints.down("lg")]:{borderRadius:0}},children:(0,n.jsxs)(E.Z,{children:[(0,n.jsx)(s.Z,{sx:{display:"flex",alignContent:"center",flexGrow:1},children:(0,n.jsx)(W.Z,{})}),(0,n.jsxs)(s.Z,{sx:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",gap:6},children:[(0,n.jsx)(P(),{href:"/register",children:(0,n.jsx)(c.Z,{variant:"text",color:"primary",children:"Registrarse"})}),(0,n.jsx)(P(),{href:"/login",children:(0,n.jsx)(c.Z,{variant:"tonal",color:"primary",children:"Ingresar"})})]})]})})})})};var H=t(7340),_=t(6886);let B=(0,a.ZP)(s.Z)(e=>{let{theme:r}=e;return{display:"flex",borderRadius:"5px",alignItems:"center",flexDirection:"column",padding:r.spacing(6),backgroundColor:r.palette.action.hover}}),M=()=>(0,n.jsx)(s.Z,{sx:{bgcolor:"action:hover"},children:(0,n.jsx)(s.Z,{sx:{bgcolor:"secondary.contrastText",borderTopLeftRadius:100,borderTopRightRadius:100},children:(0,n.jsxs)(D.Z,{sx:{textAlign:"center",pt:16,pb:4},children:[(0,n.jsx)(b,{rounded:!0,size:"small",skin:"light",color:"secondary",label:"Contacto"}),(0,n.jsx)(u.Z,{variant:"h1",sx:{my:2,color:"secondary.main"},children:"\xbfTodavia tenes dudas?"}),(0,n.jsx)(u.Z,{variant:"subtitle1",sx:{mb:6,color:"secondary.dark"},children:"Si tenes preguntas podes enviarnos un mensaje a nuestro correo electr\xf3nico"}),(0,n.jsx)(_.ZP,{container:!0,spacing:6,children:(0,n.jsx)(_.ZP,{item:!0,xs:12,md:12,children:(0,n.jsxs)(B,{children:[(0,n.jsx)(k,{color:"secondary",skin:"light",variant:"rounded",sx:{mb:2.5,height:38,width:38},children:(0,n.jsx)(g.Z,{fontSize:"1.75rem",icon:"tabler:mail"})}),(0,n.jsx)(u.Z,{href:"/",variant:"h4",component:P(),onClick:e=>e.preventDefault(),sx:{mb:2.5,textDecoration:"none",color:"secondary.main","&:hover":{color:"primary.main"}},children:"contacto.futapp@gmail.com"}),(0,n.jsx)(u.Z,{sx:{color:"secondary.main"},children:"Te responderemos lo antes posible"})]})})}),(0,n.jsxs)(s.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center",gap:6,mt:8},children:[(0,n.jsxs)(s.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,n.jsx)(W.Z,{variant:"secondary"}),(0,n.jsx)(u.Z,{variant:"body2",sx:{ml:2,mt:2,color:"secondary.main"},children:"\xa9"}),(0,n.jsx)(u.Z,{variant:"body2",sx:{mt:2,color:"secondary.main"},children:new Date().getFullYear()})]}),(0,n.jsxs)(s.Z,{sx:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",mt:2},children:[(0,n.jsx)(P(),{href:"/",passHref:!0,children:(0,n.jsx)(u.Z,{variant:"body1",sx:{ml:2,color:"secondary.main"},children:"Privacy"})}),(0,n.jsx)(P(),{href:"/",passHref:!0,children:(0,n.jsx)(u.Z,{variant:"body1",sx:{ml:2,color:"secondary.main"},children:"Terms"})}),(0,n.jsx)(P(),{href:"/",passHref:!0,children:(0,n.jsx)(u.Z,{variant:"body1",sx:{ml:2,color:"secondary.main"},children:"Contact"})}),(0,n.jsx)(P(),{href:"/",passHref:!0,children:(0,n.jsx)(u.Z,{variant:"body1",sx:{ml:2,color:"secondary.main"},children:"About Us"})})]})]})]})})}),O={pricingPlans:[{imgHeight:180,title:"Jugador",monthlyPrice:0,currentPlan:!1,popularPlan:!1,subtitle:"A simple start for everyone",imgSrc:"/images/pages/cuenta-jugador.png",planBenefits:["100 responses a month","Unlimited forms and surveys","Unlimited fields","Basic form creation tools","Up to 2 subdomains"]},{imgHeight:180,monthlyPrice:49,title:"Organizador",popularPlan:!1,currentPlan:!1,subtitle:"For small to medium businesses",imgSrc:"/images/pages/cuenta-organizador.png",planBenefits:["Unlimited responses","Unlimited forms and surveys","Instagram profile page","Google Docs integration","Custom “Thank you” page"]},{imgHeight:180,monthlyPrice:99,popularPlan:!1,currentPlan:!1,title:"Planillero",subtitle:"Solution for big organizations",imgSrc:"/images/pages/cuenta-planillero.png",planBenefits:["PayPal payments","Logic Jumps","File upload with 5GB storage","Custom domain support","Stripe integration"]}],faq:[{id:"responses-limit",question:"What counts towards the 100 responses limit?",answer:"We count all responses submitted through all your forms in a month. If you already received 100 responses this month, you won’t be able to receive any more of them until next month when the counter resets."},{id:"process-payments",question:"How do you process payments?",answer:"We accept Visa\xae, MasterCard\xae, American Express\xae, and PayPal\xae. So you can be confident that your credit card information will be kept safe and secure."},{id:"payment-methods",question:"What payment methods do you accept?",answer:"2Checkout accepts all types of credit and debit cards."},{id:"money-back-guarantee",question:"Do you have a money-back guarantee?",answer:"Yes. You may request a refund within 30 days of your purchase without any additional explanations."},{id:"more-questions",question:"I have more questions. Where can I get help?",answer:"Please contact us if you have any other questions or concerns. We’re here to help!"}],pricingTable:{header:[{title:"Funcionalidad",subtitle:""},{title:"Jugador",subtitle:""},{title:"Planillero",subtitle:""},{title:"Organizador",subtitle:""}],rows:[{pro:!0,starter:!0,enterprise:!0,feature:"Ver tabla de posiciones"},{pro:!0,starter:!0,enterprise:!0,feature:"Ver tabla de goleadores"},{pro:!0,starter:!0,enterprise:!0,feature:"Ver fixture"},{pro:!0,starter:!0,enterprise:!0,feature:"Ver sancionados"},{pro:!0,starter:!1,enterprise:!0,feature:"Cargar partido"},{pro:!1,starter:!1,enterprise:!0,feature:"Crear fixture"},{pro:!1,starter:!1,enterprise:!0,feature:"Crear equipo"},{pro:!1,starter:!1,enterprise:!0,feature:"Invitar jugador"},{pro:!1,starter:!0,enterprise:!0,feature:"Editar jugador"},{pro:!1,starter:!1,enterprise:!0,feature:"Editar equipo"},{pro:!1,starter:!1,enterprise:!0,feature:"Actualizar sancionados"},{pro:!1,starter:!0,enterprise:!0,feature:"Estad\xedsticas del equipo"},{pro:!1,starter:!0,enterprise:!0,feature:"Palmar\xe9s del equipo"},{pro:!1,starter:!0,enterprise:!0,feature:"Estad\xedsticas del jugador"}]}},N=(0,a.ZP)(o.Z)(e=>{let{theme:r}=e;return{padding:"".concat(r.spacing(20,36)," !important"),[r.breakpoints.down("xl")]:{padding:"".concat(r.spacing(20)," !important")},[r.breakpoints.down("sm")]:{padding:"".concat(r.spacing(10,5)," !important")}}}),U=()=>(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(q,{}),(0,n.jsx)(i.Z,{children:(0,n.jsx)(N,{sx:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"100vh",background:e=>e.palette.primary.dark,translate:"0 -100px",borderBottomLeftRadius:100,borderBottomRightRadius:100,borderTopLeftRadius:0,borderTopRightRadius:0,textAlign:"center"},children:(0,n.jsx)(F,{})})}),(0,n.jsx)(i.Z,{children:(0,n.jsx)(N,{id:"features",children:(0,n.jsx)(R,{})})}),(0,n.jsx)(A,{}),(0,n.jsx)(i.Z,{sx:{boxShadow:"none"},children:(0,n.jsx)(N,{id:"tabla-cuentas",sx:{backgroundColor:"action.hover"},children:(0,n.jsx)(S,{pricingTable:O.pricingTable})})}),(0,n.jsx)(M,{})]});U.getLayout=e=>(0,n.jsx)(H.Z,{children:e}),U.authGuard=!1;var G=U}},function(e){e.O(0,[851,387,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);