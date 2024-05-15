import { extendTheme } from "@chakra-ui/react";

export const colors = {
  mainGrey: '#747474',
  greyPlaceholder: '#C4C4C4',
  secondaryGrey: '#e7e7e7',
  tertiaryGrey: '#f9f9f9',
  lightGrey: '#eee',
  toggleGrey: '#D3D3D3',
  danger: '#e63757',
  black: '#111',
  yellow: '#f8b405',
  red: '#fae5e8',
  white: '#fff',
  redEvo: '#E63757',
  error: '#FAE5E8',
};

const theme = extendTheme({
  colors: {
    brand: {
      100: colors.redEvo,
    },
  },
  styles: {
    global: {
      '*::placeholder': {
        color: colors.mainGrey,
        fontSize: '0.86rem',
      },
    },
  },
  textStyles: {
    h2: {
      fontSize: '1.44rem',
      fontWeight: 'bold',
      lineHeight: '1.75rem',
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: '700',
      lineHeight: '1.5rem',
    },
    h4: {
      fontWeight: '600',
      fontSize: '1.06rem',
      lineHeight: '1.31rem',
    },
    h5: {
      fontSize: '0.875rem',
      lineHeight: '1.0625rem',
      fontWeight: '600',
    },
    h6: {
      fontSize: '0.75rem',
      fontWeight: '600',
      lineHeight: '0.94rem',
    },
    text: {
      fontSize: '0.86rem',
      fontWeight: 'normal',
      lineHeight: '1.06rem',
      color: colors.mainGrey,
    },
    textSmall: {
      fontSize: '0.75rem',
      fontWeight: '400',
      lineHeight: '0.94rem',
      color: colors.mainGrey,
    },
    sidebarItem: {
      fontSize: '1rem',
      fontWeight: 'normal',
      color: colors.mainGrey,
    },
    sidebarItemBlack: {
      fontSize: '1rem',
      fontWeight: 'normal',
      color: colors.black,
    },
    sidebarItemMobile: {
      fontSize: '0.75rem',
      fontWeight: 'normal',
      color: colors.mainGrey,
    },
    sidebarItemMobileBlack: {
      fontSize: '0.75rem',
      fontWeight: 'normal',
      color: colors.black,
    },
    errorForm: {
      fontSize: '.8rem',
      fontWeight: 'normal',
      color: colors.danger,
    },
    navBar: {
      fontSize: '1.4rem',
      fontWeight: '600',
      cursor: 'pointer'
    },
    navBarMobile: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: colors.white,
      marginTop: '2rem',
    },
    mainTitle: {
      fontSize: '2.25rem',
      lineHeight: '3.375rem',
      color: '#F9F9F9',
      fontWeight: '700',
    },
    secondTitle: {
      fontSize: '1.4375rem',
      fontWeight: '400',
      lineHeight: '1.9481rem',
      color: colors.redEvo,
    },
    mainText: {
      fontSize: '1.15rem',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: '1.85rem',
      textAlign: 'justified',
    },
    mainSmallText: {
      fontSize: '0.5625rem',
      fontStyle: 'normal',
      fontWeight: '300',
      lineHeight: '0.7356rem',
    },
    numberText: {
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '1.75rem',
      lineHeight: '1.5rem',
      color: colors.redEvo,
    },
  },
  components: {
    FormLabel: {
      variants: {
        h6: {
          fontSize: '0.75rem',
          fontWeight: 'bold',
          lineHeight: '0.94rem',
          color: colors.black,
        },
      },
    },
    Button: {
      variants: {
        grey: {
          color: colors.black,
          background: colors.lightGrey,
          fontSize: '0.81rem',
        },
        black: {
          background: colors.black,
          color: 'white',
        },
        disabled: {
          background: colors.lightGrey,
          color: colors.mainGrey,
          borderRadius: '0.5rem',
          fontSize: '0.81rem',
          lineHeight: '1rem',
          fontWeight: '600',
          cursor: 'not-allowed',
        },
        red: {
          color: colors.danger,
          background: 'transparent',
          fontSize: '0.81rem',
          lineHeight: '1rem',
          fontWeight: '600',
        },
        redEvo: {
          background: colors.redEvo,
          color: colors.white,
          fontWeight: '600',
          fontSize: '1rem',
        },
        redEvoDisabled: {
          background: 'rgba(230, 55, 87, 0.4)',
          color: colors.white,
          fontWeight: '600',
          fontSize: '1rem',
          cursor: 'not-allowed',
        },
        ghost: {
          color: colors.redEvo,
          fontWeight: '600',
          fontSize: '1rem',
        },
        inverse: {
          color: colors.redEvo,
          background: colors.lightGrey,
        },
      },
    },
    Switch: {
      variants: {
        redEvo: {
          background: colors.redEvo,
        },
      },
    },
    Heading: {
      variants: {
        h1: {
          fontSize: '2.25rem',
          fontWeight: '900',
          lineHeight: '1.75rem',
          color: colors.black,
          textAlign: 'center',
          my:'0.4rem'
        }, 
        h2: {
          fontSize: '1.44rem',
          fontWeight: '700',
          lineHeight: '1.75rem',
          color: colors.black,
          textAlign: 'center',
        },
        h3: {
          fontSize: '1.25rem',
          fontWeight: '700',
          lineHeight: '1.5625',
          color: colors.redEvo,
          my:'0.3rem'
        },
      },
    },
  },
});

export default theme;