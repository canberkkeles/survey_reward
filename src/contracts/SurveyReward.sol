pragma solidity ^0.5.0;

contract SurveyReward {
    mapping(uint256 => Survey) public surveys;
    uint256 public surveyCount = 0;
    string public name;

    struct Survey {
        string title;
        address payable conductor;
        uint256 questionCount;
        bool open;
        mapping(uint256 => Question) questions;
    }

    event SurveyCreation(
        string title,
        address payable conductor,
        uint256 questionCount,
        bool open
    );

    struct Question {
        string text;
        uint256 answerCount;
        mapping(uint256 => Answer) answers;
    }

    event QuestionAdditionToSurvey(
        string text,
        uint256 answerCount,
        uint256 surveyid,
        uint256 questionCount
    );

    struct Answer {
        address payable participant;
        string text;
    }

    constructor() public {
        name = "Survey Rewarding System";
    }

    function createSurvey(string memory _title) public {
        require(bytes(_title).length != 0, "Survey title can not be empty");

        surveys[surveyCount] = Survey(_title, msg.sender, 0, true);
        surveyCount++;
        emit SurveyCreation(_title, msg.sender, 0, true);
    }

    function createQuestionToSurvey(string memory _text, uint256 _surveyid)
        public
    {
        require(bytes(_text).length != 0, "Question text can not be empty");
        require(_surveyid < surveyCount, "Survey should exist");
        Survey storage _survey = surveys[_surveyid];
        require(
            _survey.conductor == msg.sender,
            "Only survey owner can add questions"
        );
        _survey.questions[_survey.questionCount] = Question(_text, 0);
        _survey.questionCount++;
        surveys[_surveyid] = _survey;
        emit QuestionAdditionToSurvey(
            _text,
            _survey.questions[_survey.questionCount - 1].answerCount,
            _surveyid,
            _survey.questionCount
        );
    }
}
