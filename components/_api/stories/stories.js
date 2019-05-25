let api = "https://api.historicroutes.org";

export const FetchStories = () => {
    return fetch(api + "/stories/fetch-stories", {
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