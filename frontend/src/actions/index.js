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

export const getNotifications = () => {
    return {
        type: 'GETNOTIFICATIONS'
    }
}

export const addNotification = (data) => {
    return {
        type: 'ADDNOTIFICATION',
        payload: data
    };
};

export const deleteNotification = (data) => {
    return {
        type: 'DELETENOTIFICATION',
        payload: data
    }
}