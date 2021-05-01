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

    struct Answer {
        address payable participant;
        string text;
    }    

    event QuestionAdditionToSurvey(
        string text,
        uint256 answerCount,
        uint256 surveyid,
        uint256 questionCount
    );

    event QuestionAnswered(
        uint256 surveyid,
        uint256 questionid,
        address participant,
        string answer
    );

    constructor() public {
        name = "Survey Rewarding System";
    }

    modifier surveyExists(uint256 _surveyid){
        require(_surveyid < surveyCount, "Survey should exist");
        _;        
    }

    modifier questionExists(uint256 _surveyid, uint256 _questionid){
        Survey storage _survey = surveys[_surveyid];
        require(_questionid < _survey.questionCount,"Question should exist in survey");
        _;
    }

    modifier conductorOnly(uint256 _surveyid){
        Survey storage _survey = surveys[_surveyid];
        require(_survey.conductor == msg.sender,"Only conductor can use this functionality!");
        _;
    }

    modifier participantOnly(uint256 _surveyid){
        Survey storage _survey = surveys[_surveyid];
        require(_survey.conductor != msg.sender,"Only participants can use this functionality");
        _;
    }

    function createSurvey(string memory _title) public {
        require(bytes(_title).length != 0, "Survey title can not be empty");

        surveys[surveyCount] = Survey(_title, msg.sender, 0, true);
        surveyCount++;
        emit SurveyCreation(_title, msg.sender, 0, true);
    }

    function createQuestionToSurvey(string memory _text, uint256 _surveyid) surveyExists(_surveyid) conductorOnly(_surveyid)
        public
    {
        require(bytes(_text).length != 0, "Question text can not be empty");
        Survey storage _survey = surveys[_surveyid];
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

    function getQuestionFromSurvey(uint256 _surveyid, uint256 _questionid) public view 
    surveyExists(_surveyid) 
    questionExists(_surveyid,_questionid) 
    returns(string memory){
        Survey storage _survey = surveys[_surveyid];
        return _survey.questions[_questionid].text;
    }

    // function getAnswers(uint256 _surveyid, uint256 _questionid) public view surveyAndQuestionExists(_surveyid,_questionid) returns(bytes32) {
    //     Survey storage _survey = surveys[_surveyid];
    //     require(_survey.conductor == msg.sender,"Only conductor can use this functionality!");
    //     Question storage _question = _survey.questions[_questionid];
    //     uint256 _answerCount = _question.answerCount;
    //     bytes32[] memory _answers = new bytes32[];
    //     for(uint i = 0 ; i > _answerCount ; i++){
    //         _answers.push(_question.answers[i].text);
    //     }
    //     return _answers;
    // }

    function answerQuestion(uint256 _surveyid, uint256 _questionid, string memory _answer) public 
    surveyExists(_surveyid) 
    questionExists(_surveyid,_questionid) 
    participantOnly(_surveyid){

        Survey storage _survey = surveys[_surveyid];
        Question storage _question = _survey.questions[_questionid];
        _question.answers[_question.answerCount] = Answer(msg.sender,_answer);
        _question.answerCount++;
        _survey.questions[_questionid] = _question;

        emit QuestionAnswered(_surveyid, _questionid, 
        _survey.questions[_questionid].answers[_question.answerCount - 1].participant, 
        _survey.questions[_questionid].answers[_question.answerCount - 1].text);
    }
}
