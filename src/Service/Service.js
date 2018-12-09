import cookie from 'react-cookies';
import AppSettings from '../AppSettings';
import Api from './Api';

const ServiceConstant = {
    loginUrl: 'login',
    registerUrl: 'user',
    playersUrl: 'players',
};

class Service extends Api {
    login(inputData) {
        return this.fetchAsync(
AppSettings.BaseURL + ServiceConstant.loginUrl,
            AppSettings.PostMethod, AppSettings.Headers, inputData,
);
    }

    register(inputData) {
        return this.fetchAsync(
AppSettings.BaseURL + ServiceConstant.registerUrl,
            AppSettings.PostMethod, AppSettings.Headers, inputData,
);
    }

    players(inputData) {
        const token = this.getCookie('token');
        const headers = { Authorization: `Bearer ${token}` };
        return this.fetchAsync(
AppSettings.BaseURL + ServiceConstant.playersUrl,
            AppSettings.GetMethod, headers, inputData,
);
    }

    createPlayer(inputData) {
        const token = this.getCookie('token');
        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
        return this.fetchAsync(
AppSettings.BaseURL + ServiceConstant.playersUrl,
            AppSettings.PostMethod, headers, inputData,
);
    }

    getCookie(name) {
       return cookie.load(name);
    }

    setCookie(name, value) {
        cookie.save(
            name,
            value,
            {
              path: '/',
            },
          );
    }

    removeCookie(name) {
        cookie.remove(name, { path: '/' });
    }
}

export default Service;
