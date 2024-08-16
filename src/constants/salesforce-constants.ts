export const SalesforceConstants = {
    GET_TOKEN_URL:'services/oauth2/token',

    UPDATE_APPLICATION_STATUS: 'services/data/v52.0/sobjects/Contact/',

    GET_APPLICATION_STATUS: `services/data/v52.0/query?q=SELECT+Id,Intake_Form_Status__C+FROM+Contact+WHERE+Email='email'`,


}