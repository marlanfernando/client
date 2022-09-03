import { Job, Company } from './db.js'

export const resolvers = {
    Query: {
        job : async (_root, {id}) => Job.findById(id),
        jobs : async () => Job.findAll() ,
    },

    Job : {
        company : (job) => {
            return Company.findById(job.companyId);
        }
    }
};
