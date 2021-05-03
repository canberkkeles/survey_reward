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
        mapping(uint256 => Question) questions;
        mapping(address => uint256) lastLeft;
    }

    event SurveyCreation(
        string title,
        address payable conductor,
        uint256 questionCount,
        bool open,
        uint256 reward
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
        uint256 questionid,
        address participant,
        bytes32 answer
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
    function createSurvey(string memory _title,uint256 _reward) public {
        require(bytes(_title).length != 0, "Survey title can not be empty");
        surveys[surveyCount] = Survey(_title, msg.sender, 0, true,_reward);
        Survey storage _survey = surveys[surveyCount];
        _survey.questions[0] = Question("I am not using a bot",0);
        _survey.questionCount++;
        surveys[surveyCount] = _survey;
        surveyCount++;
        emit SurveyCreation(_title, msg.sender, 1, true,_reward);
    }

    // CREATES A QUESTION TO SURVEY WITH GIVEN ID
    function createQuestion(bytes32 _text, uint256 _surveyid) private
    {
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

    // ADDS QUESTIONS FROM QUESTIONS ARRAY INTO GIVEN SURVEY
    // REQUIRED: SURVEY MUST EXIST AND SENDER MUST BE CONDUCTOR
    function appendQuestions(bytes32[] memory questions, uint256 _surveyid) surveyAvailable(_surveyid) conductorOnly(_surveyid) public{
        for(uint i = 0; i < questions.length ; i++){
            createQuestion(questions[i], _surveyid);
        }
    }

    // GETS QUESTION TEXT FROM SURVEY
    // REQUIRED: SURVEY AND QUESTIN SHOULD EXIST
    function getQuestionFromSurvey(uint256 _surveyid, uint256 _questionid) public view 
    questionAvailable(_surveyid,_questionid)
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
        Question storage _question = _survey.questions[_questionid];

        if(_questionid == 0){ // QUESTION IS CAPTCHA
            require(_answer == _question.text,"Captcha is not correct");
            require(msg.value == 200,"Provide initial price");
        }

        else if(_questionid == _survey.questionCount-1){ // QUESTION IS LAST
            msg.sender.transfer(_survey.reward);
        }

        // SAVE THE ANSWER
        _question.answers[_question.answerCount] = Answer(msg.sender,_answer);
        _question.answerCount++;
        _survey.questions[_questionid] = _question;
        _survey.lastLeft[msg.sender] += 1;
        surveys[_surveyid] = _survey;

        emit QuestionAnswered(_surveyid, _questionid, 
        _survey.questions[_questionid].answers[_question.answerCount - 1].participant, 
        _survey.questions[_questionid].answers[_question.answerCount - 1].text);
    }

}
