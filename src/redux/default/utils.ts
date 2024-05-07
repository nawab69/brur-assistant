import {RootState} from '../store';
import {ProfileState} from '../types/profile';
import {SliceName} from '../types/sliceNames';
import {WithdrawalState} from '../types/withdrawal';

// export const getStoreInitialState = (): RootState => {
//   return {
//     [SliceName.PROFILE]: getProfileInitialState(),
//     // [SliceName.WITHDRAWAL]: getWithdrawalInitialState(),
//   };
// };

export const getProfileInitialState = (): ProfileState => {
  return {
    name: 'Shafiqul Islam',
    email: 'shafiksoweb@gmail.com',
  };
};

// export const getWithdrawalInitialState = (): WithdrawalState[] => {
//   return [];
// };
