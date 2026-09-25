 <script>
  const botao = document.getElementById("botao-busca");
  const inputCidade = document.getElementById("cidade");
  const elementoTemperatura = document.getElementById("temperatura");
  const elementoCidade = document.getElementById("nome-cidade");
const elementoDescricao = document.getElementById("descricao");
const elementoIcone = document.getElementById("icone-clima");

  async function buscarClima() {
    const resposta = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputCidade.value + "&appid=" + CHAVE_API + "&lang=pt_br");
    const dados = await resposta.json();
    elementoTemperatura.textContent = Math.round((dados.main.temp - 273.15)) + "ºC";
    elementoCidade.textContent = dados.name;
    const descricaoCapitalizada = dados.weather[0].description.charAt(0).toUpperCase() + dados.weather[0].description.slice(1);
    elementoDescricao.textContent = descricaoCapitalizada;
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
</script>