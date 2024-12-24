import _ from 'lodash';

export const toHandleName = (name: string) => {
    return `@${_.kebabCase(name)}`;
};
