function e(){let e=document.getElementById("taskInput"),l=e.value.trim();if(""===l)return;let o=n();o.push({text:l,completed:!1}),localStorage.setItem("tasks",JSON.stringify(o)),e.value="",t()}function t(){let e=n(),l=document.getElementById("taskList");l.innerHTML="",e.forEach((e,o)=>{let u=document.createElement("li"),a=document.createElement("input");a.type="checkbox",a.checked=e.completed,a.onclick=function(){(function(e){let l=n();l[e].completed=!l[e].completed,localStorage.setItem("tasks",JSON.stringify(l)),t()})(o)};let c=document.createElement("button");c.textContent="Видалити",c.classList.add("delete-btn"),c.onclick=function(){(function(e){let l=n();l.splice(e,1),localStorage.setItem("tasks",JSON.stringify(l)),t()})(o)},u.appendChild(a),u.appendChild(document.createTextNode(e.text)),u.appendChild(c),l.appendChild(u)})}function n(){let e=localStorage.getItem("tasks");return e?JSON.parse(e):[]}function l(e){e.preventDefault();let t=document.getElementById("username").value.trim(),n=document.getElementById("password").value.trim();if(t&&n){let e=function(){let e=localStorage.getItem("users");return e?JSON.parse(e):[]}();e.find(e=>e.username===t)?alert("Користувач з логіном '"+t+"' вже існує."):(e.push({username:t,password:n}),localStorage.setItem("users",JSON.stringify(e)),localStorage.setItem("loggedInUsername",t),alert("Вітаємо, "+t+"!"),document.getElementById("username").value="",document.getElementById("password").value="")}else alert("Будь ласка, введіть логін та пароль.")}window.onload=function(){t(),function(){let e=localStorage.getItem("loggedInUsername");e&&alert("Вітаємо, "+e+"!")}(),document.getElementById("addTaskBtn").addEventListener("click",e),document.getElementById("loginForm").addEventListener("submit",l)};const o=document.getElementById("bookmark-form"),u=document.getElementById("bookmark-name"),a=document.getElementById("bookmark-url"),c=document.getElementById("bookmark-list");function m(){return JSON.parse(localStorage.getItem("bookmarks"))||[]}function r(){let e=m();c.innerHTML="",e.forEach((e,t)=>{let n=document.createElement("li");n.innerHTML=`
            <a href="${e.url}" target="_blank">${e.name}</a>
            <button class="edit-btn" onclick="editBookmark(${t})">\u{420}\u{435}\u{434}\u{430}\u{433}\u{443}\u{432}\u{430}\u{442}\u{438}</button>
            <button class="delete-btn" onclick="deleteBookmark(${t})">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
        `,c.appendChild(n)})}o.addEventListener("submit",function(e){e.preventDefault();let t=u.value.trim(),n=a.value.trim();if(t&&n){let e=m();e.push({name:t,url:n}),localStorage.setItem("bookmarks",JSON.stringify(e)),u.value="",a.value="",r()}}),r();const d=document.getElementById("contact-form"),i=document.getElementById("first-name"),s=document.getElementById("last-name"),g=document.getElementById("phone"),f=document.getElementById("email"),p=document.getElementById("contacts-list");function k(){return JSON.parse(localStorage.getItem("contacts"))||[]}function I(){let e=k();p.innerHTML="",e.forEach((e,t)=>{let n=document.createElement("li");n.innerHTML=`
            ${e.firstName} ${e.lastName} - ${e.phone} - ${e.email}
            <button class="edit-btn" onclick="editContact(${t})">\u{420}\u{435}\u{434}\u{430}\u{433}\u{443}\u{432}\u{430}\u{442}\u{438}</button>
            <button class="delete-btn" onclick="deleteContact(${t})">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
        `,p.appendChild(n)})}d.addEventListener("submit",function(e){e.preventDefault();let t={firstName:i.value.trim(),lastName:s.value.trim(),phone:g.value.trim(),email:f.value.trim()},n=k();n.push(t),localStorage.setItem("contacts",JSON.stringify(n)),i.value="",s.value="",g.value="",f.value="",I()}),I();
//# sourceMappingURL=index.c607c6d6.js.map
