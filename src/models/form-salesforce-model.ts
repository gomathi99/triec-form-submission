import { FormModel } from "./form-model";

export class FormSalesforceModel {
    Intake_Form_Status__C: string;
    TRIEC_e_newsletter__c: string;
   // Consent_TRIEC_Communications__c: string;
    


    constructor(formModel: FormModel) {
        this.TRIEC_e_newsletter__c = formModel.newsletter;
        this.Intake_Form_Status__C = 'Submitted';
        //this.Consent_TRIEC_Communications__c = formModel.consent;
         
    }
}
