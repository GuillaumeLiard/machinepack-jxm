



module.exports = {


    friendlyName: 'Start client',


    description: 'Machine used to start an instance of a jxm client',


    cacheable: false,


    sync: false,


    inputs: {
        ipServer: {
            example: '0.0.0.0',
            description: 'The IP address of our server',
            required: true
        },
        serviceName: {
            example: 'Hello World',
            description: 'The name of our service',
            required: true
        },
        message: {
            example: 'Clap your hands',
            description: 'The message to send to the server',
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
        "NUBISA-STANDARD-KEY-CHANGE-THIS", inputs.ipServer, 8000);

        client.on('connect', function(client) {
            client.Call("serverMethod", inputs.message, function(param, err) {
                if (err) {
                    client.Close();
                    return exits.serverCallFailed("Error while calling server's method. Code: ", err);

                } else {
                    client.Close();
                    return exits.success(param);
                }
            });
        });

        client.on('close', function(client) {
            console.log("Client disconnected");
        });

        client.on('error', function(client, err) {
            return exits.error("Error 1 : "+err);
        });

        client.Connect();


    },



};
