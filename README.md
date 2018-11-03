# Sydney Competitive Programming 22 September 2018 - Practical Challenge

## The Question

__Solution API__

Build an API where code solutions can be POSTed to and users can GET the solutions at a unique URL.

Note that the solution does not have to execute the code.

## My Solution



## Prerequisites

1. Install node.js LTS
2. Install the Serverless CLI ```npm install -g serverless```
3. Sign up for an AWS account or use an existing one and setup your credentials for use with the Serverless CLI

## Build (cloud)

```bash
// deploy the service to AWS
> sls deploy

// get the service details
> sls info

Service Information
service: my-express-application
stage: dev
region: ap-southeast-2
stack: my-express-application-dev
api keys:
  None
endpoints:
  ANY - https://8wt0ybzuf7.execute-api.ap-southeast-2.amazonaws.com/dev
  ANY - https://8wt0ybzuf7.execute-api.ap-southeast-2.amazonaws.com/dev/{proxy+}
functions:
  app: my-express-application-dev-app
```

## Test (cloud)

```bash
// set service path as environmental var
export BASE_DOMAIN=https://8wt0ybzuf7.execute-api.ap-southeast-2.amazonaws.com/dev

// create a user
curl -H "Content-Type: application/json" -X POST ${BASE_DOMAIN}/users -d '{"userId": "alexdebrie1", "name": "Alex DeBrie"}'

// fetch created user
curl -H "Content-Type: application/json" -X GET ${BASE_DOMAIN}/users/alexdebrie1
```

## Test locally

```bash
// install DynamoDB local
sls dynamodb install

// start the serverless-offline local
sls offline start
```