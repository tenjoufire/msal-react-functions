// 必要なパッケージをインポートします
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./msalConfig";

// MSALの設定を行います
const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup().catch(e => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    instance.logout();
  };

  return (
    <MsalProvider instance={msalInstance}>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <AuthenticatedTemplate>
        {/* ログイン後に表示するコンテンツ */}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        {/* ログイン前に表示するコンテンツ */}
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
}

export default App;