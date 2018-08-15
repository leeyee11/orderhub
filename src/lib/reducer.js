
const defaultState = {
	hash:null,
	tab:'Market'
}
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SIGNIN':
    	state.hash=action.hash;
      	return state;
    case 'SIGNOUT':
    	state.hash=null;
      	return state;
    case 'SWITCHTAB':
    	state.tab=action.tab;
    	return state;
    default: 
      	return state;
  }
};

export default reducer;
