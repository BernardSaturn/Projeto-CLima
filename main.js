/*
Seleção de Elementos do DOM: No início do script, várias constantes são definidas para armazenar elementos do DOM que serão manipulados.

Eventos de Clique e Envio: Adiciona eventos de clique para que ao clicar em uma cidade a aplicação busque dados do clima para essa cidade. O mesmo vale para o envio do formulário, onde a cidade é definida pelo que o usuário digitou.

Funções: Existem várias funções definidas, como dayOfTheWeek para determinar o dia da semana, fetchWeatherData para buscar dados da API e traduzirCondicao para traduzir as condições climáticas.

API Fetch: Utiliza a API Fetch para obter dados do clima em formato JSON e atualiza os elementos do DOM de acordo com os dados recebidos.

Tratamento de Erros: Se a cidade não for encontrada, um alerta é exibido.
*/

// Seleciona elementos do DOM que serão utilizados
const app = document.querySelector('.weather-app'); // Seleciona o container principal da aplicação de clima
const temp = document.querySelector('.temp'); // Seleciona o elemento que exibe a temperatura
const dateOutput = document.querySelector('.date'); // Seleciona o elemento que exibe a data
const timeOutput = document.querySelector('.time'); // Seleciona o elemento que exibe a hora
const conditionOutput = document.querySelector('.condition'); // Seleciona o elemento que exibe a condição climática
const nameOutput = document.querySelector('.name'); // Seleciona o elemento que exibe o nome da cidade
const icon = document.querySelector('.icon'); // Seleciona o elemento que exibe o ícone do clima
const cloudOutput = document.querySelector('.cloud'); // Seleciona o elemento que exibe a porcentagem de nuvens
const humidityOutput = document.querySelector('.humidity'); // Seleciona o elemento que exibe a umidade
const windOutput = document.querySelector('.wind'); // Seleciona o elemento que exibe a velocidade do vento
const form = document.getElementById('locationInput'); // Seleciona o formulário de entrada de localização
const search = document.querySelector('.search'); // Seleciona o campo de busca
const btn = document.querySelector('.submit'); // Seleciona o botão de envio
const cities = document.querySelectorAll('.city'); // Seleciona todas as cidades da lista

// Cidade padrão quando a página carrega
let cityInput = "São Paulo";

// Adiciona evento de clique em cada cidade no painel
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        // Troca da cidade padrão pela cidade clicada
        cityInput = e.target.innerHTML;
        // Função que busca e exibe todos os dados da API do clima 
        fetchWeatherData();
        // fade out do app (animação simples)
        app.style.opacity = "0";
    });
});

// Adiciona evento de envio ao formulário
form.addEventListener('submit', (e) => {
    // Se o campo de entrada (barra de pesquisa) estiver vazio, exibe um alerta
    if (search.value.length === 0) {
        alert('Por favor, digite o nome de uma cidade'); // Alerta caso o campo esteja vazio
    } else {
        // Troca da cidade padrão pela cidade escrita no campo de entrada
        cityInput = search.value;
        // Função que busca e exibe todos os dados da API do clima
        fetchWeatherData();
        // Remove texto indesejado do campo de entrada
        search.value = "";
        // fade out do app (animação simples)
        app.style.opacity = "0";
    }

    // Prevê o comportamento padrão do formulário
    e.preventDefault(); // Impede que o formulário seja enviado de forma tradicional
});

// Função para obter o dia da semana em português
function dayOfTheWeek(day, month, year) {
    const weekday = [ // Array com os dias da semana
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
    ];
    return weekday[new Date(`${year}-${month}-${day}`).getDay()]; // Retorna o dia da semana correspondente
};

// Função que busca e exibe os dados da API do clima
function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=2ea37ed6dac5477e9d6194859242810&q=${cityInput}`)
        .then(response => response.json()) // Converte a resposta em JSON
        .then(data => { // Manipula os dados recebidos da API
            console.log(data); // Exibe os dados no console para depuração
            temp.innerHTML = data.current.temp_c + "&#176;"; // Atualiza a temperatura exibida
            conditionOutput.innerHTML = traduzirCondicao(data.current.condition.text); // Atualiza a condição climática

            const date = data.location.localtime; // Obtém a data local
            const y = parseInt(date.substr(0, 4)); // Extrai o ano
            const m = parseInt(date.substr(5, 2)); // Extrai o mês
            const d = parseInt(date.substr(8, 2)); // Extrai o dia
            const time = date.substr(11); // Extrai a hora

            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}/${m}/${y}`; // Atualiza a data exibida
            timeOutput.innerHTML = time; // Atualiza a hora exibida

            // Corrige o nome da cidade caso apareça como "San Paulo"
            nameOutput.innerHTML = data.location.name === "San Paulo" ? "São Paulo" : data.location.name;

            icon.src = `https:${data.current.condition.icon}`; // Atualiza o ícone do clima

            cloudOutput.innerHTML = data.current.cloud + "%"; // Atualiza a porcentagem de nuvens
            humidityOutput.innerHTML = data.current.humidity + "%"; // Atualiza a porcentagem de umidade
            windOutput.innerHTML = data.current.wind_kph + " km/h"; // Atualiza a velocidade do vento

            let timeOfDay = "day"; // Inicializa a variável para definir o momento do dia
            if (!data.current.is_day) { // Verifica se é noite
                timeOfDay = "night"; // Atualiza para "night" se não for dia
            }

            const code = data.current.condition.code; // Obtém o código da condição climática

            // Atribuindo a imagem de fundo com base no código de condição e horário
            if (code == 1000) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`; // Define imagem de fundo para dias claros
                btn.style.background = timeOfDay === "night" ? "#181e27" : "#e5ba92"; // Define a cor do botão com base no momento do dia
            } else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`; // Define imagem de fundo para dias nublados
                btn.style.background = timeOfDay === "night" ? "#181e27" : "#fa6d1b"; // Define a cor do botão com base no momento do dia
            } else if (
                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`; // Define imagem de fundo para dias chuvosos
                btn.style.background = timeOfDay === "night" ? "#325c80" : "#647d75"; // Define a cor do botão com base no momento do dia
            } else {
                app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`; // Define imagem de fundo para dias nevados
                btn.style.background = timeOfDay === "night" ? "#1b1b1b" : "#4d72aa"; // Define a cor do botão com base no momento do dia
            }

            app.style.opacity = "1"; // Restaura a opacidade da aplicação
        })
        .catch(() => {
            alert('Cidade não encontrada, tente novamente'); // Alerta caso a cidade não seja encontrada
            app.style.opacity = "1"; // Restaura a opacidade da aplicação
        });
}

// Função para traduzir as condições meteorológicas
function traduzirCondicao(condicao) {
    const traducaoCondicoes = { // Dicionário de tradução para condições climáticas
        "Clear": "Limpo",
        "Sunny": "Ensolarado",
        "Partly cloudy": "Parcialmente nublado",
        "Cloudy": "Nublado",
        "Overcast": "Encoberto",
        "Mist": "Névoa",
        "Patchy rain possible": "Possibilidade de chuva irregular",
        "Thundery outbreaks possible": "Possibilidade de trovoadas",
        "Blowing snow": "Neve soprando",
        "Freezing fog": "Nevoeiro congelante",
        "Patchy light rain": "Chuvisco irregular",
        "Light rain": "Chuva leve",
        "Patchy rain": "Chuva irregular",
        "Heavy rain": "Chuva forte",
        "Heavy rain at times": "Chuva forte às vezes",
        "Light snow": "Neve leve",
        "Moderate snow": "Neve moderada",
        "Heavy snow": "Neve forte",
        "Snow showers": "Chuvas de neve",
        "Moderate or heavy snow showers": "Chuvas de neve moderadas ou fortes",
        "Snow flurries": "Flocos de neve",
        "Thundershowers": "Chuvas com trovoadas",
    };
    return traducaoCondicoes[condicao] || condicao; // Retorna a tradução da condição ou a condição original se não estiver no dicionário
}

// Executa a função ao carregar a página para exibir a cidade padrão
fetchWeatherData(); // Chama a função para obter dados do clima
