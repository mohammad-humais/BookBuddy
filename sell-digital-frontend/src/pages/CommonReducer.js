const commonReducer = (state, action) => {
  
    switch (action.type) {
        case 'SET_SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.payload.results
            };
        default:
            return state;
    }
};

export default commonReducer;