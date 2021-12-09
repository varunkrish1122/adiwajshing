import axios from 'axios';

class AuthService {
    // We can Write Login Services Here,

    // Just Initial Access Token
    setInitialAccessToken(teamId, refreshToken) {
        return axios.post('https://api-teams.chatdaddy.tech/token', {
            teamId,
            refreshToken
        })
    }
};

export default AuthService