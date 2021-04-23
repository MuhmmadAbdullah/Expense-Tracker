// Reducer => A function that takes in the old state, and an action => new state
const contextReducer = (state, action) => {
    let transaction;
    switch (action.type) {
        case 'DELETE_TRANSACTION':
                transaction = state.filter((t) => t.id !== action.payload)
            return transaction;
        case 'ADD_TRANSACTION':
                transaction = [action.payload, ...state];
            return transaction; 
    
        default:
            break;
    }
}

export default contextReducer;