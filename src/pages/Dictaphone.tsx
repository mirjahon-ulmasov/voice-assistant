import React, { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import moment from "moment";
import "moment/locale/ru";

const Dictaphone = () => {
	const [response, setResponse] = useState("");

	const { speak, cancel, voices } = useSpeechSynthesis();

	// The speak() will get called each time message is changed
	useEffect(() => {
			speak({
				text: response,
				voice: voices[17],
			});
	}, [response]);

	useEffect(() => {
			moment.locale("ru");
	}, []);

	const commands = [
		{
			command: "(Пожалуйста) принеси мне *",
			callback: (drink: string) => {
				resetTranscript();
				setResponse(`Сколько ложек сахара класть в ${drink}?`);
			},
		},

		{
			command: "(Привет) меня зовут :name",
			callback: (name: string) => {
				resetTranscript();
				setResponse(`Привет, ${name}. Красивое имя`);
			},
		},

		{
			command: ["Открой ютуб"],
			callback: () => {
				resetTranscript();
				window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', "_blank");
			},
			isFuzzyMatch: true,
			fuzzyMatchingThreshold: 0.3,
		},

		// DATE AND TIME
		{
			command: ["(Извините) сколько времени (сейчас)", "Какое время"],
			callback: () => {
				resetTranscript();
				setResponse(moment().format("LT"));
			},
			matchInterim: true,
		},
		{
			command: "Какое (сегодня) число",
			callback: () => {
				resetTranscript();
				setResponse(moment().format("LL"));
			},
		},

		// CALCULATIONS
		{
			command: ":num1 + :num2",
			callback: (num1: string, num2: string) => {
				resetTranscript();
				const x = parseInt(num1, 10);
				const y = parseInt(num2, 10);
				setResponse(`Ответ: ${x + y}`);
			},
		},
		{
			command: ":num1 - :num2",
			callback: (num1: string, num2: string) => {
				resetTranscript();
				const x = parseInt(num1, 10);
				const y = parseInt(num2, 10);
				setResponse(`Ответ: ${x - y}`);
			},
		},
		{
			command: ":num1 х :num2",
			callback: (num1: string, num2: string) => {
				resetTranscript();
				const x = parseInt(num1, 10);
				const y = parseInt(num2, 10);
				setResponse(`Ответ: ${x * y}`);
			},
		},
		{
			command: ":num1 / :num2",
			callback: (num1: string, num2: string) => {
				resetTranscript();
				const x = parseInt(num1, 10);
				const y = parseInt(num2, 10);
				setResponse(`Ответ: ${(x / y).toFixed(2)}`);
			},
		},

		// GOOGLING (search)
		{
			command: "Search * on google",

			callback: (gitem: string) => {
				resetTranscript();

				// function to google the query(gitem)
				function toGoogle() {
				window.open(`http://google.com/search?q=${gitem}`, "_blank");
				}
				toGoogle();

				setResponse(`Okay. Googling ${gitem}`);
			},
		},

		// CLEAR or STOP.
		{
			command: "(Пожалуйста) очисти",

			callback: () => {
				resetTranscript();
				cancel();
				setResponse("");
			},
			isFuzzyMatch: true,
			fuzzyMatchingThreshold: 0.3,
		},
	];

	const {
		transcript,
		// listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition({ commands });

	if (!browserSupportsSpeechRecognition) {
		return null;
	}

	return (
		<div>
			<p>{response}</p>
			<p>{transcript}</p>
		</div>
	);
};

export default Dictaphone;
