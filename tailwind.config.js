/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				"sh-gr-01" : '#f3f9fd',
			}
		},
	},
	plugins: [],
};
