import { useParams, Link } from 'react-router-dom';
import { HiIdentification } from 'react-icons/hi';
import { FaEnvelope, FaHome } from 'react-icons/fa';
import { BsFillShieldLockFill, BsShieldFillExclamation } from 'react-icons/bs';
import signup from '../assets/Register/signup.svg';

function Register() {
	const params = useParams();
	const type = params.type;
	return (
		<div className="grid grid-cols-3 h-screen">
			<div id="regBG" className="p-4 col-span-1 flex content-center justify-center ">
				{/* <img src={signup} alt="Sign Up" /> */}
			</div>

			<div className="col-span-2 bg-white p-4 flex flex-col justify-center relative">
				<Link to="/" className="absolute top-5 left-5 btn btn-primary mx-auto">
					<FaHome size={20} className="mr-2" />
					Home
				</Link>
				<section id="regInput" className="p-20">
					<h2 className="text-green-700 text-4xl">CREATE A {type === 'student' ? 'STUDENT' : 'PROFESSOR'} ACCOUNT</h2>
					<p className="mt-2">Never Miss a Beat: Keep Track of Attendance with Ease</p>

					<form action="" className="mt-10">
						{/* Name */}
						<div className="grid grid-cols-3 gap-4">
							<div className="form-control">
								<label htmlFor="" className="label">
									<span className="label-text">First Name</span>
								</label>
								<input type="text" placeholder="First name" className="input input-ghost input-bordered" />
							</div>
							<div className="form-control">
								<label htmlFor="" className="label">
									<span className="label-text">Middle Initial</span>
								</label>
								<input type="text" placeholder="Middle Initial" className="input input-ghost input-bordered" />
							</div>
							<div className="form-control">
								<label htmlFor="" className="label">
									<span className="label-text">Last name</span>
								</label>
								<input type="text" placeholder="Last name" className="input input-ghost input-bordered" />
							</div>
						</div>

						{/* STUDENT / PROFESSOR DETAILS */}
						<div className="grid grid-cols-2 gap-4">
							<div className="form-control">
								<label htmlFor="" className="label">
									<span className="label-text">Student Number</span>
								</label>
								<div className="input-group">
									<span>
										<HiIdentification />
									</span>
									<input type="text" placeholder="Student Number" className="input input-ghost input-bordered w-full" />
								</div>
							</div>
							<div className="form-control ">
								<label htmlFor="" className="label">
									<span className="label-text">Email Address</span>
								</label>
								<div className="input-group">
									<span>
										<FaEnvelope />
									</span>
									<input type="text" placeholder="Email Address" className="input input-ghost input-bordered w-full" />
								</div>
							</div>
						</div>

						{/* PASSWORD */}
						<div className="grid grid-cols-2 gap-4">
							<div className="form-control">
								<label htmlFor="" className="label">
									<span className="label-text">Password</span>
								</label>
								<div className="input-group">
									<span>
										<BsFillShieldLockFill />
									</span>
									<input type="password" placeholder="Password" className="input input-ghost input-bordered w-full" />
								</div>
							</div>
							<div className="form-control ">
								<label htmlFor="" className="label">
									<span className="label-text">Confirm Password</span>
								</label>
								<div className="input-group">
									<span>
										<BsShieldFillExclamation />
									</span>
									<input
										type="password"
										placeholder="Confirm Password"
										className="input input-ghost input-bordered w-full"
									/>
								</div>
							</div>
						</div>
						<input type="submit" value="CREATE ACCOUNT" className="btn btn-primary w-full mt-4" />
					</form>
					<p className="mt-10 text-center">
						Already have an account?
						<Link className="ml-4 link link-primary">Login!</Link>
					</p>
				</section>
			</div>
		</div>
	);
}
export default Register;
