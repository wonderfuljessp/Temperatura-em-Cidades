
  const botao = document.getElementById("botao-busca");
  const inputCidade = document.getElementById("cidade");
  const elementoTemperatura = document.getElementById("temperatura");
  const elementoCidade = document.getElementById("nome-cidade");
const elementoDescricao = document.getElementById("descricao");
const elementoIcone = document.getElementById("icone-clima");
const elementoHora = document.getElementById("hora-local");
const elementoUmidade = document.getElementById("umidade");
const elementoVento = document.getElementById("vento");

  async function buscarClima() {
    const resposta = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputCidade.value + "&appid=" + CHAVE_API + "&lang=pt_br");
     if(resposta.ok === false) {
        elementoTemperatura.textContent = "Cidade não encontrada";
        elementoCidade.textContent = "";
        elementoDescricao.textContent = "";
        elementoHora.textContent = ""; 
        elementoIcone.src = "";
        elementoUmidade.textContent = "";
        elementovento.textContent = "";
        document.body.classList.remove("temanoite");
       document.body.classList.add("temadia")
      return false;
    }
    const dados = await resposta.json();
    elementoTemperatura.textContent = Math.round((dados.main.temp - 273.15)) + "ºC";
    elementoCidade.textContent = dados.name;
    const descricaoCapitalizada = dados.weather[0].description.charAt(0).toUpperCase() + dados.weather[0].description.slice(1);
    elementoDescricao.textContent = descricaoCapitalizada;
    const periodo = dados.weather[0].icon.slice(-1);
    if(periodo  == 'n'){
      document.body.classList.remove("temadia");
      document.body.classList.add("temanoite");
    } else {
      document.body.classList.remove("temanoite");
      document.body.classList.add("temadia");
    }
    elementoIcone.src = "https://openweathermap.org/img/wn/" + dados.weather[0].icon + "@2x.png";
    const tempoLocalMs = Date.now() + (dados.timezone * 1000);
const dataLocal = new Date(tempoLocalMs);
const horarioFormatado = dataLocal.toLocaleTimeString("pt-BR", { timeZone: "UTC", hour: '2-digit', minute: '2-digit'});
    elementoHora.textContent = "Hora local: " + horarioFormatado;
    elementoUmidade.textContent = "Umidade do ar: " + dados.main.humidity + "%";
    elementoVento.textContent = "Velocidade do vento: " + dados.wind.speed + " m/s";
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