function toggleMenu() {
  const menu = document.getElementById("userMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

const botaoComecar = document.getElementById("botao-comecar");
    const primeiraPagina = document.getElementById("primeira-pagina");
    const galeria = document.getElementById("galeria");

    botaoComecar.addEventListener("click", () => {
      
      primeiraPagina.classList.add("fade-out");

      setTimeout(() => {
        primeiraPagina.style.display = "none";
        galeria.style.display = "block";
      }, 1000);
    });

 document.addEventListener("DOMContentLoaded", function() {
    const botaoAdicionar = document.getElementById("adicionar-animal");
    const form = document.querySelector(".adicionar");

    botaoAdicionar.addEventListener("click", function() {
      if (form.style.display === "none" || form.style.display === "") {
        form.style.display = "block";
      } else {
        form.style.display = "none";
      }
    });
  });


 document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("animal-form");
  const container = document.getElementById("animais");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const contato = document.getElementById("contato").value;

    // Seleciona imagem com base no tipo
    let imagem = "";
    if (tipo === "cachorro") imagem = "icones/user.png";
    else if (tipo === "gato") imagem = "icones/user.png";
    else if (tipo === "coelho") imagem = "icones/user.png";
    else if (tipo === "passaro") imagem = "icones/user.png";

    const card = document.createElement("div");
    card.className = "animal-card";

    card.innerHTML = `
      <img src="${imagem}" alt="${tipo}">
      <div class="animal-info">
        <h3>${nome}</h3>
        <p>${contato}</p>
      </div>
    `;

    container.appendChild(card);
    form.reset();
  });
});
