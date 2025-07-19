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

// Função para carregar animais do localStorage
function carregarAnimais() {
    const animaisSalvos = localStorage.getItem('animais');
    if (animaisSalvos) {
        animais = JSON.parse(animaisSalvos);
        animais.forEach(animal => adicionarAnimalNaGaleria(animal));
    }
}

// Função para adicionar animal na galeria
function adicionarAnimalNaGaleria(animal) {
    const cardAnimal = document.createElement('div');
    cardAnimal.className = 'card-animal';
    cardAnimal.innerHTML = `
        <img src="/${animal.foto}" alt="${animal.nome}" onerror="this.src='icones/user.png'">
        <div class="info-animal">
            <h3>${animal.nome}</h3>
            <p><strong>Tipo:</strong> ${animal.tipo}</p>
            <p><strong>Porte:</strong> ${animal.porte}</p>
            <p><strong>Idade:</strong> ${animal.idade}</p>
            <p><strong>Descrição:</strong> ${animal.descricao}</p>
            <p><strong>Contato:</strong> ${animal.contato}</p>
            <button onclick="removerAnimal(${animal.id})" class="btn-remover">Remover</button>
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

