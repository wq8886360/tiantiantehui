var state = { 
	loadingState: false
}

const actions = {
    CLOSTLOAD({commit,state}){
        state.loadingState = false;
    },
    SHOW({commit,state}){
        state.loadingState = true;
    }
}

const mutations = { 
    
}

const getters = {
    loadingState(state){return state.loadingState},
}


export default {
	actions,
	mutations,
	state,
	getters
}