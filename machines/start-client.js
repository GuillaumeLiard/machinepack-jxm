



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

        var client = server.createClient(null, "helloworld",
        "NUBISA-STANDARD-KEY-CHANGE-THIS", "localhost", 8000);

        client.on('connect', function(client) {
            console.log("Client connected");
            client.Call("serverMethod", "Hello", function(param, err) {
                if (err) {
                    console.log("Error while calling server's method. Code: ", err);
                } else {
                    console.log("Received callback from the server:", param);
                }
                client.Close();
            });
        });

        client.on('close', function(client) {
            console.log("Client disconnected");
        });

        client.on('error', function(client, err) {
            console.log("Error:", err);
        });

        client.Connect();

        return exits.success('client started!');
    },



};
