let api = "http://142.93.27.45:8080";

/**
 * 
 * @param {String} email | required
 * @param {String} password | required 
 * 
 * There are more props here than are strictly required in case we want
 * to add more later.
 */
export const FetchSignUp = (email, password, first_name, last_name) => {
    console.log(email, password, first_name, last_name, api + "/users/sign-up");
    return fetch(api + "/users/sign-up", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name
        })
    }).then(res => {
        console.log(res);
        try {
            let response = res.json();
            return response;
        } catch(e) {
            console.error(e);
            return {error: e};
        }
    }).catch(e => {
        console.error(e);
        return {error: e};
    });
}

/**
 * 
 * @param {String} email | required
 * @param {String} password | required 
 */
export const FetchSignIn = (email, password) => {
    return fetch(api + "/users/sign-in", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(res => {
        console.log(res);
        try {
            let response = res.json();
            return response;
        } catch(e) {
            console.error(e);
            return {error: e};
        }
    }).catch(e => {
        console.error(e);
        return {error: e};
    });
}

/**
 * 
 * @param {JWT User Token} token 
 */
export const FetchRefreshUser = (token) => {
    return fetch(api + "/users/refresh-user", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: token
        })
    }).then(res => {
        console.log(res);
        try {
            let response = res.json();
            return response;
        } catch(e) {
            console.error(e);
            return {error: e};
        }
    }).catch(e => {
        console.error(e);
        return {error: e};
    });
}

export const FetchChangePassword = (token, oldPassword, newPassword) => {
    return fetch(api + "/users/change-password", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: token,
            oldPassword: oldPassword,
            newPassword: newPassword
        })
    }).then(res => {
        console.log(res);
        try {
            let response = res.json();
            return response;
        } catch(e) {
            console.error(e);
            return {error: e};
        }
    }).catch(e => {
        console.error(e);
        return {error: e};
    });
}

export const FetchForgotPassword = (email) => {
    return fetch(api + "/users/forgot-password", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email
        })
    }).then(res => {
        console.log(res);
        try {
            let response = res.json();
            return response;
        } catch(e) {
            console.error(e);
            return {error: e};
        }
    }).catch(e => {
        console.error(e);
        return {error: e};
    });
}

export const FetchUpdateProfile = (token, profile) => {
    return fetch(api + "/users/update-profile", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: token,
            profile: profile
        })
    }).then(res => {
        console.log(res);
        try {
            let response = res.json();
            return response;
        } catch(e) {
            console.error(e);
            return {error: e};
        }
    }).catch(e => {
        console.error(e);
        return {error: e};
    });
}
