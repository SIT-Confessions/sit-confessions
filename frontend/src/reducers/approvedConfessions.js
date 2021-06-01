const approvedConfessionsReducer = (state = [], action) => {
    switch(action.type) {
        case 'GETAPPROVEDCONFESSIONS':
            return state;
        case 'SETAPPROVEDCONFESSIONS':
            return action.payload;
        default:
            return state;
    }
}

export default approvedConfessionsReducer;