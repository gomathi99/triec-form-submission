import * as https from 'https';

export class Request {
    public static invoke(url: string, method: string, headers: any, body: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const options = {
                method,
                headers,
            };

            const req = https.request(url, options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    if (!res.statusCode.toString().startsWith('2')){
                        reject({
                            statusCode: res.statusCode,
                            message: data,
                        });
                    } else {
                        resolve(data);
                    }
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            if (body) {
                req.write(body);
            }

            req.end();
        });
    }
}