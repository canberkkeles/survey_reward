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
        uint256 reward;
        uint256 balance;
        string description;
        mapping(uint256 => Question) questions;
        mapping(address => uint256) lastLeft;
    }

    event SurveyCreation(
        string title,
        address payable conductor,
        uint256 questionCount,
        bool open,
        uint256 reward,
        uint256 balance,
        string description
    );

    struct Question {
        bytes32 text;
        uint256 answerCount;
        mapping(uint256 => Answer) answers;
    }

    struct Answer {
        address payable participant;
        bytes32 text;
    }    

    event QuestionAdditionToSurvey(
        bytes32 text,
        uint256 answerCount,
        uint256 surveyid,
        uint256 questionCount
    );

    event QuestionAnswered(
        uint256 surveyid,
        bool open,
        uint256 questionid,
        address participant,
        bytes32 answer
    );

    event CloseSurvey(
        uint256 surveyid,
        bool open
    );

    constructor() public {
        name = "Survey Rewarding System";
    }

    modifier surveyAvailable(uint256 _surveyid){
        require(_surveyid < surveyCount, "Survey should exist");
        require(surveys[_surveyid].open == true,"Survey is closed");
        _;        
    }

    modifier questionAvailable(uint256 _surveyid, uint256 _questionid){
        require(_surveyid < surveyCount, "Survey should exist");
        require(_questionid < surveys[_surveyid].questionCount,"Question should exist in survey");
        _;
    }
    
    modifier questionAnswarable(uint256 _surveyid, uint256 _questionid){
        require(_surveyid < surveyCount, "Survey should exist");
        require(surveys[_surveyid].open == true,"Survey is closed");
        require(_questionid < surveys[_surveyid].questionCount,"Question should exist in survey");
        require(surveys[_surveyid].conductor != msg.sender,"Only participants can use this functionality");
        _;
    }

    modifier conductorOnly(uint256 _surveyid){
        require(surveys[_surveyid].conductor == msg.sender,"Only conductor can use this functionality");
        _;
    }

    modifier participantOnly(uint256 _surveyid){
        require(surveys[_surveyid].conductor != msg.sender,"Only participants can use this functionality");
        _;
    }

    modifier checkpointSatisfies(uint256 _surveyid,uint256 _questionid){
        Survey storage _survey = surveys[_surveyid];
        require(_survey.lastLeft[msg.sender] == _questionid,"Can only answer from last question answered");
        _;
    }

    // CREATES A SURVEY WITH GIVEN TITLE AND REWARD PARAMS
    // QUESTION 0 IS A CONSTANT CAPTCHA WHICH MUST BE TYPED BY THE PARTICIPANT
    // TO PREVENT BOT ATTACKS
    function createSurvey(string memory _title,uint256 _reward,
    string memory _description,bytes32[] memory questions) 
    public payable {

        require(bytes(_title).length != 0, "Survey title can not be empty");
        require(bytes(_description).length != 0, "Survey title can not be empty");
        require(msg.value >= _reward,"Survey must be completable by at least one participant");
        require(questions.length > 0 ,"One question should be present in the survey");

        surveys[surveyCount] = Survey(_title, msg.sender, 0, true,_reward,msg.value,_description);
        Survey storage _survey = surveys[surveyCount];
        _survey.questions[0] = Question("I am not using a bot",0);
        _survey.questionCount++;

        for(uint i = 0; i < questions.length ; i++){
            _survey.questions[_survey.questionCount] = Question(questions[i], 0);
            _survey.questionCount++;
        }

        surveys[surveyCount] = _survey;
        surveyCount++;
        
        emit SurveyCreation(_survey.title, msg.sender, _survey.questionCount , true,_survey.reward,_survey.balance,_survey.description);
    }

    // CLOSES THE SURVEY
    // REQUIRED: SURVEY SHOULD EXIST
    function closeSurvey(uint256 _surveyid) public 
    surveyAvailable(_surveyid)
    conductorOnly(_surveyid){
        Survey storage _survey = surveys[_surveyid];
        _survey.open = false;
        surveys[_surveyid] = _survey;
        emit CloseSurvey(_surveyid, _survey.open);
    }

    // GETS QUESTION TEXT FROM SURVEY
    // REQUIRED: SURVEY AND QUESTION SHOULD EXIST
    function getQuestionFromSurvey(uint256 _surveyid, uint256 _questionid) public view 
    questionAvailable(_surveyid,_questionid)
    checkpointSatisfies(_surveyid,_questionid)
    returns(bytes32){
        Survey storage _survey = surveys[_surveyid];
        return _survey.questions[_questionid].text;
    }

    // GETS ALL THE ANSWERS TO GIVEN QUESTION
    // REQUIRED: QUESTION SHOULD EXIST AND SENDER MUST BE CONDUCTOR
    function getAnswers(uint256 _surveyid, uint256 _questionid) public view 
    questionAvailable(_surveyid,_questionid)
    conductorOnly(_surveyid) returns(bytes32[] memory) {
        Question storage _question = surveys[_surveyid].questions[_questionid];
        uint256 _answerCount = _question.answerCount;
        bytes32[] memory _answers = new bytes32[](_answerCount);
        for(uint i = 0 ; i < _answerCount ; i++){
            _answers[i] = _question.answers[i].text;
        }
        return _answers;
    }

    // ANSWERS GIVEN QUESTION FROM GIVEN SURVEY
    // REQUIRED: QUESTION AND SURVEY MUST EXIST, SURVEY MUST BE OPEN AND 
    // QUESTION ID SHOULD BE EQUAL TO CHECKPOINT OF PARTICIPANT
    // MESSAGE SENDER SHOULD NOT BE THE CONDUCTOR
    function answerQuestion(uint256 _surveyid, uint256 _questionid, bytes32 _answer) public payable
    questionAnswarable(_surveyid,_questionid)
    checkpointSatisfies(_surveyid,_questionid){

        Survey storage _survey = surveys[_surveyid];
        require(_survey.balance >= _survey.reward,"This survey has no more rewards left");
        Question storage _question = _survey.questions[_questionid];

        if(_questionid == 0){ // QUESTION IS CAPTCHA
            require(_answer == _question.text,"Captcha is not correct");
            require(msg.value == 200,"Provide initial price");
        }

        else if(_questionid == _survey.questionCount-1){ // QUESTION IS LAST
            msg.sender.transfer(_survey.reward);
            _survey.balance = _survey.balance - _survey.reward;
            if(_survey.balance <= 0 ) _survey.open = false;
        }

        // SAVE THE ANSWER
        _question.answers[_question.answerCount] = Answer(msg.sender,_answer);
        _question.answerCount++;
        _survey.questions[_questionid] = _question;
        _survey.lastLeft[msg.sender] += 1;
        surveys[_surveyid] = _survey;

        emit QuestionAnswered(_surveyid, _survey.open,_questionid, 
        _survey.questions[_questionid].answers[_question.answerCount - 1].participant, 
        _survey.questions[_questionid].answers[_question.answerCount - 1].text);
    }

    function getCheckpoint(uint256 _surveyid) public view
    surveyAvailable(_surveyid)
    returns(uint256){
        return surveys[_surveyid].lastLeft[msg.sender];
    }
}
