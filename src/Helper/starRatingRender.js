//Star rating function
//TODO: Try to Optimise this function a bit
const starRating = (getRating = 0) => {
    const TOTAL_RATING = 5;
    let ratingStore = [];
    if (getRating <= 5 && getRating >= 0) { //O(5)
        for (let i = 0; i < TOTAL_RATING; i++) {
            i < getRating ? ratingStore.unshift("*") : ratingStore.push("0");
        }
        return ratingStore;
    } else {
        return [];
    }
};

export default starRating;