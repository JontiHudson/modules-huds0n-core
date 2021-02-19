import { Keyboard } from 'react-native';

import { SharedState } from '@huds0n/shared-state';

import { CONSTANTS } from './constants';

export namespace Core {
  export type InputColors = {
    backgroundColor: string;
    contentsColor: string;
    keyboardColor: string;
  };

  export type InputState =
    | 'CHANGING'
    | 'CLOSED'
    | 'CLOSING'
    | 'OPEN'
    | 'OPENING';
  export type NodeType = 'KEYBOARD' | 'CUSTOM' | null;
  export type FocusedNode = { id: number; type: NodeType };

  export type State = {
    customInputState: InputState;
    darkMode: boolean;
    focusedNode: null | FocusedNode;
    isConnected: boolean;
  };
}

class CoreClass extends SharedState<Core.State> {
  colors = CONSTANTS.colors;
  spacings = CONSTANTS.spacings;
  fontSizes = CONSTANTS.fontSizes;
  dimensions = CONSTANTS.dimensions;

  constructor() {
    super({
      customInputState: 'CLOSED',
      darkMode: false,
      focusedNode: null,
      isConnected: true,
    });
  }

  dismissInput() {
    Keyboard.dismiss();
  }

  getInputColors(): Core.InputColors {
    const { darkMode } = this.state;
    const { BLACK, KEYBOARD, KEYBOARD_DARK, WHITE } = CONSTANTS.colors;

    return {
      backgroundColor: darkMode ? BLACK : WHITE,
      contentsColor: darkMode ? WHITE : BLACK,
      keyboardColor: darkMode ? KEYBOARD_DARK : KEYBOARD,
    };
  }

  setDarkMode(darkMode: boolean) {
    this.setState({ darkMode });
  }
}

export const Core = new CoreClass();
