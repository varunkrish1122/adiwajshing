class TokenService {
    getLocalRefreshToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.refreshToken;
    }
    getLocalgetLocalTeamId() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.teamId;
    }
    getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.accessToken;
    }
    updateLocalAccessToken(token) {
        let user = JSON.parse(localStorage.getItem("user"));
        user.accessToken = token;
        localStorage.setItem("user", JSON.stringify(user));
    }
    setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }
};

export default TokenService