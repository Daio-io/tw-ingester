
module.exports = {

    dev: {
        connectionString: 'mongodb://localhost/tw',

        options: {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    },

    prod: {
        connectionString: process.env.DB_CONNECTION,

        options: {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    }

};
