import React, {useEffect} from 'react';
import './App.css';

import Content from './Components/Content/Content';
import AuthService from './Services/api/AuthService';
import TokenService from './Services/api/TokenService';

const teamId = 'a001994b-918b-4939-8518-3377732e4e88';
const refreshToken = '059c420e-7424-431f-b23b-af0ecabfe7b8';
function App() {
  useEffect(() => {
    const authService = new AuthService()
    authService.setInitialAccessToken(teamId, refreshToken).then((response) => {      
      const { data = {} } = response;
      const {access_token} = data;
      const tokenService = new TokenService()
      tokenService.setUser({
        teamId, 
        refreshToken,
        accessToken: access_token
      })
    });
  }, [])
  return (
    <div className="App">
      <Content />
    </div>
  );
}

export default App;
