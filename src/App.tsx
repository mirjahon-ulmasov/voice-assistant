import Lottie from "lottie-react";

import Dictaphone from "./pages/Dictaphone"
import StartButton from "./components/StartButton";
import robot from "./assets/images/73234-robot-assistant-online-manager.json"
import FaceRecognition from "./pages/FaceRecognition";

function App() {
	return (
		<main>
			<header>
				<StartButton/>
				<Dictaphone/>
				<FaceRecognition/>
			</header>
			{/* <Lottie className="lottie" animationData={robot} loop={true} /> */}
			<div style={{ display: 'flex', alignItems: "center", flexDirection: "column", fontSize: "22px"}}>
				<p>1) Принеси (мне) kofe</p>
				<p>2) 3 (ложки), не надо, без сахара</p>
				<p>3) Покажи (мне) заказ</p>
				<p>4) (Привет) меня зовут Андрей</p>
				<p>5) Открой Youtube</p>
				<p>6) (Извините) сколько времени (сейчас), Какое время</p>
				<p>8) Какое (сегодня) число</p>
				<p>9) (Пожалуйста) очисти, очистить</p>
			</div>
		</main>
	);
}

export default App;
