// 1 Завдання
window.onload = function() {
    loadTasks();
    handleLogin();
    const addTaskBtn = document.getElementById("addTaskBtn");
    addTaskBtn.addEventListener("click", addTask);
    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", handleLoginSubmit);
};
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
    const tasks = getTasksFromLocalStorage();
    tasks.push({
        text: taskText,
        completed: false
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    loadTasks();
}
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index)=>{
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onclick = function() {
            toggleTaskCompletion(index);
        };
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function() {
            deleteTask(index);
        };
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(task.text));
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}
function toggleTaskCompletion(index) {
    const tasks = getTasksFromLocalStorage();
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
function deleteTask(index) {
    const tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
// 2 Завдання
function handleLogin() {
    const savedUser = localStorage.getItem("loggedInUsername");
    if (savedUser) alert("\u0412\u0456\u0442\u0430\u0454\u043C\u043E, " + savedUser + "!");
}
function getUsersFromLocalStorage() {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
}
function handleLoginSubmit(event) {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if (username && password) {
        const users = getUsersFromLocalStorage();
        const existingUser = users.find((user)=>user.username === username);
        if (existingUser) alert("\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447 \u0437 \u043B\u043E\u0433\u0456\u043D\u043E\u043C '" + username + "' \u0432\u0436\u0435 \u0456\u0441\u043D\u0443\u0454.");
        else {
            const newUser = {
                username,
                password
            };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("loggedInUsername", username);
            alert("\u0412\u0456\u0442\u0430\u0454\u043C\u043E, " + username + "!");
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        }
    } else alert("\u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u0432\u0432\u0435\u0434\u0456\u0442\u044C \u043B\u043E\u0433\u0456\u043D \u0442\u0430 \u043F\u0430\u0440\u043E\u043B\u044C.");
}
// 3 Завдання
const bookmarkForm = document.getElementById("bookmark-form");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");
const bookmarkList = document.getElementById("bookmark-list");
function saveBookmarks(bookmarks) {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
function loadBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    return bookmarks ? bookmarks : [];
}
function renderBookmarks() {
    const bookmarks = loadBookmarks();
    bookmarkList.innerHTML = "";
    bookmarks.forEach((bookmark, index)=>{
        const li = document.createElement("li");
        li.innerHTML = `
            <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
            <button class="edit-btn" onclick="editBookmark(${index})">\u{420}\u{435}\u{434}\u{430}\u{433}\u{443}\u{432}\u{430}\u{442}\u{438}</button>
            <button class="delete-btn" onclick="deleteBookmark(${index})">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
        `;
        bookmarkList.appendChild(li);
    });
}
bookmarkForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = bookmarkNameInput.value.trim();
    const url = bookmarkUrlInput.value.trim();
    if (name && url) {
        const bookmarks = loadBookmarks();
        bookmarks.push({
            name,
            url
        });
        saveBookmarks(bookmarks);
        bookmarkNameInput.value = "";
        bookmarkUrlInput.value = "";
        renderBookmarks();
    }
});
function deleteBookmark(index) {
    const bookmarks = loadBookmarks();
    bookmarks.splice(index, 1);
    saveBookmarks(bookmarks);
    renderBookmarks();
}
function editBookmark(index) {
    const bookmarks = loadBookmarks();
    const bookmark = bookmarks[index];
    bookmarkNameInput.value = bookmark.name;
    bookmarkUrlInput.value = bookmark.url;
    bookmarks.splice(index, 1);
    saveBookmarks(bookmarks);
    renderBookmarks();
}
renderBookmarks();
// 4 Завдання
const contactForm = document.getElementById("contact-form");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const contactsList = document.getElementById("contacts-list");
function saveContacts(contacts) {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}
function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    return contacts ? contacts : [];
}
function renderContacts() {
    const contacts = loadContacts();
    contactsList.innerHTML = "";
    contacts.forEach((contact, index)=>{
        const li = document.createElement("li");
        li.innerHTML = `
            ${contact.firstName} ${contact.lastName} - ${contact.phone} - ${contact.email}
            <button class="edit-btn" onclick="editContact(${index})">\u{420}\u{435}\u{434}\u{430}\u{433}\u{443}\u{432}\u{430}\u{442}\u{438}</button>
            <button class="delete-btn" onclick="deleteContact(${index})">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
        `;
        contactsList.appendChild(li);
    });
}
contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const newContact = {
        firstName: firstNameInput.value.trim(),
        lastName: lastNameInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: emailInput.value.trim()
    };
    const contacts = loadContacts();
    contacts.push(newContact);
    saveContacts(contacts);
    firstNameInput.value = "";
    lastNameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
    renderContacts();
});
function deleteContact(index) {
    const contacts = loadContacts();
    contacts.splice(index, 1);
    saveContacts(contacts);
    renderContacts();
}
function editContact(index) {
    const contacts = loadContacts();
    const contact = contacts[index];
    firstNameInput.value = contact.firstName;
    lastNameInput.value = contact.lastName;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;
    contacts.splice(index, 1);
    saveContacts(contacts);
    renderContacts();
}
renderContacts();

//# sourceMappingURL=index.816e7b21.js.map
