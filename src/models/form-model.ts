export class FormModel {
    consent: string;
    newsletter: string;
    applicationStatus: string;
    
    constructor(response: any) {

        this.consent = response.consent;
        this.newsletter = response.newsletter;
        this.applicationStatus = response.Intake_Form_Status__C;
        
        
    }
}
