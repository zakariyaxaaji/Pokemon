const arrayOfPromises = [];
// Loop to create an array of promises for fetching data of the first 150 Pokémon
for (let i = 1; i <= 151; i++) {
  const URL = `https://pokeapi.co/api/v2/pokemon/${i}/`;
  arrayOfPromises.push(fetch(URL).then((Response) => Response.json()));
}

Promise.all(arrayOfPromises)
  .then((results) => {
    // Mapping over the results to extract necessary data and structure it for display
    return results.map((result) => {
      const pokemon = {};
      pokemon["name"] = result.name;
      pokemon["id"] = result.id;
      pokemon["types"] = result.types
        .map((type) => {
          return type.type.name;
        })
        .join(", "); // Concatenating types into a single string
      pokemon["picture"] = result.sprites.front_default;
      pokemon["weight"] = result.weight;
      return pokemon;
    });
  })
  .then((arrayOfPokemon) => {
    // Once all Pokémon data is processed, pass it to the display function
    displayPokemon(arrayOfPokemon);
  })
  .catch((err) => {
    console.error(err); // Handling errors if any occur during fetching or processing
  });

const cards = document.querySelector(".cards");
function displayPokemon(pokemon) {
  // Generating HTML string for each Pokémon and joining them together
  let htmlString = pokemon
    .map((poke) => {
      return `
    <li class="card">
    <img
      src="${poke.picture}"
      alt=" ${poke.name}'s image"
    />
    <h2>${poke.id} ${poke.name}</h2>
    <p>types: ${poke.types}</p>
    <p>weight: ${poke.weight}</p>
  </li>
  `;
    })
    .join("");

  cards.innerHTML = htmlString; // Setting the HTML content of the .cards element
}
