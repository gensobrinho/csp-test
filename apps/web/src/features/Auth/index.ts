export { default as authSlice } from './sliceStore/authSliceStore';
export type { IAuthInitialState, IAuthActions } from './sliceStore/authSliceStore';
export type { TAuthUser, TRole } from './types/TAuthUser';
export { MOCK_USERS, mockLogin } from './mocks/auth-user.mock';