const SurveyReward = artifacts.require("SurveyReward");

module.exports = function(deployer) {
  deployer.deploy(SurveyReward);
};
