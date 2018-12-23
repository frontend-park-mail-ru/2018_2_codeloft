import { combineReducers } from 'redux';

import { common } from './common/common.reducer';
import { lang } from './lang/lang.reducer';
import { signIn } from './signIn/signIn.reducer';
import { validator } from './validator/validation.reducer';
import { signUp } from './signUp/signUp.reducer';

export default combineReducers({
    common,
    lang,
    signIn,
    validator,
    signUp,
});
