const global_state ={
    playlist:[]
       
};
const reducer = (state = global_state, action) => {
    const newState = {...state,
        playlist:state.playlist.slice()
    };

    if(action.type === 'submit')
    {
        let url = action.value;
        if(url.lastIndexOf("=")!=-1)
        {
           url=url.substring(url.lastIndexOf("=")+1,url.length)
        }
        if(url.lastIndexOf("=")==-1)
        {
           url=url.substring(url.lastIndexOf("/")+1,url.length)
        }
        newState.playlist.push(url);
        
        
    }
    if(action.type=== "change")
    {
       let link= newState.playlist.splice(action.index,1);
       newState.playlist.splice(action.nextindex,0,link);
      
    }
    if(action.type === "remove")
    {
        newState.playlist.splice(action.index,1);
       

    }

    return newState;
}

export default reducer;