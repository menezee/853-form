const fetch = require("node-fetch");

const API_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/1';

exports.handler = async (event, context) => {
  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify({ data: data.name }) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};

// // const axios = require('axios').default;
// import fetch from 'node-fetch';

// const API_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/';

// exports.handler = async (event, context) => {
//   try {
//     const { pokemonID } = event.body;
//     const requestURL = `${API_ENDPOINT}${pokemonID}`;
//     console.log('[DEBUG]', JSON.stringify({ pokemonID, requestURL }));
//     // const { data: pokemon } = await axios.get(`${API_ENDPOINT}${pokemonID}`);
//     const res = await fetch(requestURL);
//     const pokemon = await res.json();
//     console.log('[DEBUG]', JSON.stringify({ pokemonName: pokemon.name }));
//     const html = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>${pokemon.name}</title>
//         </head>
//         <body>
//           <header>
//             <h1>${pokemon.name}</h1>
//           </header>
//           <main>
//             <img src="${pokemon.sprites.front_default}" />
//             <ul>
//               ${pokemon.abilities.map(data => (
//                 `<li>${data.ability.name}</li>`
//               ))}
//             </ul>
//           </main>
//         </body>
//       </html>
//     `;
//     return {
//       statusCode: 200,
//       body: html,
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ err: 'Failed fetching data', error }),
//     };
//   }
// };
