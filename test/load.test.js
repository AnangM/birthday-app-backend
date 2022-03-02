import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
    stages:[
        { duration: '1m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        // { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
        // { duration: '5m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds:{
        'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    }
}

const baseURL = 'http://localhost:3000'

export default()=>{
    const createUserRes = http.post(`${baseURL}/users`,{
        "first_name":"user",
        "last_name":"k6",
        "birth_date":"20-02-2000",
        "location":"Australia/Melbourne"
    })

    check(createUserRes,{
        'User created succesfully' : (resp)=> resp.json('id') !== ''
    })

    sleep(1)
}