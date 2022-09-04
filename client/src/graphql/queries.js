import {request, gql} from 'graphql-request'
import { getAccessToken } from '../auth.js'

const GRAPHQL_URL = "http://localhost:9000/graphql"

export async function createJob(input) {
    console.log(JSON.stringify(input));
    const query = gql`
        mutation CreateJob($input : createJobInput!) {
          job : createJob(input : $input) {
            id
            title
            company {
              id
              name
            }
          }
        }

    `;
    const headers = {'Authorization' : 'Bearer ' + getAccessToken() };
    const variable = {input};
    const { job } = await request( GRAPHQL_URL, query, variable, headers);
    return job;
}

export async function getJobs() {
    const query = gql`
        query {
            jobs {
                id
                title
                description
                company {
                    name
                }
            }
        }
    `;
    const { jobs } = await request( GRAPHQL_URL, query);
    return jobs;
}

export async function getJob(id) {
    const query = gql`
        query JobQuery ($id : ID!){
            job (id : $id) {
                id,
                title
                company {
                    id
                    name
                }
                description
            }
        }
    `;
    const variable = {id};
    console.log("q before : " +id)
    const { job } = await request( GRAPHQL_URL, query, variable);
    console.log("job from q : " + job);
    return job;
}

export async function getCompany(id) {
    const query = gql`
        query CompanyQuery ($id : ID!){
            company(id : $id) {
                id,
                name,
                description,
                jobs {
                    id,
                    description,
                    title,
                    company {
                        id,
                        name,
                    }
                },
            }
        }
    `;
    const variable = {id};
    console.log("q before : " +id)
    const { company } = await request( GRAPHQL_URL, query, variable);
    console.log("company from q : " + JSON.stringify(company));
    return company;
}

