const NODE_ENV_STR = {
    performance: 'performance',
    wiremock: 'wiremock',
    development: 'development',
    production: 'production'
  };
  
  function isEnv(nodeEnv){
    return process.env.NODE_ENV === nodeEnv;
  }
  
  function isPerformanceEnvironment(){
    return isEnv(NODE_ENV_STR.performance);
  }
  
  function isTestingEnv(){
    return process.env.JEST_WORKER_ID !== undefined;
  }
  
  module.exports = {
    NODE_ENV_STR: NODE_ENV_STR,
    isPerformanceEnvironment: isPerformanceEnvironment,
    isTestingEnv: isTestingEnv,
  };