const w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

let bgReady = false;
const bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = 'images/background.png';

let heroReady = false;
const heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = 'https://img.pokemondb.net/sprites/ruby-sapphire/normal/mew.png';

let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};

const pokemonArray = [
  'bulbasaur',
  'ivysaur',
  'venusaur',
  'charmander',
  'charmeleon',
  'charizard',
  'squirtle',
  'wartortle',
  'blastoise',
  'caterpie',
  'metapod',
  'butterfree',
  'weedle',
  'kakuna',
  'beedrill',
  'pidgey',
  'pidgeotto',
  'pidgeot',
  'rattata',
  'raticate',
  'spearow',
  'fearow',
  'ekans',
  'arbok',
  'pikachu',
  'raichu',
  'sandshrew',
  'sandslash',
  'nidoran-f',
  'nidorina',
  'nidoqueen',
  'nidoran-m',
  'nidorino',
  'nidoking',
  'clefairy',
  'clefable',
  'vulpix',
  'ninetails',
  'jigglypuff',
  'wigglytuff',
  'zubat',
  'golbat',
  'oddish',
  'gloom',
  'vileplume',
  'paras',
  'parasect',
  'venonat',
  'venomoth',
  'diglett',
  'dugtrio',
  'meowth',
  'persian',
  'psyduck',
  'golduck',
  'mankey',
  'primeape',
  'growlithe',
  'arcanine',
  'poliwag',
  'poliwhirl',
  'poliwrath',
  'abra',
  'kadabra',
  'alakazam',
  'machop',
  'machoke',
  'machamp',
  'bellsprout',
  'weepinbell',
  'victreebel',
  'tentacool',
  'tentacruel',
  'geodude',
  'graveler',
  'golem',
  'ponyta',
  'rapidash',
  'slowpoke',
  'slowbro',
  'magnemite',
  'magneton',
  'farfetchd',
  'doduo',
  'dodrio',
  'seel',
  'dewgong',
  'grimer',
  'muk',
  'shellder',
  'cloyster',
  'gastly',
  'haunter',
  'gengar',
  'onix',
  'drowzee',
  'hypno',
  'krabby',
  'kingler',
  'voltorb',
  'electrode',
  'exeggcute',
  'exeggutor',
  'cubone',
  'marowak',
  'hitmonlee',
  'hitmonchan',
  'lickitung',
  'koffing',
  'weezing',
  'rhyhorn',
  'rhydon',
  'chansey',
  'tangela',
  'kangaskhan',
  'horsea',
  'seadra',
  'goldeen',
  'seaking',
  'staryu',
  'starmie',
  'mr-mime',
  'scyther',
  'jynx',
  'electabuzz',
  'magmar',
  'pinsir',
  'tauros',
  'magikarp',
  'gyarados',
  'lapras',
  'ditto',
  'eevee',
  'vaporeon',
  'jolteon',
  'flareon',
  'porygon',
  'omanyte',
  'omastar',
  'kabuto',
  'kabutops',
  'aerodactyl',
  'snorlax',
  'articuno',
  'zapdos',
  'moltres',
  'dratini',
  'dragonair',
  'dragonite',
  'mewtwo',
];

const hero = {
	speed: 300
};
const monster = {};
let pokemonCaught = 0;

const keysDown = {};

addEventListener('keydown', (e) => {
	keysDown[e.keyCode] = true;
}, false);

addEventListener('keyup', (e) => {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
const reset = function () {
    const randomInt = getRandomInt(0, pokemonArray.length);

    monsterImage.src = `https://img.pokemondb.net/sprites/ruby-sapphire/normal/${pokemonArray[randomInt]}.png`;
    pokemonArray.splice(randomInt, 1);
    // monsterImage.src = `images/pokemon/${pokemonArray[randomInt]}.png`;
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // Throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

const update = function (modifier) {
	if (38 in keysDown) hero.y -= hero.speed * modifier;
	if (40 in keysDown) hero.y += hero.speed * modifier;
	if (37 in keysDown) hero.x -= hero.speed * modifier;
	if (39 in keysDown) hero.x += hero.speed * modifier;

  if ((hero.y <= 0 || hero.y >= 512) || (hero.x <= 0 || hero.x >= 480)) reset();


	if (hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32) && hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)) {
		++pokemonCaught;
		reset();
	}
};

const render = function () {
	if (bgReady) ctx.drawImage(bgImage, 0, 0);
	if (heroReady) ctx.drawImage(heroImage, hero.x, hero.y);
	if (monsterReady) ctx.drawImage(monsterImage, monster.x, monster.y);

  ctx.fillStyle = 'rgb(250, 250, 250)';
  ctx.font = '24px Helvetica';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Pokemon caught: ' + pokemonCaught, 32, 32);
};

const main = function () {
	const now = Date.now();
	const delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
};

// Let's play this game!
let then = Date.now();
reset();
main();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
