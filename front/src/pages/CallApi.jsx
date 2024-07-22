import { useEffect, useState } from "react";

// Msal imports
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

// Sample app imports
import { ProfileData } from "../ui-components/ProfileData";
import { Loading } from "../ui-components/Loading";
import { ErrorComponent } from "../ui-components/ErrorComponent";
import { callApi } from "../utils/ApiCall";

// Material-ui imports
import Paper from "@mui/material/Paper";

const ProfileContent = () => {
    const { instance, inProgress } = useMsal();
    //const [graphData, setGraphData] = useState(null);
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await callApi();
            console.log(result);
            setApiData(result);
        };
        fetchData();
    }, [instance]);

    if (inProgress){
        return <Loading />;
    }
    //fetchData の結果を表示
    return (
        <Paper>
            <ProfileData>
                {apiData}
            </ProfileData>
        </Paper>
    );

    //console.log(apiData);
    //return <div>{apiData}</div>
};

export function CallApi() {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate 
            interactionType={InteractionType.Popup} 
            authenticationRequest={authRequest} 
            errorComponent={ErrorComponent} 
            loadingComponent={Loading}
        >
            <ProfileContent />
        </MsalAuthenticationTemplate>
      )
};