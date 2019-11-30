export interface ErrorList {
    [errorKey: string]: {
        code: number;
        message: string;
    }
}

export const ErrorList: ErrorList = {
    'ERR': {
        code: 500,
        message: 'Yikes, something went wrong',
    },
    'ERR_FORBIDDEN': {
        code: 403,
        message: 'You are forbidden from accessing this resource'
    },
    'ERR_POST_NOT_FOUND': {
        code: 404,
        message: 'Post was not found',
    }
};