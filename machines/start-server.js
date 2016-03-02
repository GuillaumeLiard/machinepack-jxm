



module.exports = {


  friendlyName: 'Start server',


  description: 'Machine used to start an instance of a jxm server',


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
        description: 'The base url path of our service. If none is provided, inferred from serviceName',
        required: false
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
      var _ = require('lodash');
      var baseUrlPath = null;

      if (_.isUndefined(inputs.baseUrlPath)){
          baseUrlPath = '/'.concat(inputs.serviceName);
      } else {
          baseUrlPath = inputs.baseUrlPath;
      }


      server.setApplication(inputs.serviceName, baseUrlPath, "NUBISA-STANDARD-KEY-CHANGE-THIS");

      server.addJSMethod("serverMethod", function (env, params) {
          console.log('received :'.concat(params));
         server.sendCallBack(env, 'Simon Says : '.concat(params));
      });
      server.start();

    return exits.success('server started!');
  },



};
