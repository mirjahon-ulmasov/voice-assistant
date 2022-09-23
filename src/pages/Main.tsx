import React, { useState } from 'react';
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit';

function Main() {
	const [value, setValue] = useState('');
	const { speak, voices } = useSpeechSynthesis();
	const { listen, listening, stop } = useSpeechRecognition({
		onResult: (result: any) => {
		setValue(result);
		},
	});

	return (
		<div>
		<textarea value={value} onChange={(event) => setValue(event.target.value)}/>
		<button onMouseDown={listen} onMouseUp={stop}>🎤</button>
		<button onClick={() => speak({ text: value, voice: voices[17]})}>Speak</button>
		{listening && <div>Go ahead I'm listening</div>}
		</div>
	);
}
export default Main;