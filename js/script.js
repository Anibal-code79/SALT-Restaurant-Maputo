
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