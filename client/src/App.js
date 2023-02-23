import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register/:type" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
}
export default App;
