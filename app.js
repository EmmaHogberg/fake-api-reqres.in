const apiUrl = "https://reqres.in/";
const formEl = document.querySelector("#loginForm");
const showUserButtonEl = document.querySelector(".showUsersButton");
const usersListEl = document.querySelector(".usersList");
const userInfoContainer = document.querySelector(".userInfoContainer");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

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
      if (jsonData.error) {
        const errorMessageEl = document.querySelector("#loginErrorMessage");
        errorMessageEl.innerText = jsonData.error;
        errorMessageEl.classList.remove("hide");
        errorMessageEl.classList.remove;
      } else showUserButtonEl.classList.remove("hide");
    });
});

showUserButtonEl.addEventListener("click", (e) => {
  fetch(apiUrl + "api/users")
    .then((res) => res.json())
    .then((data) => {
      const users = data.data;
      const UsersList = users
        .map((user) => {
          return `<li class="user" data-userid = "${user.id}">${user.first_name}</li>`;
        })
        .join("");
      usersListEl.innerHTML = UsersList;
    });
});

usersListEl.addEventListener("click", (e) => {
  const userId = e.target.dataset.userid;

  // Fetch singel user
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