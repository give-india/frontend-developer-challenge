const redux = require("redux");

// reducer
function reducer(state = {}, action) {

    if (action.type === "NAME") {
        state.name= action.value;
    }
    if (action.type === "AGE") {
        state.name= action.value;
    }
    return state
}

// store
const store = redux.createStore(reducer);

// Subscribe
store.subscribe(()=>{
    console.log("Subscription:: "+ JSON.stringify(store.getState()));
})

// Action
store.dispatch({type:"NAME", value: "Sharath"})

store.dispatch({type:"AGE", value: 29})

console.log(JSON.stringify(store.getState()));



