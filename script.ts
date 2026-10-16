declare const CHAVE_API: string;
  const botao = document.getElementById("botao-busca") as HTMLButtonElement;
  const inputCidade = document.getElementById("cidade") as HTMLInputElement;
  const elementoTemperatura = document.getElementById("temperatura") as HTMLParagraphElement;
  const elementoCidade = document.getElementById("nome-cidade") as HTMLHeadingElement;
const elementoDescricao = document.getElementById("descricao") as HTMLParagraphElement;
const elementoIcone = document.getElementById("icone-clima") as HTMLImageElement;
const elementoHora = document.getElementById("hora-local") as HTMLParagraphElement;
const elementoUmidade = document.getElementById("umidade") as HTMLDivElement;
const elementoVento = document.getElementById("vento") as HTMLDivElement;

interface DadosClima {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
    timezone: number;
}

  async function buscarClima() {
    const resposta = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputCidade.value + "&appid=" + CHAVE_API + "&lang=pt_br");
     if(resposta.ok === false) {
        elementoTemperatura.textContent = "Cidade não encontrada";
        elementoCidade.textContent = "";
        elementoDescricao.textContent = "";
        elementoHora.textContent = ""; 
        elementoIcone.src = "";
        elementoUmidade.textContent = "";
        elementoVento.textContent = "";
        document.body.classList.remove("temanoite");
       document.body.classList.add("temadia")
      return false;
    }
    const dados = await resposta.json() as DadosClima;
    elementoTemperatura.textContent = Math.round((dados.main.temp - 273.15)) + "ºC";
    elementoCidade.textContent = dados.name;
    const descricao = dados.weather[0]?.description || "";
    const descricaoCapitalizada = descricao.charAt(0).toUpperCase() + descricao.slice(1);
    elementoDescricao.textContent = descricaoCapitalizada;
    const periodo = dados.weather[0]?.icon.slice(-1);
    if(periodo  == 'n'){
      document.body.classList.remove("temadia");
      document.body.classList.add("temanoite");
      elementoIcone.style.display = "block";
    } else {
      document.body.classList.remove("temanoite");
      document.body.classList.add("temadia");
      elementoIcone.style.display = "block";
    }
   const icone = dados.weather[0]?.icon || "";
    elementoIcone.src = "https://openweathermap.org/img/wn/" + icone + "@2x.png";
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

inputCidade.addEventListener("keypress", async function(event: KeyboardEvent) {
    if (event.key === "Enter") {
       buscarClima();
    }
});