(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var c=t(0),r=t(14),s=t.n(r),u=t(3),a=t(2),o=function(e){return function(n){e(n.target.value)}},i=function(e){var n=e.searchName,t=e.setSerachName;return Object(c.jsxs)("div",{children:["Filter shown with: ",Object(c.jsx)("input",{value:n,onChange:o(t)})]})},j=function(e){var n=e.message,t=e.error;return n?void 0!==t&&t?Object(c.jsx)("div",{className:"error",children:n}):Object(c.jsx)("div",{className:"message",children:n}):null},b=function(e){var n=e.handleSubmit,t=e.newName,r=e.setNewName,s=e.newNumber,u=e.setNewNumber;return Object(c.jsxs)("form",{onSubmit:n,children:[Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{value:t,onChange:o(r)})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{value:s,onChange:o(u)})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"Add"})})]})},d=t(4),h=t.n(d),l="/api/persons",m=function(){return h.a.get(l).then((function(e){return e.data}))},O=function(e){return h.a.post(l,e).then((function(e){return e.data}))},f=function(e,n){return h.a.put("".concat(l,"/").concat(e),n).then((function(e){return e.data}))},x=function(e){return h.a.get("".concat(l,"/query/").concat(e)).then((function(e){return e.data}))},v=function(e){return h.a.delete("".concat(l,"/").concat(e)).then((function(e){return e.data}))},p=function(e){var n=e.person,t=e.setPersons;return Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{children:n.name}),Object(c.jsx)("td",{children:n.number}),Object(c.jsx)("td",{children:Object(c.jsx)("button",{onClick:function(){var e="Delete ".concat(n.name);window.confirm(e)&&(v(n.id),m().then((function(e){return t(e)})))},children:"Delete"})})]})},N=function(e){var n=e.persons,t=e.searchName,r=e.setPersons;return Object(c.jsx)("div",{children:Object(c.jsx)("table",{children:Object(c.jsx)("tbody",{children:n.map((function(e){return 0===t.length||-1!==e.name.search(t)?Object(c.jsx)(p,{person:e,setPersons:r},e.id):null}))})})})},w=function(e){return Object(c.jsx)("h2",{children:e.name})},g=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],s=Object(a.useState)(""),o=Object(u.a)(s,2),d=o[0],h=o[1],l=Object(a.useState)(""),v=Object(u.a)(l,2),p=v[0],g=v[1],S=Object(a.useState)(""),k=Object(u.a)(S,2),y=k[0],P=k[1],A=Object(a.useState)(null),C=Object(u.a)(A,2),T=C[0],D=C[1],E=Object(a.useState)(null),J=Object(u.a)(E,2),q=J[0],B=J[1],F=3e3;Object(a.useEffect)((function(){m().then((function(e){return r(e)}))}),[]);return Object(c.jsxs)("div",{children:[Object(c.jsx)(w,{name:"Phonebook"}),T&&Object(c.jsx)(j,{message:T}),q&&Object(c.jsx)(j,{message:q,error:!0}),Object(c.jsx)("div",{children:Object(c.jsx)(i,{searchName:y,setSerachName:P})}),Object(c.jsxs)("div",{children:[Object(c.jsx)(w,{name:"Add a new"}),Object(c.jsx)(b,{handleSubmit:function(e){e.preventDefault(),x(d).then((function(e){var n={name:d,number:p};if(e){var t="".concat(d," is already added to phonebook, replace the old number with a new one?");window.confirm(t)&&f(e.id,n).then((function(){m().then((function(e){return r(e)})),D("Added ".concat(d)),setTimeout((function(){return D(null)}),F)})).catch((function(e){B(e.response.data.error),setTimeout((function(){return B(null)}),F)}))}else O(n).then((function(){m().then((function(e){return r(e)})),h(""),D("Added ".concat(d)),setTimeout((function(){return D(null)}),F)})).catch((function(e){B(e.response.data.error),setTimeout((function(){return B(null)}),F)}))}))},newName:d,setNewName:h,newNumber:p,setNewNumber:g})]}),Object(c.jsxs)("div",{children:[Object(c.jsx)(w,{name:"Numbers"}),Object(c.jsx)(N,{persons:t,searchName:y,setPersons:r})]})]})};t(37);s.a.render(Object(c.jsx)(g,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.76c4ff41.chunk.js.map