export function logInUserReducer( state = null, action) {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.payload;
        default:
            return state;
    }


    
};

//artProducts
export function artProducts( state = null, action) {
    switch (action.type) {
        case 'FETCH_PRODUCTS':
            return action.payload;
        default:
            return state;
    }
}

//artProducts
export function numOfinCart( state = 0, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return action.payload;
        default:
            return state;
    }
}