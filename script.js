function toggleMenu() {
  const menu = document.getElementById("userMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

const botao = document.getElementById("botao-comecar");
    const primeiraPagina = document.getElementById("primeira-pagina");
    const galeria = document.getElementById("galeria");

    botao.addEventListener("click", () => {
      // Aplica o efeito de transição
      primeiraPagina.classList.add("fade-out");

      // Após 1 segundo, oculta a primeira página e mostra a galeria
      setTimeout(() => {
        primeiraPagina.style.display = "none";
        galeria.style.display = "block";
      }, 1000);
    });