const PARAM_KEYS = [
  "race",
  "attribute",
  "level",
  "atk",
  "def",
];

const ATTRIBUTES = [
  "DARK",
  "RIGHT",
  "EARTH",
  "WATER",
  "FIRE",
  "WIND",
  "DEVINE",
];

const INDEFINITE_ATK_IDS = [
  "83235263", //Tyranno Infinity
  "36021814", //King of the Skull Servants
  "50263751", //Greed Quasar
  "31042659", //Supreme Sovereign Serpent of Golgonda
  "71544954", //Megarock Dragon
  "14291024", //Gradius' Option
  "87978805", //Parasitic Ticky
  "36584821", //Gren Maju Da Eiza
  "54493213", //Helios - The Primordial Sun
  "2948263", //Gogogo Golem - Golden Form
  "51196174", //The Calculator
  "64379430", //Doomsday Horror
  "75198893", //Scanner
  "95403418", //Starduston
  "82693917", //Fortune Lady Wind
  "29088922", //Fortune Lady Water
  "57869175", //Fortune Lady Past
  "71870152", //Fortune Lady Fire
  "34471458", //Fortune Lady Light
  "63845230", //Eater of Millions
  "37829468", //Rai-Jin
  "82971335", //Fortune Lady Earth
  "55586621", //Fortune Lady Dark
  "80887952", //Helios Duo Megistus
  "7845138", //Endless Decay
  "69838592", //Yosenju Oyam
  "10000020", //Slifer the Sky Dragon
  "7634581", //Orichalcos Shunoros
  "52512994", //Kasha
  "13893596", //Exodius the Ultimate Forbidden Lord
  "97811903", //Clear Vice Dragon
  "8794435", //Maju Garzett
  "33093439", //Cyber Eltanin
  "21208154", //The Wicked Avatar
  "57793869", //The Wicked Eraser
  "82103466", //Divine Serpent Geh
  "8400623", //Evil Dragon Ananta
  "5008836", //Exodia, the Legendary Defender
  "58604027", //The Legendary Exodia Incarnate
  "84769941", //Super Anti-Kaiju War Machine Mecha-Dogoran
  "16306932", //Odd-Eyes Revolution Dragon
  "21686473", //D/D/D Destiny King Zero Laplace
  "40591390", //Destiny HERO - Dreadmaster
  "10000", //Ten Thousand Dragon
  "98777036", //Tragoedia
  "33776734", //Winged Kuriboh LV9
  "4068622", //Blackwing - Aurora the Northern Lights
  "17286057", //Helios Trice Megistus
  "18631392", //Ma'at
  "23303072", //Montage Dragon
  "10000010", //The Winged Dragon of Ra
  "93880808", //Arcana Triumph Joker
  "10000040", //The Creator God of Light, Horakhty
  "10000080", //The Winged Dragon of Ra - Sphere Mode
].join(",")

const INDEFINITE_DEF_IDS = [
  "45871897", //Lost Guardian
  "50263751", //Greed Quasar
  "71544954", //Megarock Dragon
  "14291024", //Gradius' Option
  "87978805", //Parasitic Ticky
  "36584821", //Gren Maju Da Eiza
  "54493213", //Helios - The Primordial Sun
  "64379430", //Doomsday Horror
  "75198893", //Scanner
  "95403418", //Starduston
  "82693917", //Fortune Lady Wind
  "29088922", //Fortune Lady Water
  "57869175", //Fortune Lady Past
  "71870152", //Fortune Lady Fire
  "34471458", //Fortune Lady Light
  "63845230", //Eater of Millions
  "82971335", //Fortune Lady Earth
  "55586621", //Fortune Lady Dark
  "80887952", //Helios Duo Megistus
  "69838592", //Yosenju Oyam
  "10000020", //Slifer the Sky Dragon
  "33093439", //Cyber Eltanin
  "21208154", //The Wicked Avatar
  "57793869", //The Wicked Eraser
  "8400623", //Evil Dragon Ananta
  "5008836", //Exodia, the Legendary Defender
  "16306932", //Odd-Eyes Revolution Dragon
  "40591390", //Destiny HERO - Dreadmaster
  "10000", //Ten Thousand Dragon
  "98777036", //Tragoedia
  "33776734", //Winged Kuriboh LV9
  "17286057", //Helios Trice Megistus
  "18631392", //Ma'at
  "10000010", //The Winged Dragon of Ra
  "10000040", //The Creator God of Light, Horakhty
  "10000080", //The Winged Dragon of Ra - Sphere Mode
].join(",")

export const smallWorld = (startName, goalName, cards) => {
  const fixed_cards = cards.map(card => {
    if (INDEFINITE_ATK_IDS.includes(card.id)) card.atk = "?";
    if (INDEFINITE_DEF_IDS.includes(card.id)) card.def = "?";
    return card;
  });

  console.log(startName.start_name)
  const startCard = fixed_cards.find(card => card.name == startName.start_name);
  const goalCard = fixed_cards.find(card => card.name == goalName.goal_name);

  if (typeof startCard === 'undefined' || typeof goalCard === 'undefined') return [];

  const candidateByStart = fixed_cards.filter(card => match_only_one(startCard, card));
  const matched = candidateByStart.filter(card => match_only_one(goalCard, card));
  
  console.log(matched.length)
  matched.sort(function(a,b){
    if(ATTRIBUTES.indexOf(a.attribute) < ATTRIBUTES.indexOf(b.attribute)) return -1;
    if(ATTRIBUTES.indexOf(a.attribute) > ATTRIBUTES.indexOf(b.attribute)) return 1;
    if(a.level < b.level) return -1;
    if(a.level > b.level) return 1;
    return 0;
  });
  return matched;
};

export const filter = (cards, params) => {
  var result = cards
  for (let [key, value] of Object.entries(params)) {
    if (value == "All") continue;

    result = result.filter(card => card[key] == value)
    console.log('key:' + key + ' value:' + value);
  }

  return result;
};

const match_only_one = (selectedCard, card) => {
  let matchCount = 0;
  for ( const key of PARAM_KEYS) {
    if (selectedCard[key] == card[key]) {
      matchCount += 1;
    }
    if (matchCount >= 2) break;
  }
  return matchCount == 1
};