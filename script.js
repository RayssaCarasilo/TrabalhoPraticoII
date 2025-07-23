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
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    // Pegar dados do formulário
    const nome = document.getElementById('nome').value;
    const porte = document.getElementById('porte').value;
    const idade = document.getElementById('idade').value;
    const tipo = document.getElementById('tipo').value;
    const descricao = document.getElementById('descricao').value;
    const contato = document.getElementById('contato').value;
    const foto = document.getElementById('foto').files[0];
    
    // Validar se todos os campos estão preenchidos
    if (!nome || !porte || !idade || !tipo || !descricao || !contato || !foto) {
        alert('Por favor, preencha todos os campos e selecione uma foto!');
        return;
    }
    
    // Adicionar dados ao FormData
    formData.append('name', nome);
    formData.append('foto', foto);
    
    try {
        // Enviar para o servidor
        const response = await fetch('/images', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('Sucesso:', result);
            
            // Criar objeto do animal com todos os dados
            const animal = {
                id: Date.now(),
                nome,
                porte,
                idade,
                tipo,
                descricao,
                contato,
                foto: result.image.src
            };
            
            // Adicionar ao array e salvar no localStorage
            animais.push(animal);
            localStorage.setItem('animais', JSON.stringify(animais));
            
            // Atualizar a galeria
            adicionarAnimalNaGaleria(animal);
            
            // Limpar formulário e fechar
            formulario.reset();
            divAdicionar.style.display = 'none';
            
            alert('Animal adicionado com sucesso!');
        } else {
            throw new Error('Erro ao enviar dados');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao adicionar animal. Tente novamente.');
    }
});


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
    
    animaisContainer.appendChild(cardAnimal);
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
