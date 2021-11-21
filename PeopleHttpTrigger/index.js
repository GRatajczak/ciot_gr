const PeopleDbContext = require('../DataAccess/db-context');
const common = require('./../common');


module.exports = async function (context, req) {
    await common.functionWrapper(context, req, async (body) => {
        const connectionString = process.env['PeopleDb'];
        const peopleDb = new PeopleDbContext(connectionString, context.log);
        if(req.method === 'GET'){

            body.people = await peopleDb.getPeople();

        }else if(req.method === 'POST'){
            context.log(req);

            body.people = await peopleDb.addPerson(req.body.newperson);
            
        }
    });
};