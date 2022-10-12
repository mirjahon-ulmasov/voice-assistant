import React, { useState } from "react";
import SpeechRecognition from "react-speech-recognition";

function StartButton() {
	const [listen, setListen] = useState(false);

	const clickHandler = () => {
		if (listen === false) {
			SpeechRecognition.startListening({ continuous: true });
			setListen(true);
		} else {
			SpeechRecognition.abortListening();
			setListen(false);
		}
	};

	return (
		<button
			className={`button ${listen ? "on" : "off"}`}
			onClick={clickHandler}
		/>
	);
}

export default StartButton;
