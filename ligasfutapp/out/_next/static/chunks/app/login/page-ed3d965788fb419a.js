(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2626],{7113:function(e,a,r){Promise.resolve().then(r.t.bind(r,8173,23)),Promise.resolve().then(r.bind(r,2874))},6463:function(e,a,r){"use strict";var s=r(1169);r.o(s,"useRouter")&&r.d(a,{useRouter:function(){return s.useRouter}}),r.o(s,"useSearchParams")&&r.d(a,{useSearchParams:function(){return s.useSearchParams}})},2874:function(e,a,r){"use strict";var s=r(7437),t=r(2265),l=r(6463),n=r(6648);a.default=()=>{let[e,a]=(0,t.useState)(""),[r,o]=(0,t.useState)(""),[i,u]=(0,t.useState)(!1),c=(0,l.useRouter)();return(0,s.jsxs)("div",{className:"flex flex-col items-center justify-center bg-white md:w-1/3 w-full sm:w-full p-8",children:[(0,s.jsxs)("div",{className:"width-54perc",children:[(0,s.jsx)(n.default,{src:"/images/logos/app-logo-primary-square.png",alt:"Futapp Logo",className:"width-40perc margin-bottom-m-100px move-to-left-2perc",width:200,height:200}),(0,s.jsx)("h1",{className:"text-2xl mb-2 text-center text-black float-left",children:"Bienvenido a Ligas Futapp! \uD83D\uDC4B\uD83C\uDFFB"}),(0,s.jsx)("br",{}),(0,s.jsx)("br",{}),(0,s.jsx)("h2",{className:"text-xm mb-4 text-center text-black float-left",children:"Ingresa a tu cuenta"})]}),(0,s.jsxs)("form",{className:"w-full max-w-sm",onSubmit:a=>{switch(a.preventDefault(),e){case"planillero@gmail.com":"123"===r?c.push("/user/planner/home_planner"):alert("Contrase\xf1a incorrecta para el usuario Planillero");break;case"jugador@gmail.com":"123"===r?c.push("/user/player/initiation_dni_player?role=Jugador"):alert("Contrase\xf1a incorrecta para el usuario Planillero");break;case"hincha@gmail.com":"123"===r?c.push("/user/hincha/home_hincha"):alert("Contrase\xf1a incorrecta para el usuario Planillero");break;case"delegado@gmail.com":"123"===r?c.push("/user/player/initiation_dni_player?role=Delegado"):alert("Contrase\xf1a incorrecta para el usuario Delegado");break;case"admin_master@gmail.com":"123"===r?c.push("/user/admin_master/league_admin"):alert("Contrase\xf1a incorrecta para el usuario Delegado");break;case"admin_league@gmail.com":"123"==r&&c.push("/user/admin_league/category_admin");break;default:alert("No se reconoce el usuario")}},autoComplete:"on",children:[(0,s.jsxs)("div",{className:"mb-4",children:[(0,s.jsx)("label",{className:"block text-gray-700",children:"Email"}),(0,s.jsx)("input",{type:"email",name:"email",className:"w-full p-2 border border-gray-300 rounded mt-1 text-black",placeholder:"Email del usuario",onChange:e=>a(e.target.value),autoComplete:"username"})]}),(0,s.jsxs)("div",{className:"mb-4",children:[(0,s.jsx)("label",{className:"block text-gray-700",children:"Contrase\xf1a"}),(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)("input",{type:i?"text":"password",name:"password",className:"w-full p-2 border border-gray-300 rounded mt-1 text-black",placeholder:"Contrase\xf1a",onChange:e=>o(e.target.value),autoComplete:"current-password"}),(0,s.jsx)("button",{type:"button",onClick:()=>{u(!i)},className:"absolute right-2 top-2 text-gray-600",children:i?"Ocultar":"Mostrar"})]})]}),(0,s.jsxs)("div",{className:"mb-4 flex items-center justify-between",children:[(0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("input",{type:"checkbox",className:"mr-2"}),(0,s.jsx)("label",{className:"text-gray-700",children:"Recu\xe9rdame"})]}),(0,s.jsx)("a",{href:"#",className:"text-blue-600 hover:underline",onClick:()=>{c.push("/forgot-password")},children:"\xbfOlvidaste tu contrase\xf1a?"})]}),(0,s.jsx)("button",{type:"submit",className:"w-full bg-blue-600 text-white p-2 rounded",children:"Ingresar"})]}),(0,s.jsxs)("p",{className:"mt-4 text-gray-600",children:["\xbfNo tienes una cuenta? ",(0,s.jsx)("a",{href:"#",className:"text-blue-600 hover:underline",onClick:()=>{c.push("/register")},children:"Crea una cuenta nueva"})]})]})}}},function(e){e.O(0,[6648,2971,7023,1744],function(){return e(e.s=7113)}),_N_E=e.O()}]);