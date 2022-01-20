const trigger = document.querySelector('#trigger');
const picture = document.querySelector('img');
const nameField = document.querySelector('.name-field span');
const abilitiesField = document.querySelector('.abilities-field span');
let mainIndex = -1;

async function getRandomPoke() {
    let randIndex = Math.floor(Math.random() * 100) + 1;
    while (randIndex == mainIndex) {
        console.log('duplicate');
        randIndex = Math.floor(Math.random() * 100) + 1
    };
    mainIndex = randIndex;
    const randomPoke = await fetchPoke(randIndex);
    return randomPoke;
}

async function fetchPoke(index) {
    const fetchedData = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
    const poke = await fetchedData.json();
    return poke;
}

function formatPokeData(poke) {
    const pokePic = poke.sprites.other['official-artwork']['front_default'];
    const pokeName = poke.name;
    const abilities = poke.abilities.map((ability) => {
        return ability.ability.name;
    });
    return { picture: pokePic, name: pokeName, abilities: abilities };
}

function setPokeName(domNode, pokeName) {
    domNode.innerText = pokeName;
}

function setPokePic(domNode, pokePic, pokeName) {
    domNode.setAttribute('src', pokePic);
    domNode.setAttribute('alt', pokeName);
}

function setPokeAbilities(domNode, pokeAbilities) {
    let textToInsert = '';
    pokeAbilities.forEach((ability) => (textToInsert += ` ${ability}`));
    domNode.innerText = textToInsert;
}

function setDomData(poke) {
    setPokePic(picture, poke.picture, poke.name);
    setPokeName(nameField, poke.name);
    setPokeAbilities(abilitiesField, poke.abilities);
}

getRandomPoke()
    .then((pokemon) => {
        const formattedData = formatPokeData(pokemon);
        setDomData(formattedData);
    })
    .catch((err) => console.log('error fetching pokemon: ', err));

trigger.addEventListener('click', () => {
    getRandomPoke()
        .then((pokemon) => {
            const formattedData = formatPokeData(pokemon);
            setDomData(formattedData);
        })
        .catch((err) => console.log('error fetching pokemon: ', err));
})

