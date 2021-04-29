pragma solidity ^0.5.0;

contract SurveyReward {
    mapping(uint256 => Survey) public surveys;
    uint256 public surveyCount = 0;
    string public name;

    struct Survey {
        string title;
        address payable conductor;
        int256 questionCount;
        bool open;
        mapping(uint256 => Question) questions;
    }

    event SurveyCreation(
        string title,
        address payable conductor,
        int256 questionCount,
        bool open
    );

    struct Question {
        string text;
        uint256 answerCount;
        mapping(uint256 => Answer) answers;
    }

    event QuestionCreation(string text, uint256 answerCount);

    struct Answer {
        address payable participant;
        string text;
    }

    event AnswerCreate(address payable participant, string text);

    constructor() public {
        name = "Survey Rewarding System";
    }

    function createSurvey(string memory _title, int256 _questioncount) public {
        require(_questioncount > 0, "Survey has to have at least 1 question!");

        surveys[surveyCount] = Survey(_title, msg.sender, _questioncount, true);
        surveyCount++;
        emit SurveyCreation(_title, msg.sender, _questioncount, true);
    }

    function createQuestion(string memory _text) public {
        require(bytes(_text).length != 0, "Question text can not be empty");
        Question memory newQuestion = Question(_text, 0);
        emit QuestionCreation(_text, 0);
    }

    function createAnswer(string memory _text) public {
        require(bytes(_text).length != 0, "Answer text can not be empty");
        Answer memory newAnswer = Answer(msg.sender, _text);
        emit AnswerCreate(msg.sender, _text);
    }
}
