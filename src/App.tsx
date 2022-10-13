import Lottie from "lottie-react";

import Dictaphone from "./pages/Dictaphone"
import StartButton from "./components/StartButton";
import robot from "./assets/images/73234-robot-assistant-online-manager.json"

function App() {
	return (
		<main>
			<header>
				<StartButton/>
				<Dictaphone/>
			</header>
			<Lottie className="lottie" animationData={robot} loop={true} />
		</main>
	);
}

export default App;
