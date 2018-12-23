import Transport from '../Transport/Transport';

interface IUserInfo {
    login: string;
    score: number;
    email: string;
}

class UserService {
    private errorMessages: object;
    private userInfo: IUserInfo;

    /**
     * @constructor
     */
    constructor() {
        this.clearUserData();
        this.errorMessages = {
            400: 'Incorrect login or password',
        };
    }

    /**
     * Get user data
     * @return {*}
     */
    public getUserInfo(property) {
        return this.userInfo[property];
    }

    /**
     * Check, that user in system
     * @return {*}
     */
    public isLogIn() {
        return !!this.userInfo.login;
    }

    public checkAuth() {
        return Transport.Get('/session')
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
                throw response.status;
            })
            .then((userInfo) => {
                this.userInfo = userInfo;
                return 'ok';
            }).catch(() => this.clearUserData());
    }

    /**
     * Log out user
     * @return {*}
     */
    public logOut() {
        const request = {};
        return Transport.Delete('/session', request)
            .then(() => {
                this.clearUserData();
                return 'ok';
            });
    }

    public updateUser(score: string, password: string, email: string) {
        const requestBody = {
            login: '',
        };
        if (this.isLogIn()) {
            // requestBody.login = this.userInfo.login;
            return Transport.Put('/user', requestBody);
        }
        return new Promise((resolve) => resolve());
    }

    public logIn(requestBody) {
        return this.handleAuthResponse(Transport.Post('/session', requestBody));
    }

    public register(requestBody) {
        return this.handleAuthResponse(Transport.Post('/user', requestBody));
    }

    public updateScore(score: string) {
        if (+score > this.userInfo.score) {
            Transport.Post('/user/updateScore', {score});
        }
    }

    private handleAuthResponse(fetch: Promise<object>) {
        return fetch
            .then((response: Response) => {
                if (response.status === 200) {
                    return response.json();
                }
                throw response.json();
            })
            .then((userInfo) => {
                this.userInfo = userInfo;
                return 'ok';
            })
            .catch((err) => err);
    }

    private clearUserData() {
        this.userInfo = {
            login: null,
            email: null,
            score: null,
        };
    }
}
const userService = new UserService();

export default userService;
