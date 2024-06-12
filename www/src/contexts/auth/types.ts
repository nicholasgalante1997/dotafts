import React from 'react';

export interface IAuthContextState {
  _auth: {
    isAuthenticated?: boolean;
    token?: string;
    tokenType?: string;
    anonymous?: boolean;
    userAgent?: string;
    geolocation?: any;
  };
  user?: {};
}

export interface IAuthContextActions {
  set(state: IAuthContextState): void;
}

export interface AuthProviderProps {
  children: React.ReactNode | React.ReactNode[];
  authState?: IAuthContextState;
}
