import uuid from 'uuid/v4';

export const createUser = () => {
  return {
    id: uuid(),
  };
};
