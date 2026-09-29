/* =========================================================
   TEMA CLARO / ESCURO
========================================================= */

const botaoTema = document.querySelector("#botao-tema");


// Verifica se o usuário já tinha escolhido um tema
const temaSalvo = localStorage.getItem("tema");


// Se o tema salvo for escuro, aplica o tema
if (temaSalvo === "escuro") {
    document.body.classList.add("tema-escuro");
}


// Atualiza o texto do botão
function atualizarBotaoTema() {

    if (document.body.classList.contains("tema-escuro")) {

        botaoTema.textContent = "☀️ Tema claro";

    } else {

        botaoTema.textContent = "🌙 Tema escuro";
    }
}


// Atualiza o botão quando a página abre
atualizarBotaoTema();


// Clique no botão
botaoTema.addEventListener("click", function () {

    document.body.classList.toggle("tema-escuro");


    // Verifica qual tema está ativo
    const temaEscuro =
        document.body.classList.contains("tema-escuro");


    // Salva a preferência do usuário
    if (temaEscuro) {

        localStorage.setItem("tema", "escuro");

    } else {

        localStorage.setItem("tema", "claro");
    }


    // Atualiza o texto do botão
    atualizarBotaoTema();

});


/* =========================================================
   FORMULÁRIO
========================================================= */

const formulario =
    document.querySelector("#formulario-contato");

const resposta =
    document.querySelector("#resposta-formulario");

const botao =
    formulario.querySelector("button");

const campoTelefone =
    document.querySelector("#telefone");


/* =========================================================
   MÁSCARA DO TELEFONE
   Formato: (99) 9 9999-9999
========================================================= */

campoTelefone.addEventListener("input", function () {

    let numeros =
        campoTelefone.value.replace(/\D/g, "");


    // Limita a 11 números
    numeros = numeros.slice(0, 11);


    if (numeros.length <= 2) {

        campoTelefone.value =
            numeros.replace(
                /(\d{0,2})/,
                "($1"
            );

    } else if (numeros.length <= 3) {

        campoTelefone.value =
            numeros.replace(
                /(\d{2})(\d{0,1})/,
                "($1) $2"
            );

    } else if (numeros.length <= 7) {

        campoTelefone.value =
            numeros.replace(
                /(\d{2})(\d{1})(\d{0,4})/,
                "($1) $2 $3"
            );

    } else {

        campoTelefone.value =
            numeros.replace(
                /(\d{2})(\d{1})(\d{4})(\d{0,4})/,
                "($1) $2 $3-$4"
            );
    }

});


/* =========================================================
   ENVIO DO FORMULÁRIO
========================================================= */

formulario.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        // Desativa o botão enquanto envia
        botao.disabled = true;

        botao.textContent = "Enviando...";

        resposta.textContent = "";


        fetch(formulario.action, {

            method: "POST",

            body: new FormData(formulario),

            headers: {
                "Accept": "application/json"
            }

        })

        .then(function (retorno) {

            if (!retorno.ok) {

                throw new Error(
                    "Erro ao enviar formulário"
                );
            }


            resposta.textContent =
                "Mensagem enviada com sucesso!";

            resposta.className =
                "aviso-formulario sucesso";


            formulario.reset();

        })

        .catch(function () {

            resposta.textContent =
                "Não foi possível enviar. " +
                "Verifique a internet e tente novamente.";

            resposta.className =
                "aviso-formulario erro";

        })

        .finally(function () {

            botao.disabled = false;

            botao.textContent = "Enviar";

        });

    }
);
