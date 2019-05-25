let api = "https://api.historicroutes.org";

export const FetchAudio = () => {
    return fetch(api + "/audio/fetch-audios", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            foo: 'bar'
        })
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