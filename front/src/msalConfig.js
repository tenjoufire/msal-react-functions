export const msalConfig = {
    auth: {
      clientId: process.env.REACT_APP_AZURE_AD_CLIENT_ID,
      authority: "https://login.microsoftonline.com/" + process.env.REACT_APP_AZURE_AD_TENANT_ID,
      redirectUri: process.env.REACT_APP_AZURE_AD_REDIRECT_URI,
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: false,
    },
  };