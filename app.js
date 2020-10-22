// Hämta API-url och html-element
const apiUrl = "https://reqres.in/";
const formEl = document.querySelector("#loginForm");
const showUserButtonEl = document.querySelector(".showUsersButton");
const usersListEl = document.querySelector(".usersList");
const userInfoContainer = document.querySelector(".userInfoContainer");

// Lyssna efter klick på "logga in"-knappen
formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  // Fetcha inloggning
  fetch(apiUrl + "api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formEl["email"].value,
      password: formEl["password"].value,
    }),
  })
    .then((res) => res.json())
    .then((jsonData) => {
      // Error-meddelande vid fel inloggningsuppgifter
      if (jsonData.error) {
        const errorMessageEl = document.querySelector("#loginErrorMessage");
        errorMessageEl.innerText = "Error: " + jsonData.error;
      }
      // Visa "show users"-knappen
      else showUserButtonEl.hidden = false;
    });
});

// Lyssna efter klick på "show users"-knappen
showUserButtonEl.addEventListener("click", (e) => {
  // Fetcha användaruppgifter och skapa lista med användare
  fetch(apiUrl + "api/users")
    .then((res) => res.json())
    .then((data) => {
      const users = data.data;
      const usersList = users
        .map((user) => {
          return `<li class="user" data-userid = "${user.id}">${user.first_name}</li>`;
        })
        .join("");
      usersListEl.innerHTML = usersList;
    });
});

// Lyssna efter klick på enskild användares namn
usersListEl.addEventListener("click", (e) => {
  const userId = e.target.dataset.userid;

  // Fetcha enskild användares info
  fetch(`${apiUrl}api/users/${userId}`)
    .then((res) => res.json())
    .then((user) => {
      userInfoContainer.innerHTML = "";
      const name = document.createElement("p");
      name.innerText = user.data.first_name + " " + user.data.last_name;

      const avantarImg = document.createElement("img");
      avantarImg.src = user.data.avatar;

      const email = document.createElement("p");
      email.innerText = user.data.email;
      userInfoContainer.append(name, avantarImg, email);
    });
});
