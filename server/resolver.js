import { Job, Company } from './db.js'

export const resolvers = {
    Query: {
        job : async (_root, {id}) => Job.findById(id),
        jobs : async () => Job.findAll() ,
        company : async (_root, {id}) => Company.findById(id),
    },

    Mutation: {
        createJob: (_root, {input}, {user}) => {
            if(!user) {
                throw new Error("Unauthorized");
            }
            return Job.create({...input, companyId: user.companyId});
        },
        deleteJob: (_root, {id}) => Job.delete(id),
        updateJob: (_root, {input}, {user}) => {
            if(!user) {
                throw new Error("Unauthorized");
            }

            return Job.update({...input, companyId : user.companyId})
        },
    },

    Company : {
        jobs : (company) => {
            return Job.findAll((job) => job.companyId === company.id);
        }
    },

    Job : {
        company : (job) => {
            return Company.findById(job.companyId);
        }
    }
};
