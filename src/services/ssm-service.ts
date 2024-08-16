import { SSMClient, GetParametersCommand } from "@aws-sdk/client-ssm";
import { SSM_CONSTANTS } from "../constants/ssm-constants";

export let ssmAttributes = {};
export class SSMService {

    public async fetchSSMParameters() {
        const ssmClient = new SSMClient({ 
            region: process.env.AWS_REGION,
            endpoint: "https://vpce-0643a7905d80772cd-srhoz64l.ssm.ca-central-1.vpce.amazonaws.com"
        });

        const command = new GetParametersCommand({
            Names: SSM_CONSTANTS,
            WithDecryption: true,
        });

        try {
            const response = await ssmClient.send(command);
            ssmAttributes = response.Parameters.reduce((acc, param) => {
                acc[param.Name] = param.Value;
                return acc;
            }, {});
        } catch (error) {
            console.log("Error retrieving client credentials from SSM:", error);
            throw error;
        }
    }
}

export function getSSMAttributes() {
    return this.ssmAttributes;
}