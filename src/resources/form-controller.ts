import { APIGatewayEvent, Context } from "aws-lambda";
import { Response } from "../helpers/response";
import { Validator } from "../helpers/validator";
import { FormService } from "../services/form-service";
import { SSMService } from "../services/ssm-service";

export class FormController {
    private ssmService: SSMService;
    private formService: FormService;

    constructor(ssmService: SSMService,
        fomService: FormService) {
        this.formService = fomService;
        this.ssmService = ssmService;
     }

    public submitForm = async (event: APIGatewayEvent, context: Context) => {

        try {
            await this.ssmService.fetchSSMParameters();
            const requestBody = Validator.validateRequest(JSON.parse(event.body));
            await this.formService.updateApplicationStatus(event.requestContext.authorizer.emailaddress, requestBody);
            return Response.successResponse(204);
        } catch (error) {
            console.log("Error while submitting form:", error);
            return Response.errorResponse(error, context.awsRequestId);
            
        }
   
    
    }


}
