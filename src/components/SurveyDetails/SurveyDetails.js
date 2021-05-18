import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../UI/Navbar";
import SurveyDetailsHeader from "./SurveyDetailsHeader";
import SurveyDetailsCard from "./SurveyDetailsCard";

const SurveyDetails = (props) => {
    const { id } = useParams();
    const [questionsRemaining, setQuestionsRemaining] = useState(9);
    const surveyTitle = "Emotional Studies";
    const conductor = "0x9818101924771cC285D34029F9E9b7aaA87f9569";

    return(
        <React.Fragment>
            <Navbar appName={props.appName} accountAddress={props.accountAddress}/>
            <p>Ömer de burda</p>
            <SurveyDetailsHeader
                questionsRemaining={questionsRemaining}
                surveyTitle={surveyTitle}
                surveyConductor={conductor}
            />
            <SurveyDetailsCard/>
        </React.Fragment>
    );
};

export default SurveyDetails;
