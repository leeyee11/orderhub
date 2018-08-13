
const defaultState = {
	hash:null
}
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SIGNIN':
    	state.hash=action.hash;
      return state;
    default: 
      return state;
  }
};

export default reducer;
