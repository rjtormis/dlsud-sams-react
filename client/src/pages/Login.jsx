import { Link } from 'react-router-dom';
import { FaEnvelope, FaShieldAlt, FaHome } from 'react-icons/fa';
import logo from '../assets/dlsu-d.png';
import bg from '../assets/bg.jpg';
function Login() {
	return (
		<div className="grid grid-cols-3 h-screen">
			<div className="col-span-2 relative">
				<Link to="/" className="absolute btn bg-white top-5 left-5">
					<FaHome size={20} color={'#224429'} />
				</Link>
				<figure className="h-full">
					<img src={bg} alt="Background" className="w-full h-full" />
				</figure>
			</div>

			<div id="register" className="bg-white p-4 flex flex-col">
				<section id="regLogo" className="flex justify-center">
					<img src={logo} alt="DLSUD SAMS" />
				</section>

				<section id="regInput" className="my-auto mx-10 ">
					<h2 className="text-green-700 text-4xl">Welcome back</h2>
					<p>Welcome back! Please enter your details</p>
					<form action="" className="mt-10">
						<div className="input-group">
							<span>
								<FaEnvelope />
							</span>
							<input type="text" placeholder="Email" className="input input-bordered w-full" />
						</div>
						<div className="input-group mt-4">
							<span>
								<FaShieldAlt />
							</span>
							<input type="text" placeholder="Password" className="input input-bordered  w-full " />
						</div>
						<input type="submit" value="LOGIN" className="btn btn-primary w-full mt-4" />
					</form>
					<p className="mt-10 text-center">
						Don't Have an account?
						<Link className="ml-4 link link-primary">Sign Up!</Link>
					</p>
				</section>
			</div>
		</div>
	);
}
export default Login;
