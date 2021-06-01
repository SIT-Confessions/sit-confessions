export const viewApprovedConfessions = () => {
    return {
        type: 'GETAPPROVEDCONFESSIONS'
    };
};

export const setApprovedConfessions = (data) => {
    return {
        type: 'SETAPPROVEDCONFESSIONS',
        payload: data
    };
};