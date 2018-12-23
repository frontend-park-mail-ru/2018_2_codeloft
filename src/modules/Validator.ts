import langService from '../service/LangService/LangService';
import { ChangeEvent } from 'react';

interface ICheckCofig {
    loginMin: (value: string) => boolean;
    loginMax: (value: string) => boolean;
    russian: (value: string) => boolean;
    passwordMin: (value: string) => boolean;
    passwordMax: (value: string) => boolean;
    email: (value: string) => boolean;
}

class Validator {
    private readonly checkConfig: ICheckCofig;
    private messageMap: string[];

    constructor() {
        this.checkConfig = {
            loginMin: (value: string) => /.{3}/.test(value),
            loginMax: (value: string) => !/.{21}/.test(value),
            russian: (value: string) => !/[а-яё]/i.test(value),
            passwordMin: (value: string) => /.{8}/.test(value),
            passwordMax: (value: string) => !/.{21}/.test(value),
            email: (value: string) => /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i.test(value),
        };
        this.messageMap = [];
        Object.keys(this.checkConfig).forEach((check) => this.messageMap.push(check));
    }

    public getError(check: string): string {
        return langService.getWord(`validator.${check}`);
    }

    public validateLogin(value: string): string {
        let message = '';
        const checks = [this.checkConfig.loginMin, this.checkConfig.loginMax, this.checkConfig.russian];
        checks.forEach((check, i) => {
            if (!check(value)) {
                message = this.getError(this.messageMap[i]);
            }
        });
        return message;
    }

    public validatePassword(value: string): string {
        let message = '';
        const checks = [this.checkConfig.russian, this.checkConfig.passwordMin, this.checkConfig.passwordMax];
        checks.forEach((check, i) => {
            if (!check(value)) {
                message = this.getError(this.messageMap[i + 2]);
            }
        });
        return message;
    }

    public validateEmail(value: string): string {
        return this.checkConfig.email(value)? '': this.getError('email');
    }

    public validateRepeat(value: string, repeat: string): string {
        return value === repeat? '': this.getError('passwordsEquality');
    }
}

export default new Validator();
