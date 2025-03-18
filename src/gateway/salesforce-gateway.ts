import { SalesforceConstants } from "../constants/salesforce-constants";
import { Request } from "../helpers/request";
import { ssmAttributes } from "../services/ssm-service";
export class SalesforceGateway {




  public async getRecord(url: string): Promise<any> {
    try {
        const method = 'GET';
        const headers = {
            'Authorization': `Bearer ${ssmAttributes['/triec/lambda/salesforce-token']}`,
        };
        url = `${ssmAttributes['/triec/lambda/salesforce/host']}${url}`;
        const response = await Request.invoke(url, method, headers, null);
        return JSON.parse(response)?.records?.[0];
    } catch (error) {
        console.log('Error getting record', error);
        throw error;
    }
    
  }

  public async updateRecord(payload: string, id: String): Promise<void> {
    try {
        const url = `${ssmAttributes['/triec/lambda/salesforce/host']}${SalesforceConstants.UPDATE_APPLICATION_STATUS}${id}`;
        const method = 'PATCH';
        const headers = {
            'Authorization': `Bearer ${ssmAttributes['/triec/lambda/salesforce-token']}`,
            'Content-Type': 'application/json',
        };

        await Request.invoke(url, method, headers, payload);
    } catch (error) {
        console.log('Error updating record', error);
        throw error;
    }
  }



  
}