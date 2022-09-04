import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { getAccessToken } from '../auth.js'

const GRAPHQL_URL = "http://localhost:9000/graphql"

const JOB_DETAILS_FRAGMENT = gql `
    fragment JobDetails on Job {
        id,
        title
        company {
            id
            name
        }
        description
    }
`;

export const JOBS_QUERY = gql`
  query {
      jobs {
          ...JobDetails
      }
  }
  ${JOB_DETAILS_FRAGMENT}
`;

export const JOB_QUERY = gql`
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

 export const COMPANY_QUERY = gql`
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

export const client = new ApolloClient({
    uri : GRAPHQL_URL,
    cache : new InMemoryCache(),
    defaultOptions : { // can set default options here, the below is to have the default fetch policy
        query : {
            fetchPolicy : 'network-only'
        }
    }
});

export async function createJob(input) {
    console.log(JSON.stringify(input));
    const mutation = gql`
        mutation CreateJob($input : createJobInput!) {
          job : createJob(input : $input) {
            ...JobDetails
          }
        }
        ${JOB_DETAILS_FRAGMENT}

    `;
    const variables = {input};

    const context = {
        headers : {'Authorization' : 'Bearer ' + getAccessToken() }
    }

    const { data : {job} } = await client.mutate( {mutation, variables, context});
    return job;
}


