import React, { useCallback, useState } from 'react';
import _merge from 'lodash.merge';
import { AuthProviderProps, IAuthContextState } from './types';
import { AuthContext } from './Context';

const defaultAuthState = { _auth: {} };

function AuthProvider({ children, authState }: AuthProviderProps) {
  const [state, setState] = useState<IAuthContextState>(authState || defaultAuthState);
  const set = useCallback(
    (next: IAuthContextState) => {
      const stateClone = structuredClone(state);
      const merged = _merge(stateClone, next);
      setState(merged);
    },
    [state, setState]
  );
  return <AuthContext.Provider value={{ ...state, set }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
