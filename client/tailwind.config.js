/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#224429',

					white: '#fafafa',

					secondary: '#436147',

					accent: '#57c12a',

					neutral: '#25222B',

					'base-100': '#F9F9FB',

					info: '#6592CD',

					success: '#72E9A7',

					warning: '#E68405',

					error: '#E94951',
				},
			},
		],
	},
	plugins: [require('daisyui')],
};
