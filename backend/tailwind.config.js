/** @type {import('tailwindcss').Config} */
export default {
	content: ["./public/views/**/*.html"],
	theme: {
		extend: {
			fontFamily: {
				alanta: ["Alata", "sans-serif"],
				roboto: ["Roboto Slab", "serif"],
				ubuntu: ["Ubuntu", " sans - serif"],
			},
		},
	},
	plugins: [],
};
