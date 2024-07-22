import { loginRequest, graphConfig } from "../authConfig";
import { msalInstance } from "../index";

export async function callApi(accessToken) {
    if (!accessToken) {
        const account = msalInstance.getActiveAccount();
        if (!account) {
            throw Error("No active account! Verify a user has been signed in and setActiveAccount has been called.");
        }
    
        const response = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: account
        });
        accessToken = response.accessToken;
        console.log(accessToken);
    }

    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    console.log(bearer);

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(process.env.REACT_APP_API_ENDPOINT, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}
