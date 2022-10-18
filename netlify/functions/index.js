const axios = require('axios').default;

const API_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/';

exports.handler = async (event, context) => {
  try {
    const { pokemonID } = event.body;
    const { data: pokemon } = await axios.get(`${API_ENDPOINT}${pokemonID}`);
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${pokemon.name}</title>
        </head>
        <body>
          <header>
            <h1>${pokemon.name}</h1>
          </header>
          <main>
            <img src="${pokemon.sprites.front_default}" />
            <ul>
              ${pokemon.abilities.map(data => (
                `<li>${data.ability.name}</li>`
              ))}
            </ul>
          </main>
        </body>
      </html>
    `;
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: html,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
