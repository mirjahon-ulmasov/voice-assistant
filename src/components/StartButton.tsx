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
		<div className="power-btn">
			<button
				className={listen ? "on" : "off"}
				onClick={clickHandler}
			/>
		</div>
	);
}

export default StartButton;
