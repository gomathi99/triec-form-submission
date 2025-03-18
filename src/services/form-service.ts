import { FormModel } from "../models/form-model";
import { APPLICATION_CONSTANTS } from "../constants/application-constants";
import { SalesforceConstants } from "../constants/salesforce-constants";
import { SalesforceGateway } from "../gateway/salesforce-gateway";
import { ERROR_CONSTANTS } from "../helpers/error";
import { FormSalesforceModel } from "../models/form-salesforce-model";

export class FormService {
    private salesforceGateway: SalesforceGateway;

    constructor(salesforceGateway: SalesforceGateway) {
        this.salesforceGateway = salesforceGateway;
    }
    
    

    public async updateApplicationStatus(emailId: string, userType: string, formModel: FormModel): Promise<void> {
        try {
            userType = APPLICATION_CONSTANTS.USER_TYPE_MAPPING[userType];
            const url = SalesforceConstants.GET_APPLICATION_STATUS.replace('email', emailId).replace('userType', userType);
            const response = await this.salesforceGateway.getRecord(url);
            console.log('Response:', response);
            if(response) {
                const payload = JSON.stringify({
                    ...new FormSalesforceModel(formModel)
            });
            await this.salesforceGateway.updateRecord(payload, response.Id);
            } else {
                throw ERROR_CONSTANTS.FORMx43();
            }
            
        } catch (error) {
            console.log('Error while updating ApplicationStatus', error);
            throw error;
        }
    }
    
    
}
