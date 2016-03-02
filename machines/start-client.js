



module.exports = {


    friendlyName: 'Start server',


    description: 'machine used to launch a new instance of a jxm server',


    cacheable: false,


    sync: false,


    inputs: {
        serviceName: {
            example: 'Hello World',
            description: 'The name of our service',
            required: true
        },
        baseUrlPath: {
            example: '/helloworld',
            description: 'The base url path of our service',
            required: true
        },

    },


    exits: {
        error: {
            description: 'Unexpected error occurred.'
        },
        serverCallFailed: {
            description: 'Error while calling server\'s method'
        },

        success: {
            friendlyName: 'Client Started',
            description: 'Client successfully started',
            example: 'ok!',
        },

    },


    fn: function(inputs, exits
        /**/
    ) {
        var server = require('jxm');

        var client = server.createClient(null, inputs.serviceName,
        "NUBISA-STANDARD-KEY-CHANGE-THIS", "0.0.0.0", 8000);

        console.log("client");
        console.log(client);

        client.on('connect', function(client) {
            client.Call("serverMethod", "Hello", function(param, err) {
                if (err) {
                    return exits.serverCallFailed("Error while calling server's method. Code: ", err);

                } else {
                    return exits.success('answer of the server :' + param);
                }
                client.Close();

            });
        });

        client.on('close', function(client) {
            console.log("Client disconnected");
        });

        client.on('error', function(client, err) {
            console.log(client.url);
            return exits.error("Error 1 : "+err);
        });

        client.Connect();


    },



};
