const sql = require('mssql');
const parser = require('mssql-connection-string');

class PeopleDbContext {
    constructor(connectionString, log) {
        log("PeopleDbContext object has been created.");
        this.log = log;
        this.config = parser(connectionString);
        this.getPeople = this.getPeople.bind(this);
    }

    async getPeople() {
        this.log("getPeople function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        const result = await request.query('select * from People');
        this.log("getPeople function - done")
        return result.recordset;
    }

    async removePerson(id){
        this.log("removePerson function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        const result = await request.query('delete from People where PersonId = ' + id);
        this.log("removePerson function - done")
        return result.recordset;
    }

    async getPerson(id){
        this.log("property function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        const result = await request.query('select * from People where PersonId = ' + id);
        this.log("property function - done")
        return result.recordset;
    }

    async addPerson(options){
        this.log("addPerson function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        this.log(options.name);
        this.log(options.surname);
        this.log(options.phone);
        const result = await request.query(`Insert into People values ( '${options.name}', '${options.surname}', '${options.phone}');`);
        this.log("addPerson function - done")
        return result.recordset;
    }
}

module.exports = PeopleDbContext;