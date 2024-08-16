import * as qs from "querystring";
import { SalesforceConstants } from "../constants/salesforce-constants";
import { Request } from "../helpers/request";
import { ssmAttributes } from "../services/ssm-service";
export class SalesforceGateway {



  public async getToken(): Promise<string> {
    try {
        const method = 'POST';
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const config = JSON.parse(ssmAttributes['/triec/lambda/salesforce/config']);
        const body = qs.stringify({
            grant_type: config.grant_type,
            client_id: config.client_id,
            client_secret: config.client_secret
        });
        const url = `${ssmAttributes['/triec/lambda/salesforce/host']}/${SalesforceConstants.GET_TOKEN_URL}`;
        const response  = await Request.invoke(url, method, headers, body);
        return JSON.parse(response)?.access_token;
    } catch (error) {
        console.log('Error while getting token', error);
        throw error;
    }
    
  }

  public async getRecord(url: string): Promise<any> {
    try {
        const method = 'GET';
        const headers = {
            'Authorization': `Bearer ${await this.getToken()}`,
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
            'Authorization': `Bearer ${await this.getToken()}`,
            'Content-Type': 'application/json',
        };

        await Request.invoke(url, method, headers, payload);
    } catch (error) {
        console.log('Error updating record', error);
        throw error;
    }
  }



  
}