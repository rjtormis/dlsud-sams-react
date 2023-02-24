import { useContext, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiIdentification } from 'react-icons/hi';
import { FaEnvelope, FaHome, FaUserTie, FaUserGraduate } from 'react-icons/fa';
import { BsFillShieldLockFill, BsShieldFillExclamation } from 'react-icons/bs';

import signup from '../assets/Register/signup.svg';

function Register() {
	const params = useParams();

	const type = params.type;

	const [firstName, setFirstName] = useState('');
	const [firstNameValid, setFirstNameValid] = useState(true);

	const [middleInitial, setMiddleInitial] = useState('');
	const [middleInitialValid, setMiddleInitialValid] = useState(true);

	const [lastName, setLastName] = useState('');
	const [lastNameValid, setLastNameValid] = useState(true);

	const [studentNumber, setStudentNumber] = useState('');
	const [studentNumberValid, setStudentNumberValid] = useState(true);

	const [emailAddress, setEmailAddress] = useState('');
	const [emailAddressValid, setEmailAddressValid] = useState(true);

	const [password, setPassword] = useState('');
	const [passwordValid, setPasswordValid] = useState(true);

	const [confirmPassword, setConfirmPassword] = useState('');
	const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleFNChange = (e) => {
		setFirstNameValid(e.target.value !== '');
	};
	const handleMIChange = (e) => {
		setMiddleInitialValid(e.target.value !== '');
	};
	const handleLNChange = (e) => {
		setLastNameValid(e.target.value !== '');
	};
	const handleStudentNumberChange = (e) => {
		setStudentNumberValid(e.target.value !== '');
	};
	const handleEmailChange = (e) => {
		setEmailAddressValid(e.target.value !== '');
	};
	const handlePasswordChange = (e) => {
		setPasswordValid(e.target.value !== '');
	};
	const handleConfirmPasswordChange = (e) => {
		setConfirmPasswordValid(e.target.value !== '');
	};

	return (
		<div className="grid grid-cols-3 h-screen">
			<div id="regBG" className="p-4 col-span-1 flex content-center justify-center ">
				<section className="absolute top-5 left-5 flex flex-col gap-2 ">
					<Link to="/" className="btn btn-neutral mr">
						<FaHome size={20} className="" />
					</Link>
					<Link to={`/register/${type === 'student' ? 'professor' : 'student'}`} className="btn btn-neutral">
						{type === 'student' ? (
							<FaUserGraduate size={20} color={'#224429'} />
						) : (
							<FaUserTie size={20} color={'#224429'} />
						)}
					</Link>
				</section>
			</div>

			<div className="col-span-2 bg-white p-4 flex flex-col justify-center relative">
				<section id="regInput" className="p-20">
					<h2 className="text-green-700 text-4xl">CREATE A {type === 'student' ? 'STUDENT' : 'PROFESSOR'} ACCOUNT</h2>
					<p className="mt-2">Never Miss a Beat: Keep Track of Attendance with Ease</p>

					<form action="" className="mt-10" onSubmit={handleSubmit}>
						{/* Name */}
						<div className="grid grid-cols-3 gap-4">
							<div className="form-control">
								<label htmlFor="" className="label">
									<span className="label-text">First Name</span>
								</label>
								<input
									type="text"
									placeholder="First name"
									className={`input input-${firstNameValid ? 'ghost' : 'error'} input-bordered`}
									onChange={handleFNChange}
								/>
							</div>
							<div className="form-control">
								<label htmlFor="" className="label">
									<span className="label-text">Middle Initial</span>
								</label>
								<input
									type="text"
									placeholder="Middle Initial"
									className={`input input-${middleInitialValid ? 'ghost' : 'error'} input-bordered`}
									onChange={handleMIChange}
								/>
							</div>
							<div className="form-control">
								<label htmlFor="" className="label">
									<span className="label-text">Last name</span>
								</label>
								<input
									type="text"
									placeholder="Last name"
									className={`input input-${lastNameValid ? 'ghost' : 'error'} input-bordered`}
									onChange={handleLNChange}
								/>
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
									<input
										type="text"
										placeholder="Student Number"
										className={`input input-${studentNumberValid ? 'ghost' : 'error'} input-bordered w-full`}
										onChange={handleStudentNumberChange}
									/>
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
									<input
										type="email"
										placeholder="Email Address"
										className={`input input-${emailAddressValid ? 'ghost' : 'error'} input-bordered w-full`}
										onChange={handleEmailChange}
									/>
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
									<input
										type="password"
										placeholder="Password"
										className={`input input-${passwordValid ? 'ghost' : 'error'} input-bordered w-full`}
										onChange={handlePasswordChange}
									/>
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
										className={`input input-${confirmPasswordValid ? 'ghost' : 'error'} input-bordered w-full`}
										onChange={handleConfirmPasswordChange}
									/>
								</div>
							</div>
						</div>
						<input type="submit" value="CREATE ACCOUNT" className="btn btn-primary w-full mt-4" />
					</form>
					<p className="mt-10 text-center">
						Already have an account?
						<Link to="/login" className="ml-4 link link-primary">
							Login!
						</Link>
					</p>
				</section>
			</div>
		</div>
	);
}
export default Register;
