import {ErrorMessageArrayToString} from '@helpers/ErrorFormatter';
import {danger_config, success_config} from '@utils';
import {showMessage} from 'react-native-flash-message';

const flash: any = {
  success: ({description}) => {
    return showMessage({...success_config, description});
  },
  danger: ({description}) => {
    if (typeof description === 'string') {
      return showMessage({...danger_config, description});
    }

    if (Array.isArray(description)) {
      return showMessage({
        ...danger_config,
        description: ErrorMessageArrayToString({message: description}),
      });
    }
  },
};

export {flash};
