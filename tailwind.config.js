module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'main-background': '#131313',
        'main-pink': '#F97187',
        "modal-border": '#282828',
        "modal-background": "#1A1A1A",
        "modal-text": "#A4A4A4",
        "input-border": "#363636",
        "input-background": "#252525",
        "input-text": "#E0E0E0",
      },
      margin: {
        '15': '3.75rem',
      },
      width: {
        "98" : "26.25rem"
      },
      height: {
        "60" : "15.25rem",
        "100" : "37.625rem"
      },
      screens: {
        '450': '450px'
      }
    },
    backgroundImage: theme => ({
      'gradient-main': 'linear-gradient(268deg, #FC768A -14.8%, #E65073 102.08%)',
      'gradient-main-card': 'linear-gradient(90deg, #552028 0%, #1A1A1A 62.81%)',
    })
  },
}
