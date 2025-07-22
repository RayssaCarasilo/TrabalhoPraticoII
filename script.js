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
  const galeria = document.getElementById("animais");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Pegando valores do formulário
    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const porte = document.getElementById("porte").value;
    const idade = document.getElementById("idade").value;
    const cidade = document.getElementById("cidade").value;
    const descricao = document.getElementById("descricao").value;
    const contato = document.getElementById("contato").value;
    const fotoInput = document.getElementById("foto");
    const fotoArquivo = fotoInput.files[0];

    // Criação do card
    const card = document.createElement("div");
    card.className = "animal-card";

    // Imagem (se houver)
    let imagemHTML = "";
    if (fotoArquivo) {
      const urlImagem = URL.createObjectURL(fotoArquivo);
      imagemHTML = `<img src="${urlImagem}" alt="${tipo}" class="foto-bichinho">`;
    }

    // HTML do card
    card.innerHTML = `
      ${imagemHTML}
      <div class="animal-info">
        <h3>${nome}</h3>
        <p><strong>Tipo:</strong> ${tipo}</p>
        <p><strong>Porte:</strong> ${porte}</p>
        <p><strong>Idade:</strong> ${idade}</p>
        <p><strong>Cidade:</strong> ${cidade}</p>
        <p><strong>Contato:</strong> ${contato}</p>
        <p><strong>Descrição:</strong> ${descricao}</p>
      </div>
    `;

    // Adiciona à galeria
    galeria.appendChild(card);

    // Limpa o formulário
    form.reset();
  });
});


// Mascara de telefone
document.getElementById('contato').addEventListener('input', function (e) {
  let input = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito

  if (input.length > 11) input = input.slice(0, 11); // Limita a 11 dígitos

  let formatado; // Declara variável para guardar o telefone formatado

  if (input.length > 10) formatado = input.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3'); // Se tiver 11 dígitos (celular), formata como (DD) 9XXXX-XXXX
  else if (input.length > 6) formatado = input.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3'); // Se tiver entre 7 e 10 dígitos, formata como (DD) XXXX-XXXX
  else if (input.length > 2) formatado = input.replace(/^(\d{2})(\d{0,5})$/, '($1) $2'); // Se tiver entre 3 e 6 dígitos, formata como (DD) XXXXX
  else formatado = input.replace(/^(\d*)$/, '($1'); // Se tiver 1 ou 2 dígitos, coloca parêntese apenas no DDD

  e.target.value = formatado; // Atualiza o valor do campo com o telefone formatado

});

document.getElementById('idade').addEventListener('input', function (e) {
  e.target.value = e.target.value.replace(/\D/g, '');
});
