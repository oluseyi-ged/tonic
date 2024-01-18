import {MessageOptions} from 'react-native-flash-message';

const success_config: MessageOptions = {
  animated: true,
  type: 'success',
  floating: true,
  hideOnPress: true,
  icon: 'auto',
  description: '',
  message: 'Success',
};
const danger_config: MessageOptions = {
  ...success_config,
  type: 'danger',
  message: 'Error',
};

export {danger_config, success_config};
