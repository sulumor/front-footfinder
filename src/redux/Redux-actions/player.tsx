export const UDPATE_PLAYER = "UPDATE_PLAYER";
export const UPDATE_MATCH = "UPDATE_MATCH"

export const playerUpdate = () => {
    return { type: UDPATE_PLAYER };
};

export const updateMatch = () => {
    return { type: UPDATE_MATCH }
};