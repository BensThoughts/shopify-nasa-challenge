const generateColorClass = (variable) => {
  return ({ opacityValue }) =>
    opacityValue
      ? `rgba(var(--${variable}), ${opacityValue})`
      : `rgb(var(--${variable}))`
}

module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive']
      },
      backgroundColor: {
        'app-bg-primary': generateColorClass('color-bg-primary'),
        'app-bg-secondary': generateColorClass('color-bg-secondary'),
        'primary': generateColorClass('color-app-primary'),
        'secondary': generateColorClass('color-app-secondary'),
        'accent': generateColorClass('color-app-accent'),
      },
      textColor: {
        'primary': generateColorClass('color-text-primary'),
        'primary-dark': generateColorClass('color-text-primary-dark'),
        'secondary': generateColorClass('color-text-secondary'),
        'icon-primary': generateColorClass('color-app-primary'),
        'icon-secondary': generateColorClass('color-app-secondary'),
        'icon-accent': generateColorClass('color-app-accent')
      },
      borderColor: {
        'primary': generateColorClass('color-app-primary'),
        'secondary': generateColorClass('color-app-secondary'),
        'accent': generateColorClass('color-app-accent'),
        'icon-primary': generateColorClass('color-icon-border-primary')

      },
      borderWidth: {
        1: '1px'
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderOpacity: ['active']
    },
  },
  plugins: [],
}
