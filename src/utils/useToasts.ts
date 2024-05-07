import {useToast} from 'react-native-toast-notifications';
import {Platform, Text, View} from 'react-native';

export enum Mode {
  light = 'light',
  dark = 'dark',
}

export const useToasts = (mode?: Mode) => {
  const toaster = useToast();
  const toast = {
    success: (message: string) => {
      toaster.show(message, {
        duration: 3000,
        type: 'custom',
        placement: 'top',
        textStyle: {
          color: mode === Mode.dark ? 'white' : 'black',
          fontWeight: '500',
        },
        style: {
          backgroundColor: mode === Mode.dark ? 'black' : 'white',
          borderLeftWidth: 10,
          borderLeftColor: 'green',
          borderRadius: 7,
          minHeight: 30,
          width: 520,
          height: 'auto',
          top: Platform.OS === 'android' ? 30 : 50,
        },
      });
    },
    error: (message: string) => {
      toaster.show(message, {
        duration: 4000,
        type: 'custom',
        placement: 'top',
        textStyle: {
          color: mode === Mode.dark ? 'white' : 'black',
          fontWeight: '500',
        },
        style: {
          backgroundColor: mode === Mode.dark ? 'black' : 'white',
          borderLeftWidth: 10,
          borderLeftColor: 'red',
          borderRadius: 7,
          minHeight: 30,
          width: 520,
          height: 'auto',
          top: Platform.OS === 'android' ? 30 : 50,
        },
      });
    },
    loading: (message: string) => {
      toaster.show(message, {
        duration: 1000,
        type: 'custom',
        placement: 'top',
        textStyle: {
          color: mode === Mode.dark ? 'white' : 'black',
          fontWeight: '500',
        },
        style: {
          backgroundColor: mode === Mode.dark ? 'black' : 'white',
          borderLeftWidth: 10,
          borderLeftColor: 'gray',
          borderRadius: 7,
          minHeight: 30,
          width: 520,
          height: 'auto',
          top: Platform.OS === 'android' ? 30 : 50,
        },
      });
    },
    dismiss: () => {
      toaster.hideAll();
    },
  };
  return toast;
};
