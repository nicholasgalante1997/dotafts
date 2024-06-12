import React, { createContext, useContext } from 'react';
import _merge from 'lodash.merge';
import { IAuthContextActions, IAuthContextState } from './types';

type IAuthContext = IAuthContextActions & IAuthContextState;

const defaultCtx: IAuthContext = {
  _auth: {
    isAuthenticated: false,
    anonymous: true
  },
  set(state) {
    _merge(this._auth, state?._auth || {});
    if (state.user) {
      _merge(this.user, state.user);
    }
  }
};

export const AuthContext = createContext<IAuthContext>(defaultCtx);
export const useAuthContext = () => useContext(AuthContext);
