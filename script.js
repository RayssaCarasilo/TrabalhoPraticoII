// Elementos do DOM
const botaoComecar = document.getElementById('botao-comecar');
const primeiraPageina = document.getElementById('primeira-pagina');
const galeria = document.getElementById('galeria');
const botaoAdicionar = document.getElementById('adicionar-animal');
const divAdicionar = document.querySelector('.adicionar');
const formulario = document.getElementById('animal-form');
const animaisContainer = document.getElementById('animais');

// Array para armazenar os animais
let animais = [];

// Função para alternar menu do usuário
function toggleMenu() {
    const menu = document.getElementById('userMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Event listeners
botaoComecar.addEventListener('click', () => {
    primeiraPageina.style.display = 'none';
    galeria.style.display = 'block';
    carregarAnimais();
});

botaoAdicionar.addEventListener('click', () => {
    divAdicionar.style.display = 'block';
});

// Função para enviar dados para o servidor
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const porte = document.getElementById('porte').value;
    const idade = document.getElementById('idade').value;
    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value;
    const contato = document.getElementById('contato').value;
    const foto = document.getElementById('foto').files[0];

    // Gerar URL temporária para a imagem
    const fotoURL = URL.createObjectURL(foto);

    const animal = {
        id: Date.now(),
        nome,
        porte,
        idade,
        tipo,
        descricao,
        contato,
        foto: fotoURL
    };

    animais.push(animal);
    localStorage.setItem('animais', JSON.stringify(animais));
    adicionarAnimalNaGaleria(animal);

    formulario.reset();
    divAdicionar.style.display = 'none';
});

   function carregarAnimais() {
    animaisContainer.innerHTML = '';
    const animaisSalvos = JSON.parse(localStorage.getItem('animais')) || [];
    animaisSalvos.forEach(animal => adicionarAnimalNaGaleria(animal));
}

function adicionarAnimalNaGaleria(animal) {
    const card = document.createElement("div");
    card.className = "animal-card";

    let imagemHTML = "";
    if (animal.foto) {
        imagemHTML = `<img src="${animal.foto}" alt="${animal.tipo}" class="foto-bichinho">`;
    }

    card.innerHTML = `
      ${imagemHTML}
      <div class="animal-info">
        <h3>${animal.nome}</h3>
        <p><strong>Tipo:</strong> ${animal.tipo}</p>
        <p><strong>Porte:</strong> ${animal.porte}</p>
        <p><strong>Idade:</strong> ${animal.idade}</p>
        <p><strong>Cidade:</strong> ${animal.cidade || ''}</p>
        <p><strong>Contato:</strong> ${animal.contato}</p>
        <p><strong>Descrição:</strong> ${animal.descricao}</p>
      </div>
    `;

    animaisContainer.appendChild(card);
}

// Função para remover animal
function removerAnimal(id) {
    if (confirm('Tem certeza que deseja remover este animal?')) {
        animais = animais.filter(animal => animal.id !== id);
        localStorage.setItem('animais', JSON.stringify(animais));
        
        // Recarregar galeria
        animaisContainer.innerHTML = '';
        animais.forEach(animal => adicionarAnimalNaGaleria(animal));
    }
}

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    const menu = document.getElementById('userMenu');
    const usuario = document.querySelector('.usuario');
    
    if (!usuario.contains(e.target)) {
        menu.style.display = 'none';
    }
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
