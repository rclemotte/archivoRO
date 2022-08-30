import OracleDB from "oracledb";
import config from "./../config";

const connection = OracleDB.getConnection({        
    user: config.user,
    password: config.password,
    connectionString: config.host    
});

const getConnection = () => {
    return connection;
};

module.exports = {
    getConnection
};
