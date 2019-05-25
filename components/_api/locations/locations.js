let api = "https://api.historicroutes.org";

export const FetchLocations = () => {
    console.log("going to fetch locations...", api + "/location-data");
    return fetch(api + "/location-data", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log(res);
        if(res.ok) {
            return res.json();
        } else {
            return { error: true }
        }
    }).catch(e => {
        console.log("ERROR", e);
        return { error: e };
    })
}

export const FetchAudioStories = () => {
    return fetch(api + "/audio-stories", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if(res.ok) {
            return res.json();
        } else {
            return { error: true }
        }
    }).catch(e => {
        console.log("ERROR", e);
        return { error: e };
    })
}

