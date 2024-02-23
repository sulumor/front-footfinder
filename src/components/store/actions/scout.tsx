export const UNFOLLOW = "UNFOLLOW";
export const UDPATE_SCOUT = "UPDATE_SCOUT";

export const scoutUnfollow = () => {
    return { type: UNFOLLOW }
};

export const scoutUpdate = () => {
    return { type: UDPATE_SCOUT };
}