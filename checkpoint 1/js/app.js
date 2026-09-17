// js/app.js
const campoNome = document.getElementById('campoNome');
const campoCpf = document.getElementById('campoCpf');
const campoEmail = document.getElementById('campoEmail');
const campoCelular = document.getElementById('campoCelular');
const campoArtista = document.getElementById('campoArtista');
const listaArtistas = document.getElementById('listaArtistas');
const btnCadastrar = document.getElementById('btnCadastrar');
const divResultado = document.getElementById('painelResultado');

function popularDatalistArtistas(lista) {
    listaArtistas.innerHTML = '';
    lista.forEach((artista) => {
        const option = document.createElement('option');
        option.value = `[${artista.origem}] ${artista.nome} (${artista.estilo}) - ${artista.dia}`;
        listaArtistas.appendChild(option);
    });
}

campoCpf.addEventListener('input', function () {
    let valor = campoCpf.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    campoCpf.value = valor;
});

campoCelular.addEventListener('input', function () {
    let valor = campoCelular.value.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    campoCelular.value = valor;
});

btnCadastrar.addEventListener('click', function () {
    const camposObrigatorios = [campoNome, campoCpf, campoEmail, campoArtista];
    let temCampoVazio = false;

    camposObrigatorios.forEach(campo => {
        if (campo.value.trim() === '') {
            campo.classList.add('campo-erro');
            temCampoVazio = true;
        } else {
            campo.classList.remove('campo-erro');
        }
    });

    if (temCampoVazio) {
        divResultado.className = 'msg-erro';
        divResultado.innerText = 'Atenção: Preencha todos os campos obrigatórios em destaque!';
        return;
    }

    if (!validarCPF(campoCpf.value)) {
        campoCpf.classList.add('campo-erro');
        divResultado.className = 'msg-erro';
        divResultado.innerText = 'Atenção: O CPF digitado é inválido!';
        return;
    }

    const dadosReserva = {
        nome: campoNome.value.trim(),
        cpf: campoCpf.value.trim(),
        email: campoEmail.value.trim(),
        celular: campoCelular.value.trim(),
        artista: campoArtista.value.trim()
    };

    const conteudoTXT = `=== PRÉ-CADASTRO DE INGRESSO ROCK IN RIO ===\n` +
        `Nome: ${dadosReserva.nome}\n` +
        `CPF: ${dadosReserva.cpf}\n` +
        `E-mail: ${dadosReserva.email}\n` +
        `Celular: ${dadosReserva.celular}\n` +
        `Atração Selecionada: ${dadosReserva.artista}\n` +
        `===========================================\n`;

    const nomeArquivo = `ingresso_${dadosReserva.nome.toLowerCase().replace(/\s+/g, '_')}.txt`;

    salvarDadosEmTXT(nomeArquivo, conteudoTXT);

    divResultado.className = 'msg-sucesso';
    divResultado.innerText = `Intenção de compra registrada com sucesso para: ${dadosReserva.artista}! Comprovante exportado.`;
});

popularDatalistArtistas(artistasData);