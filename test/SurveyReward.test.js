const { assert } = require("chai");

require("chai")
  .use(require("chai-as-promised"))
  .should();
const SurveyReward = artifacts.require("./SurveyReward.sol");

contract("SurveyReward", ([conductor, participant]) => {
  let surveyReward;
  before(async () => {
    surveyReward = await SurveyReward.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await surveyReward.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
    it("constructs properly", async () => {
      const appName = await surveyReward.name();
      const surveyCount = await surveyReward.surveyCount();
      assert.equal(
        appName,
        "Survey Rewarding System",
        "Application name is correct"
      );
      assert.equal(surveyCount, 0, "Initial survey count is 0");
    });
  });

  describe("survey functions", async () => {
    let result;
    let surveyCount;
    before(async () => {
      result = await surveyReward.createSurvey("Research on blockchain", 5, {
        from: conductor,
      });
      surveyCount = await surveyReward.surveyCount();
    });
    it("creates surveys", async () => {
      // POSITIVE CASE
      assert.equal(surveyCount, 1, "Survey count is incremented");
      const event = result.logs[0].args;
      assert.equal(
        event.title,
        "Research on blockchain",
        "Survey title is correct"
      );
      assert.equal(
        event.questionCount.toNumber(),
        5,
        "Question count is correct"
      );
      assert.equal(event.conductor, conductor, "Survey conductor is correct");
      assert.equal(event.open, true, "Survey status is correct");

      // NEGATIVE CASE
      await surveyReward.createSurvey("Invalid survey", -1, {
        from: conductor,
      }).should.be.rejected;
    });

    it("creates questions", async () => {
      // POSITIVE CASE
      result = await surveyReward.createQuestion("Blockchain question");
      const event = result.logs[0].args;
      assert.equal(
        event.text,
        "Blockchain question",
        "Question text is correct"
      );
      assert.equal(event.answerCount.toNumber(), 0, "Question has no answers");
      // NEGATIVE CASE
      await surveyReward.createQuestion("").should.be.rejected;
    });

    it("creates answers", async () => {
      result = await surveyReward.createAnswer("Blockchain answer", {
        from: participant,
      });
      const event = result.logs[0].args;
      assert.equal(event.text, "Blockchain answer", "Answer text is correct");
      assert.equal(event.participant, participant, "Participant is correct");
      // NEGATIVE CASE
      await surveyReward.createAnswer("").should.be.rejected;
    });
  });
});
