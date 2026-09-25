
  const botao = document.getElementById("botao-busca");
  const inputCidade = document.getElementById("cidade");
  const elementoTemperatura = document.getElementById("temperatura");
  const elementoCidade = document.getElementById("nome-cidade");
const elementoDescricao = document.getElementById("descricao");
const elementoIcone = document.getElementById("icone-clima");
const elementoHora = document.getElementById("hora-local");

  async function buscarClima() {
    const resposta = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputCidade.value + "&appid=" + CHAVE_API + "&lang=pt_br");
    const dados = await resposta.json();
    elementoTemperatura.textContent = Math.round((dados.main.temp - 273.15)) + "ºC";
    elementoCidade.textContent = dados.name;
    const descricaoCapitalizada = dados.weather[0].description.charAt(0).toUpperCase() + dados.weather[0].description.slice(1);
    elementoDescricao.textContent = descricaoCapitalizada;
    elementoIcone.src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + "@2x.png";
    const tempoLocalMs = Date.now() + (dados.timezone * 1000);
const dataLocal = new Date(tempoLocalMs);
const horarioFormatado = dataLocal.toLocaleTimeString("pt-BR", { timeZone: "UTC" });
    elementoHora.textContent = "Hora local: " + horarioFormatado;
    inputCidade.value = "";
}

 botao.addEventListener("click", function() {
   buscarClima();
});

inputCidade.addEventListener("keypress", async function(event) {
    if (event.key === "Enter") {
       buscarClima();
    }
});