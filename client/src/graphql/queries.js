import {request, gql} from 'graphql-request'

const GRAPHQL_URL = "http://localhost:9000/graphql"

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