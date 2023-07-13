const APIUrl = "https://api.github.com/users/";

const container = document.querySelector(".container");
const input = document.getElementById("search");
const main = document.querySelector(".main");

async function getUser(usuario) {
  try {
    const req = fetch(APIUrl + usuario);
    await req.then((res) => res.json()).then((res) => crearTarjeta(res));

    getRepos(usuario);
  } catch (e) {
    
  }
}

container.addEventListener("submit", (e) => {
  e.preventDefault();
  getUser(input.value);
  input.value = "";
});

function crearTarjeta(usuario) {
  let tarjeta;
  if (usuario.name !== undefined) {
    tarjeta = `
  <div class="tarjeta">
    <div>
          <img
            class="avatar"
            src="${usuario.avatar_url}"
          />
        </div>
        <div class="user">
          <h2 class="name">${usuario.name || usuario.login}</h2>
          <p>${usuario.bio}</p>
          <ul>
            <li>${usuario.followers}<strong> Followers</strong></li>
            <li>${usuario.following}<strong> Following</strong></li>
            <li>${usuario.public_repos}<strong> Repos</strong></li>
          </ul>
          <div class="repos"></div>
    </div>
  </div>
  `;
  } else {
    tarjeta = `
    <div class="tarjeta">
    <p class="user-error">
    El usuario que buscaste no fue encontrado. Asegurate de que no tuviste ningún error de escritura o sino, simplemente, el usuario no existe.</p>
    </div>
    `;
  }

  main.innerHTML = tarjeta;
}

async function getRepos(usuario) {
  try {
    const reqRepo = fetch(APIUrl + usuario + "/repos?sort=created");
    await reqRepo.then((res) => res.json()).then((res) => crearRepos(res));
  } catch (e) {
    
  }
}

function crearRepos(repos) {
  const repositorios = document.querySelector(".repos");
  const final = repos.slice(0, 6);
  final.forEach((rep) => {
    const repo = document.createElement("A");
    repo.classList.add("repo");
    repo.target = "_blank";
    repo.href = rep.html_url;
    repo.innerHTML = rep.name;

    repositorios.appendChild(repo);
  });
}
function crearErrorRepo(e){

}