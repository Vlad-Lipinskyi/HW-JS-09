// 1 Завдання
window.onload = function () {
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
  tasks.push({ text: taskText, completed: false });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  loadTasks();
}

function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onclick = function () {
      toggleTaskCompletion(index);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
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
  if (savedUser) {
    alert("Вітаємо, " + savedUser + "!");
  }
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

    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      alert("Користувач з логіном '" + username + "' вже існує.");
    } else {
      const newUser = { username, password };
      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));

      localStorage.setItem("loggedInUsername", username);

      alert("Вітаємо, " + username + "!");

      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
    }
  } else {
    alert("Будь ласка, введіть логін та пароль.");
  }
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

  bookmarks.forEach((bookmark, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
            <button class="edit-btn" onclick="editBookmark(${index})">Редагувати</button>
            <button class="delete-btn" onclick="deleteBookmark(${index})">Видалити</button>
        `;
    bookmarkList.appendChild(li);
  });
}

bookmarkForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();

  if (name && url) {
    const bookmarks = loadBookmarks();
    bookmarks.push({ name, url });
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

  contacts.forEach((contact, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            ${contact.firstName} ${contact.lastName} - ${contact.phone} - ${contact.email}
            <button class="edit-btn" onclick="editContact(${index})">Редагувати</button>
            <button class="delete-btn" onclick="deleteContact(${index})">Видалити</button>
        `;
    contactsList.appendChild(li);
  });
}

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newContact = {
    firstName: firstNameInput.value.trim(),
    lastName: lastNameInput.value.trim(),
    phone: phoneInput.value.trim(),
    email: emailInput.value.trim(),
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
