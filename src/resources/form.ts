import { Handler } from "aws-lambda";
import { SalesforceGateway } from "../gateway/salesforce-gateway";
import { FormService } from "../services/form-service";
import { SSMService } from "../services/ssm-service";
import { FormController } from "./form-controller";

const ssmService: SSMService = new SSMService();
const salesforceGateway = new SalesforceGateway();
const formService = new FormService(salesforceGateway);

export const submitForm:Handler = new FormController(ssmService, formService).submitForm;