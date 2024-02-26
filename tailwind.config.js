/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,scss}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'sea1': 'url("https://img.freepik.com/premium-photo/architecture-construction-ai-generated_406939-9250.jpg?w=996")',
        'sea2': 'url("https://c4.wallpaperflare.com/wallpaper/784/200/932/architecture-building-construction-design-wallpaper-preview.jpg")',
        'sea3': 'url("https://media.istockphoto.com/id/1179153745/photo/multi-ethic-workers-talking-at-construction-site-reviewing-plans.jpg?s=170667a&w=0&k=20&c=OImcaZ7NTcc-5rjb-IEWIePEgFVdh-QaRrHxKy7F0pE=")'
      }
    },
  },
  plugins: [],
}