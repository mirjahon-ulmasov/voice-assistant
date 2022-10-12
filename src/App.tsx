import Lottie from "lottie-react";

import Dictaphone from "./pages/Dictaphone"
import StartButton from "./components/StartButton";
import robot from "./assets/images/73234-robot-assistant-online-manager.json"

function App() {
	return (
		<main>
			<StartButton/>
			<Dictaphone/>
			<Lottie className="lottie" animationData={robot} loop={true} />
		</main>
	);
}

export default App;
