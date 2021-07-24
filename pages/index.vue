<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-2">
          <form>
            <div class="form-group">
              <label for="startCardId">From</label>
              <div style="width:400px">
                <vue-suggest-input v-model="start_name" :items="items"/>
              </div>
            </div>
            <div class="form-group">
              <label for="goalCardId">To</label>
              <div style="width:400px">
                <vue-suggest-input v-model="goal_name" :items="items"/>
              </div>
            </div>
            <button v-on:click="search({start_name}, {goal_name})" type="button" class="btn btn-primary">Search</button>
          </form>
        </div>
        <div class="col-10">
          <div class="container">
            <div v-if="searchAction && items.includes(start_name) && items.includes(goal_name)">
              <div align="right">
                <img class="shadow-lg p-3 mb-5 bg-light rounded" :src="this.$store.state.main_monster_list.data.find(card => card.name == start_name).card_images[0].image_url" width="20%">
                <img class="mx-5" src="/arrow.png">
                <img class="shadow-lg p-3 mb-5 bg-light rounded" :src="this.$store.state.main_monster_list.data.find(card => card.name == goal_name).card_images[0].image_url" width="20%">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5 lead d-flex align-items-end">
      <p style="text-align:left">Created by</p><a href="https://twitter.com/toride0313" class="ml-1" target="_blank" rel="noopener noreferrer"> @toride0313</a><a href="'https://twitter.com/intent/follow?screen_name=toride0313'" class="btn btn-info ml-3 btn-sm" role="button">Twitterをフォローする</a>
    </div>
    <hr>
    <div class="container">
      <form>
        <div class="form-row mt-5">
          <div class="form-group col-md-2">
            <label for="inputState">Level</label>
            <select v-model="filterParam.level" @change="onchange()" id="inputLevel" class="form-control">
              <option selected>All</option>
              <option v-for="i of 12" v-bind:key='i'>
                {{ i }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-2">
            <label for="inputState">Attribute</label>
            <select v-model="filterParam.attribute"  @change="onchange()" id="inputAttribute" class="form-control">
              <option selected>All</option>
              <option v-for="(attr, i) in attributes" v-bind:key='i'>
                {{ attr }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-2">
            <label for="inputState">Race</label>
            <select v-model="filterParam.race"  @change="onchange()" id="inputRace" class="form-control">
              <option selected>All</option>
              <option v-for="(race, i) in races" v-bind:key='i'>
                {{ race }}
              </option>
            </select>
          </div>
        </div>
      </form>
    </div>
    <hr>
    <div v-if="searchAction">
      <div class="container pb-3 lead">
        <a v-bind:href="'https://twitter.com/intent/tweet?text=[' + start_name + ']%E2%96%B6[' + goal_name + ']%E3%82%92%E7%B9%8B%E3%81%90%E3%82%AB%E3%83%BC%E3%83%89%E3%81%AF' + list.length + '%E7%A8%AE%E9%A1%9E%EF%BC%81%23SmallWorldSeacher%20https://tsd0313.github.io/small_world_seacher/'" class="btn btn-info" role="button">結果をTweet</a>
      </div>
    </div>
    <div v-if="viewList.length !== 0">
      <div class="container row">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <button v-on:click="pageChange(1)" class="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </button>
            </li>
            <div v-if="page === length && length >= 3">
              <li class="page-item"><button v-on:click="pageChange({page}.page-2)" class="page-link">{{page-2}}</button></li>
            </div>

            <div v-if="page !== 1 && length >= 2">
              <li class="page-item"><button v-on:click="pageChange({page}.page-1)" class="page-link">{{page-1}}</button></li>
            </div>

            <li class="page-item"><button v-on:click="pageChange({page}.page)" class="page-link">{{page}}</button></li>

            <div v-if="page !== length && length >= 2">
              <li class="page-item"><button v-on:click="pageChange({page}.page+1)" class="page-link">{{page+1}}</button></li>
            </div>
            
            <div v-if="page === 1 && length >= 3">
              <li class="page-item"><button v-on:click="pageChange({page}.page+2)" class="page-link">{{page+2}}</button></li>
            </div>
            
            <li class="page-item">
              <a class="page-link" v-on:click="pageChange({length}.length)" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <p style="text-align:center">Search Results: {{1 + this.pageSize * (this.page - 1)}} - {{Math.min(this.pageSize * this.page, this.filtered.length)}} of {{this.filtered.length}}</p>
      <section class="container mt-5">
        <div class="columns is-multiline">
          <div v-for="(item, i) in this.viewList" v-bind:key='i' class='column is-2'>
            <div class="card" style="width: 14rem;">
              <img :src="item.card_images[0].image_url_small" class="card-img-top" width="50%" height="50%">
              <div class="card-body">
                <a v-bind:href="'https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=1&request_locale=en&keyword=' + item.name" class="card-title font-weight-bold" target="_blank" rel="noopener noreferrer">{{ item.name }}</a>
                <p class="card-text">★{{ item.level }} / {{ item.attribute }} / {{ item.race }}</p>
                <p class="card-text">ATK{{ item.atk }} / DEF{{ item.def }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr>
      <div class="container row">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <button v-on:click="pageChange(1)" class="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </button>
            </li>
            <div v-if="page === length && length >= 3">
              <li class="page-item"><button v-on:click="pageChange({page}.page-2)" class="page-link">{{page-2}}</button></li>
            </div>

            <div v-if="page !== 1 && length >= 2">
              <li class="page-item"><button v-on:click="pageChange({page}.page-1)" class="page-link">{{page-1}}</button></li>
            </div>

            <li class="page-item"><button v-on:click="pageChange({page}.page)" class="page-link">{{page}}</button></li>

            <div v-if="page !== length && length >= 2">
              <li class="page-item"><button v-on:click="pageChange({page}.page+1)" class="page-link">{{page+1}}</button></li>
            </div>
            
            <div v-if="page === 1 && length >= 3">
              <li class="page-item"><button v-on:click="pageChange({page}.page+2)" class="page-link">{{page+2}}</button></li>
            </div>
            
            <li class="page-item">
              <a class="page-link" v-on:click="pageChange({length}.length)" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <hr>
    </div>
    <div v-else>
      <div class="alert alert-warning container row" role="alert">
        No Search Result
      </div>
    </div>
  </div>
</template>
 
<script>
  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

  import cardApi from '@/api/cards';
  import {smallWorld, filter} from '@/src/search';
  import {mapState} from 'vuex';
  import VueSuggestInput from 'vue-suggest-input'
  import 'vue-suggest-input/dist/vue-suggest-input.css'
  import { VueLoading } from 'vue-loading-template'

  export default {
    async fetch({store}) {
      let json = await cardApi.main_monsters();
      store.commit('main_monster_list_update', json);
    },
    data() {
      return {
        start_name: "",
        goal_name: "",
        items: this.$store.state.main_monster_list.data.map(card => card.name),
        page: 1,
        length: 0,
        list: this.$store.state.search_result_list,
        viewList: [],
        pageSize: 30,
        attributes: ["DARK","RIGHT","EARTH","WATER","FIRE","WIND","DEVINE"],
        races: ["Spellcaster","Dragon","Zombie","Warrior","Beast-Warrior","Beast","Winged Beast","Beast","Fiend","Fairy","Insect","Dinosaur","Reptile","Fish","Sea Serpent","Aqua","Pyro","Thunder","Rock","Plant","Machine","Psychic","Divine-Beast","Wyrm","Cyberse"],
        filterParam: {
          level: "All",
          attribute: "All",
          race: "All",
        },
        filtered: [],
        searchAction: false,
      }
    },
    components: {
      VueSuggestInput,
      VueLoading,
    },
    computed: mapState(['main_monster_list','search_result_list']),
    mounted: function(){
      this.length = Math.ceil(this.list.length/this.pageSize);
      this.viewList = this.filtered.slice(0,this.pageSize);
    },
    methods: {
      search(startName, goalName) {
        const search_result = smallWorld(startName, goalName, this.$store.state.main_monster_list.data);
        this.$store.commit('search_result_list_update', search_result);
        this.list = this.$store.state.search_result_list
        this.length = Math.ceil(this.list.length/this.pageSize);
        this.viewList = this.list.slice(0 ,this.pageSize)
        this.page = 1
        this.filtered = search_result,
        this.filterParam = {
          level: "All",
          attribute: "All",
          race: "All",
        }
        if (this.items.includes(startName.start_name) && this.items.includes(goalName.goal_name)) this.searchAction = true
      },
      pageChange( pageNumber ){
        console.log(pageNumber)
        this.page = pageNumber
        this.viewList = this.filtered.slice(this.pageSize * (pageNumber - 1),this.pageSize * (pageNumber))
        this.length = Math.ceil(this.filtered.length/this.pageSize);
      },
      onchange: function() {
        const filter_result = filter(this.list, this.filterParam)
        this.filtered = filter_result
        this.viewList = filter_result.slice(0 ,this.pageSize)
        this.page = 1
        this.length = Math.ceil(filter_result.length/this.pageSize);
        // console.log(this.filterParam.level)
        // console.log(this.filterParam.attribute)
        // console.log(this.filterParam.race)
      }
    },
  }
</script>