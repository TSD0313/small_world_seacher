import Vuex from 'vuex'
 
const appStore = () => {
    return new Vuex.Store({
        state: {
            main_monster_list: {},
            search_result_list: [],
        },
        mutations: {
            main_monster_list_update(state, payload) {
                state.main_monster_list = {...payload}
            },
            search_result_list_update(state, cards) {
              state.search_result_list = cards
            },
        }
    })
};
 
export default appStore;