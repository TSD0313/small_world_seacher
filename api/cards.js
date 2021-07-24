import axios from 'axios'
 
const MAIN_MONSTER_TYPES = [
  "normal%20monster",
  "effect%20monster",
  "flip%20effect%20monster",
  "flip%20tuner%20effect%20monster",
  "gemini%20monster",
  "tuner%20monster",
  "normal%20tuner%20monster",
  "pendulum%20normal%20monster",
  "pendulum%20effect%20monster",
  "pendulum%20flip%20effect%20monster",
  "pendulum%20tuner%20effect%20monster",
  "ritual%20effect%20monster",
  "ritual%20monster",
  "spirit%20monster",
  "toon%20monster",
  "union%20effect%20monster",
].join(",")

class CardApi {
    constructor() {
        this.apiBase = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
    }
 
    async main_monsters() {
        try {
        const json = await axios.get(`${this.apiBase}?type=${MAIN_MONSTER_TYPES}`);
        return json.data
      } catch (e) {
        return ({ error: e });
      }
    }
}
 
const cardApi = new CardApi();
 
export default cardApi;