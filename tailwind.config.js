/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			placeholderColor: {
				black: '#000',
			},
			colors: {
				'sh-gr-01': '#f3f9fd',
			},
			animation: {
				'slide-down': 'slide-down 0.5s ease-in-out',
				'slide-up': 'slide-up 3s ease-in-out',
			},
			keyframes: {
				'slide-down': {
					'0%': {
						transform: 'translateY(-20px)',
						opacity: '0',
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1',
					},
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(0)',
						opacity: '1',
					},
					'100%': {
						transform: 'translateY(-20px)',
						opacity: '0',
					},
				},
			},
		},
	},
	plugins: [],
};
