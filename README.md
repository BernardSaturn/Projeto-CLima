# Aplicação de Clima

## Descrição
A **Aplicação de Clima** é uma interface interativa que exibe informações meteorológicas para cidades pesquisadas pelo usuário, incluindo dados sobre temperatura, condições do tempo, umidade e velocidade do vento. Esse projeto é desenvolvido com HTML, CSS e JavaScript, com uma interface visualmente atrativa e adaptada para funcionar em diferentes dispositivos.

## Estrutura do Projeto

- **`index.html`**: Arquivo principal que contém a estrutura HTML da página.
- **`style.css`**: Arquivo de estilos CSS responsável pela estilização de todos os elementos na página.
- **`main.js`**: Script que controla a lógica da aplicação, incluindo a busca e exibição dos dados meteorológicos.
- **`./images/`**: Diretório com imagens de fundo específicas, exibidas conforme o clima atual.
- **`./icons/`**: Diretório com ícones de diferentes condições meteorológicas (sol, chuva, nuvens, etc.).

## Decisões de Design

1. **Paleta de Cores**:
   - Fundo escuro (`#111`) para um contraste que destaca os textos claros (`#fff`), proporcionando uma leitura fácil e confortável.
   
2. **Ícones e Imagens**:
   - Ícones personalizados para representar as condições climáticas e o uso de Font Awesome para o ícone de pesquisa.
   
3. **Painel de Informação**:
   - Painel lateral com transparência (`rgba(110, 110, 110, 0.25)`) e efeito de desfoque (`backdrop-filter: blur(10px)`), o que oferece uma aparência elegante e mantém o foco no conteúdo principal.
   
4. **Responsividade**:
   - Uso de media queries para ajustes automáticos, melhorando a experiência de usuário em dispositivos móveis e telas menores.

## Estrutura dos Dados Exibidos

### Dados Meteorológicos
A aplicação exibe as seguintes informações meteorológicas:

- **Localização**: Nome da cidade e país selecionados.
- **Hora e Data**: Exibição da hora e dia da semana atuais.
- **Condições do Tempo**:
   - **Temperatura**: Exibida em graus Celsius.
   - **Condição**: Uma descrição textual do clima atual, como "Ensolarado", "Nublado", "Chuvoso", etc.
   - **Umidade**: Percentual de umidade relativa do ar.
   - **Vento**: Velocidade do vento, exibida em km/h.

## Instalação e Execução do Projeto

Para rodar o projeto localmente, siga os passos abaixo:

1. **Clone o repositório** para seu ambiente local:
   ```bash
   git clone https://github.com/BernardSaturn/Projeto-CLima.git
