let api = "http://localhost:8080";

export const FetchVideos = () => {
    return fetch(api + "/video/fetch-videos", {
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