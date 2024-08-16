
export class Response {
    public static successResponse(statusCode: number, body?: any) {
        return {
            headers: this.getHeaders(),
            statusCode,
            body: body ? JSON.stringify(body) : undefined,
        };
    }

    public static errorResponse(error: any, awsRequestId: string) {
        return {
            statusCode: error.statusCode || 500,
            headers: this.getHeaders(),
            body: JSON.stringify({
                errors: [{
                    id:  awsRequestId,
                    status: error.statusCode || 500,
                    code:  error.code,
                    detail: error.detail
                  }]
            })
        }
    }

    private static getHeaders() {
        return {
            'Access-Control-Allow-Origin': '*'
        }
    }
}