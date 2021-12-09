import axios from 'axios';
import TokenService from "./TokenService";

const tokenService = new TokenService()
const instanceForToken = axios.create({
    baseURL: "https://api-im.chatdaddy.tech/",
    headers: {
        "Content-Type": "application/json",
    },
});

instanceForToken.interceptors.request.use(
    (config) => {
        const token = tokenService.getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instanceForToken.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        // In Case Of Failures
        const originalConfig = err.config || {};
        // Checking For SignIn API
        if (originalConfig.url !== "/auth/signin" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                // Setting Original Cofig _Retry to true to run again with new Token
                originalConfig._retry = true;

                try {
                    const rs = await axios.post("https://api-teams.chatdaddy.tech/token", {
                        refreshToken: tokenService.getLocalRefreshToken(),
                        teamId: tokenService.getLocalTeamId()
                    });

                    const { access_token } = rs.data;
                    tokenService.updateLocalAccessToken(access_token);

                    return instanceForToken(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);

export default instanceForToken;

