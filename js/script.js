// Selecionar o menu de navegação
const menuPrincipal = document.querySelector("#menuPrincipal");
// Selecionar todos os links internos da navbar
const linksNavbar = document.querySelectorAll("#menuPrincipal .nav-link");
// Percorrer cada link
linksNavbar.forEach(function (link) {
    link.addEventListener("click", function () {
        // Verificar se o menu está aberto
        if (
            menuPrincipal.classList.contains("show") && window.bootstrap
        ) {
            const menu = bootstrap.Collapse.getOrCreateInstance(menuPrincipal);
            // Fechar o menu
            menu.hide();
        }
    });
});

/* ========================================
   RESERVAS DO SALT
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("reservaForm");
    const modal = document.getElementById("reservaModal");

    const inputPrato = document.getElementById("pratoReserva");
    const inputPreco = document.getElementById("precoReserva");
    const inputData = document.getElementById("dataReserva");

    // Criar a mensagem de resposta se ainda não existir no HTML.
    let mensagem = document.getElementById("reservaMensagem");

    if (formulario && !mensagem) {
        mensagem = document.createElement("div");
        mensagem.id = "reservaMensagem";
        mensagem.className = "reservation-feedback";
        mensagem.setAttribute("role", "status");
        mensagem.setAttribute("aria-live", "polite");
        mensagem.hidden = true;

        formulario.prepend(mensagem);
    }

    // Verificar os elementos essenciais.
    if (!formulario || !modal || !inputPrato || !inputData || !mensagem) {
        console.error("Não foi possível inicializar o formulário de reservas.");
        return;
    }

    // Impedir datas anteriores ao dia atual.
    function definirDataMinima() {
        const agora = new Date();

        const ano = agora.getFullYear();
        const mes = String(agora.getMonth() + 1).padStart(2, "0");
        const dia = String(agora.getDate()).padStart(2, "0");

        inputData.min = `${ano}-${mes}-${dia}`;
    }

    definirDataMinima();

    // Preencher o prato e o preço quando o modal abre.
    modal.addEventListener("show.bs.modal", function (evento) {

        const botao = evento.relatedTarget;

        if (!botao || !botao.matches("[data-prato][data-preco]")) {
            inputPrato.value = "";
            if (inputPreco) inputPreco.textContent = "";
            return;
        }

        const prato = botao.dataset.prato;
        const preco = botao.dataset.preco;

        inputPrato.value = prato;

        if (inputPreco) {
            inputPreco.textContent = `Preço ilustrativo: ${preco}`;
        }

        mensagem.hidden = true;
        mensagem.textContent = "";
    });

    // Validar o formulário.
    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();
        definirDataMinima();

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        if (inputData.value < inputData.min) {
            inputData.setCustomValidity(
                "Escolha hoje ou uma data futura."
            );
            inputData.reportValidity();
            inputData.setCustomValidity("");
            return;
        }

        // Recolher os campos usando os IDs reais do teu HTML.
        const dadosReserva = {
            nome: document.getElementById("nomeReserva").value.trim(),
            telefone: document.getElementById("telefoneReserva").value.trim(),
            pessoas: document.getElementById("pessoasReserva").value,
            data: inputData.value,
            hora: document.getElementById("horaReserva").value,
            prato: inputPrato.value,
            quantidade: document.getElementById("quantidadePratos").value,
            observacoes: document.getElementById("observacoesReserva").value.trim()
        };   
console.log("Pedido de reserva de demonstração:", dadosReserva);

// Preencher o resumo do popup.
document.getElementById("confirmacaoPrato").textContent =
    dadosReserva.prato;

document.getElementById("confirmacaoData").textContent =
    new Date(dadosReserva.data + "T12:00:00").toLocaleDateString("pt-PT");

document.getElementById("confirmacaoHora").textContent =
    dadosReserva.hora;

document.getElementById("confirmacaoPessoas").textContent =
    dadosReserva.pessoas === "Mais de 8"
        ? "Mais de 8 pessoas"
        : dadosReserva.pessoas +
          (dadosReserva.pessoas === "1" ? " pessoa" : " pessoas");

// Fechar o formulário de reserva.
const modalReserva = bootstrap.Modal.getOrCreateInstance(modal);
modalReserva.hide();

// Abrir o popup de confirmação depois de o primeiro modal fechar.
modal.addEventListener("hidden.bs.modal", function abrirConfirmacao() {

    modal.removeEventListener("hidden.bs.modal", abrirConfirmacao);

    const elementoConfirmacao =
        document.getElementById("confirmacaoReservaModal");

    const modalConfirmacao =
        bootstrap.Modal.getOrCreateInstance(elementoConfirmacao);

    modalConfirmacao.show();

    // Limpar o formulário depois de obter os dados.
    formulario.reset();

    definirDataMinima();

}, { once: true });

    });

});
