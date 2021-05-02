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
      result = await surveyReward.createSurvey("Research on blockchain", {
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
        0,
        "Question count is correct"
      );
      assert.equal(event.conductor, conductor, "Survey conductor is correct");
      assert.equal(event.open, true, "Survey status is correct");

      // NEGATIVE CASE
      await surveyReward.createSurvey("", {
        from: conductor,
      }).should.be.rejected;
    });

    it("gets surveys", async () => {
      // POSITIVE CASE
      const survey = await surveyReward.surveys(0);
      assert.equal(survey.title, "Research on blockchain", "Title is correct");
      assert.equal(
        survey.questionCount.toNumber(),
        0,
        "Question count is correct"
      );
      assert.equal(survey.conductor, conductor, "Conductor is correct");
      assert.equal(survey.open, true, "Status is correct");
    });

    it("appends questions to survey", async () => {
      // POSITIVE CASE
      result = await surveyReward.appendQuestions(
        [web3.utils.asciiToHex("Question on blockchain")],
        0
      );
      const event = result.logs[0].args;
      assert.equal(
        web3.utils.hexToAscii(event.text).replace(/\0/g, ""),
        "Question on blockchain"
      );
      assert.equal(
        event.answerCount.toNumber(),
        0,
        "Answer count of question is correct"
      );
      assert.equal(event.surveyid.toNumber(), 0, "Survey id is correct");
      assert.equal(
        event.questionCount.toNumber(),
        1,
        "Question count is correct"
      );
      // NEGATIVE CASES
      await surveyReward.appendQuestions(
        [web3.utils.asciiToHex("Valid question")],
        -1
      ).should.be.rejected;
      await surveyReward.appendQuestions(
        [web3.utils.asciiToHex("Valid question")],
        0,
        {
          from: participant,
        }
      ).should.be.rejected;
    });

    it("answers questions", async () => {
      result = await surveyReward.answerQuestion(
        0,
        0,
        web3.utils.asciiToHex("An answer on blockchain"),
        { from: participant }
      );
      const event = result.logs[0].args;
      assert.equal(event.surveyid.toNumber(), 0, "Survey id is correct");
      assert.equal(event.questionid.toNumber(), 0, "Question id is correct");
      assert.equal(event.participant, participant, "Participant is correct");
      assert.equal(
        web3.utils.hexToAscii(event.answer).replace(/\0/g, ""),
        "An answer on blockchain",
        "Answer is correct"
      );
      // NEGATIVE TEST CASES
      await surveyReward.answerQuestion(1, 0, "An answer on blockchain", {
        from: participant,
      }).should.be.rejected;

      await surveyReward.answerQuestion(0, 1, "An answer on blockchain", {
        from: participant,
      }).should.be.rejected;

      await surveyReward.answerQuestion(1, 1, "An answer on blockchain", {
        from: participant,
      }).should.be.rejected;

      await surveyReward.answerQuestion(0, 0, "An answer on blockchain", {
        from: conductor,
      }).should.be.rejected;
    });
    it("lists answers for conductor", async () => {
      result = await surveyReward.getAnswers(0, 0);
      assert.equal(result.length, 1, "Answer count is correct");
      assert.equal(
        web3.utils.hexToAscii(result[0]).replace(/\0/g, ""),
        "An answer on blockchain",
        "Answer is correct"
      );

      // NEGATIVE CASES
      await surveyReward.getAnswers(1, 0).should.be.rejected;
      await surveyReward.getAnswers(0, 1).should.be.rejected;
      await surveyReward.getAnswers(1, 1).should.be.rejected;
      await surveyReward.getAnswers(0, 0, { from: participant }).should.be
        .rejected;
    });
  });
});
