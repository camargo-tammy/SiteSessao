const formulario = document.querySelector("#formulario-contato");
const resposta = document.querySelector("#resposta-formulario");
const botao = formulario.querySelector("button");
const campoTelefone = document.querySelector("#telefone");

/* Novo bloco: máscara simples para telefone.
Primeiro removemos qualquer caractere que não seja número.
Depois montamos o formato desejado: (99) 9 9999-9999. */
campoTelefone.addEventListener("input", function () {
let numeros = campoTelefone.value.replace(/\D/g, "");

/* O formato pedido usa 11 números: DDD com 2 dígitos + celular com 9 dígitos. */
numeros = numeros.slice(0, 11);

if (numeros.length <= 2) {
campoTelefone.value = numeros.replace(/(\d{0,2})/, "($1");
} else if (numeros.length <= 3) {
campoTelefone.value = numeros.replace(/(\d{2})(\d{0,1})/, "($1) $2");
} else if (numeros.length <= 7) {
campoTelefone.value = numeros.replace(/(\d{2})(\d{1})(\d{0,4})/, "($1) $2 $3");
} else {
campoTelefone.value = numeros.replace(/(\d{2})(\d{1})(\d{4})(\d{0,4})/, "($1) $2 $3-$4");
}
});

formulario.addEventListener("submit", function (evento) {
evento.preventDefault();
botao.disabled = true;
botao.textContent = "Enviando...";
resposta.textContent = "";

fetch(formulario.action, {
method: "POST",
body: new FormData(formulario),
headers: { "Accept": "application/json" }
})
.then(function (retorno) {
if (!retorno.ok) {
throw new Error();
}

resposta.textContent = "Mensagem enviada com sucesso!";
resposta.className = "aviso-formulario sucesso";
formulario.reset();
})
.catch(function () {
resposta.textContent = "Não foi possível enviar. Verifique a internet e tente novamente.";
resposta.className = "aviso-formulario erro";
})
.finally(function () {
botao.disabled = false;
botao.textContent = "Enviar";
});
});

Postada por VLADISMARA PSYCH MARTINS
VLADISMARA PSYCH MARTINS
Criado em: 22 de set.22 de set. (editado: 08:23)
HTML - RODAPE

<footer id="fim">
<div class="texto">
<p><strong>Desenvolvido por:</strong> <em>Vladismara Psych Martins</em><br>
WhatsApp: (43) 9 9912-5115 | vladismara@gmail.com
</p>
<!-- Código anterior:
<a class="voltar" href="#inicio">Voltar ao início</a>
</div>
</footer>


/* CSS RODAPÉ */
footer {
min-height: 7em;
color: var(--verde-profundo);
background-color: var(--verde-claro);
display: flex;
justify-content: center;
align-items: center;
text-align: center;
padding: 20px;
border-radius: 5px;
}

footer p {
line-height: 1.5;
}

