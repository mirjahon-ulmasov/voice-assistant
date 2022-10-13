import React, { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import moment from "moment";
import "moment/locale/ru";

interface IOrder {
	drink: string,
	sugar?: number,
}

const Dictaphone = () => {
	const [response, setResponse] = useState("");
	const [order, setOrder] = useState<IOrder>({ drink: "", sugar: 0 });

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
			command: "(Пожалуйста) принеси (мне) *",
			callback: (drink: string) => {
				resetTranscript();
				setOrder(prev => ({...prev, drink }))
				setResponse(`Сколько ложек сахара класть в ${drink}?`);
			},
		},

		{
			command: [":count (ложки)", "не надо", "без сахара"],
			callback: (count: any) => {
				resetTranscript();
				let countSugar = 0;
				if(!order?.drink) {
					setResponse(`Пожалуйста, сначала выберите напиток!`);
					return;
				}
				if(count.command) countSugar = 0;
				else if(isNaN(count)) {
					setResponse(`Я вас не понял`);
					return;
				}
				else countSugar = parseInt(count);
				setOrder(prev => ({...prev, sugar: countSugar}))
				setResponse(`Спасибо, ваш заказ принят`);
			},
			fuzzyMatchingThreshold: 1,
		},

		
		{
			command: "Покажи (мне) заказ",
			callback: (count: string) => {
				resetTranscript();
				if(!order?.drink) {
					setResponse(`Ваш заказ пуст`);
					return;
				}
				setResponse(`Ваш заказ: ${order.drink} ${order.sugar ? `с ${order.sugar} ложками` : "без"} сахара`);
			},
			fuzzyMatchingThreshold: 1,
		},

		{
			command: "(Привет) меня зовут :name",
			callback: (name: string) => {
				resetTranscript();
				setResponse(`Привет, ${name}. Красивое имя`);
			},
		},

		{
			command: ["Открой Youtube"],
			callback: () => {
				resetTranscript();
				window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', "_blank");
			},
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
			command: ["(Пожалуйста) очисти", "очистить"],

			callback: () => {
				cancel();
				setResponse("");
				resetTranscript();
				setOrder({ drink: "", sugar: 0 })				
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
		<div className="output">
			<p>{transcript}</p>
			<p>{response}</p>
		</div>
	);
};

export default Dictaphone;
