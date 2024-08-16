import { APIGatewayEvent } from 'aws-lambda';
import { ERROR_CONSTANTS } from '../helpers/error';
import { FormModel } from '../models/form-model';

export class Validator {

    public static validateRequest(event: APIGatewayEvent): FormModel {
        if(!event.body) {
            throw ERROR_CONSTANTS.FORMx44();
        }
        const requestBody = JSON.parse(event.body);
         const userId = requestBody?.data?.attributes?.['user-id'];
        if(!userId || userId !== event.requestContext.authorizer.userId) {
            throw ERROR_CONSTANTS.FORMx41();
        }
         return {
            consent: requestBody?.data?.attributes?.['consent'],
            newsletter: requestBody?.data?.attributes?.['newsletter'],
            applicationStatus: 'Submitted'

         } as FormModel;


    }
   
}