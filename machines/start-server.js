



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
        friendlyName: 'Server Started',
        description: 'Server successfully started',
        example: 'ok!',
    },

  },


  fn: function(inputs, exits
    /**/
  ) {

      var server = require('jxm');
      server.setApplication(inputs.serviceName, inputs.baseUrlPath, "NUBISA-STANDARD-KEY-CHANGE-THIS");
      
      server.addJSMethod("serverMethod", function (env, params) {
          console.log("demande du client :");
          console.log(params+ " World!" );
         server.sendCallBack(env, params + " World!");
      });
      server.start();

    return exits.success('server started!');
  },



};
