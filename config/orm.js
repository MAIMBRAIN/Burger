// Import MySQL connection
const connection = require("./connection");

function printQuestionMarks(num)
{
    let arr = [];
    
    for (let i = 0; i < num; i++)
    {
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(ob)
{
    let arr = [];

    for (let key in ob)
    {
        let value = ob[key];

        if (Object.hasOwnProperty.call(ob, key))
        {
            if (typeof value === "string" && value.indexOf(" ") >= 0)
            {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
}

const orm = 
{
    selectAll: function(tableInput, cb)
    {
        const queryString = `SELECT * FROM ${tableInput};`;

        connection.query(queryString, function(err, result)
        {
            if (err) {throw err;}
            cb(result);
        });
    },
    insertOne: function(table, cols, vals, cb)
    {
        const queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)};)`;

        connection.query(queryString, vals, function(err, result)
        {
            if (err) {throw err;}
            cb(result);
        });
    },
    updateOne: function(table, objColVals, condition, cb)
    {
        let queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition};`;

        connection.query(queryString, function(err, result)
        {
            if (err) {throw err;}
            cb(result);
        });
    }
};

module.exports = orm;