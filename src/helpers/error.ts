export class ApplicationError extends Error {
    code: string;
    statusCode: number;
    detail: string;

    constructor(message: string, code: string, statusCode: number) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.detail = message;

    }

}

export const ERROR_CONSTANTS = {
    FORMx41: () => { return new ApplicationError('Invalid User Id', 'MENTEEx41', 400) },
    FORMx42: () => { return new ApplicationError('Error while fetching mentee experience details', 'MENTEEEXPx41', 400) },
    FORMx43: () => { return new ApplicationError('Error while updating mentee experience details', 'MENTEEEXPx42', 400) },
    FORMx44: () => { return new ApplicationError('Invalid request body', 'MENTEEEXPx45', 400) },
}