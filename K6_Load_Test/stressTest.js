import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        { duration: '1m', target: 50},
        { duration: '1m', target: 100},
        { duration: '1m', target: 200},
        { duration: '1m', target: 0},
    ],

    // thresholds: {
    //     http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    //     http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    // },    
}

const API_ENDPOINT = 'https://localhost:7068/api/Customer'

export default () => {
    http.batch([
        ['GET', `${API_ENDPOINT}`],
        ['GET', `${API_ENDPOINT}/count`],
    ])
    sleep(1);
}