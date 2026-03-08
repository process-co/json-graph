import { createTheme } from '@mui/material/styles';

export const baseTheme = createTheme({
  palette: {
    primary: {
      main: 'rgb(33,131,131)',
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgb(218,220,223)',
    },
    pro: {
      main: '#000',
      contrastText: '#fff',
    },
    white: {
      disabled: 'rgb(var(--color-app-dark-navy))',
      main: 'rgb(var(--color-app-dark-navy))',
      contrastText: '#fff',
    },
    dark: {
      disabled: 'rgb(var(--color-app-dark-navy))',
      main: 'rgb(var(--color-app-dark-navy))',
      contrastText: '#fff',
    },
    main: {
      primary: '#dadada',
      secondary: '#f4f323',
      pro: 'rgb(var(--color-app-aqua))',
    },
  },
  cssVariables: false,
  components: {
    MuiDialogActions: {
      defaultProps: {
        sx: {
          display: 'block',
          paddingX: '32px',
          paddingBottom: '24px',
          fontSize: '32px',
          lineHeight: '40px',
          fontFamily: 'Inter',
          '>div': {
            paddingTop: '24px',
            borderTop: '1px rgb(var(--color-app-grey-two)) solid',
          },
        },
      },
    },
    MuiDialogContent: {
      defaultProps: {
        sx: {
          padding: '32px',
        },
      },
    },
    MuiDialogTitle: {
      defaultProps: {
        sx: {
          paddingX: '32px',
          paddingTop: '24px',
          fontSize: '32px',
          lineHeight: '40px',
          fontFamily: 'Inter',
          '>div': {
            paddingBottom: '12px',
            borderBottom: '1px rgb(var(--color-app-grey-two)) solid',
          },
        },
      },
    },

    MuiChip: {
      variants: [
        {
          props: { color: 'success' },
          style: {
            color: '#fff !important',
            backgroundColor: 'rgb(var(--color-app-green)) !important',
          },
        },

        {
          props: { color: 'secondary' },
          style: {
            textTransform: 'unset',
            color: '#fff !important',
            backgroundColor: 'rgb(var(--color-app-secondary)) !important',
          },
        },
        {
          props: { color: 'primary' },
          style: {
            color: '#fff !important',
            backgroundColor: 'rgb(var(--color-app-aqua)) !important',
          },
        },
        {
          props: { color: 'pro' },
          style: {
            color: '#fff !important',
            backgroundColor: 'rgb(var(--color-brand-pro)) !important',
          },
        },
        {
          props: { color: 'dark' },
          style: {
            color: '#fff !important',
            backgroundColor: 'rgb(var(--color-app-dark-navy)) !important',
          },
        },
        {
          props: { color: 'error' },
          style: {
            color: '#fff !important',
            backgroundColor: 'rgb(var(--color-app-red)) !important',
          },
        },
      ],
    },
    MuiToggleButton: {
      variants: [
        {
          props: { color: 'dark', selected: true },
          style: {
            color: '#fff !important',
            backgroundColor: 'rgb(var(--color-app-dark-navy)) !important',
          },
        },
      ],
    },
    MuiBadge: {
      variants: [
        {
          props: { color: 'success' },
          style: {
            color: '#fff !important',
            backgroundColor: 'rgb(var(--color-app-green)) !important',
          },
        },
        {
          props: { color: 'primary' },
          style: {
            color: '#fff !important',
            backgroundColor: 'rgb(var(--color-app-aqua)) !important',
          },
        },
        {
          props: { color: 'pro' },
          style: {
            color: '#fff !important',
            backgroundColor: 'rgb(var(--color-brand-pro)) !important',
          },
        },
        {
          props: { color: 'dark' },
          style: {
            color: '#fff !important',
            backgroundColor: 'rgb(var(--color-app-dark-navy)) !important',
          },
        },
        {
          props: { color: 'error' },
          style: {
            color: '#fff !important',
            backgroundColor: 'rgb(var(--color-app-red)) !important',
          },
        },
      ],
      defaultProps: {
        color: 'success',
        className: 'mr-4 menu:-mr-2',
        sx: {
          padding: '0 8px',
          fontSize: '12px',
          fontWeight: '700',
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: '4px',
          maxHeight: '24px',
          textTransform: 'uppercase',
        },
      },
      // styleOverrides: {

      // },
    },
    // MuiList: {
    //   defaultProps: {
    //     sx: {
    //       ".nav-tabs": { display: "flex" },
    //     },
    //   },
    // },

    MuiListItem: {
      defaultProps: {
        sx: { borderRadius: '6px' },
      },
    },

    MuiSelect: {
      variants: [
        {
          props: { size: 'small' },
          style: {
            outline: 'none',
          },
        },
      ],
    },

    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState, theme }: { ownerState: any; theme: any }) => ({
          ...(ownerState.color === 'dark' && {
            '& fieldset': {
              borderColor: '#fff',
            },
            '&:hover fieldset': {
              // border: 0,
              borderColor: '#ffffff !important',
            },
            '& .Mui-focused fieldset': {
              // border: 0,
              borderColor: '#ffffff !important',
            },
            //color: theme.palette.grey[500],
          }),
          ...(ownerState.color === 'white' && {
            //backgroundColor: "#fff !important",
            '& fieldset': {
              border: 'none',
              borderColor: '#ffffff',
            },
            '&:hover fieldset': {
              border: 'solid',
              borderColor: '#ffffff !important',
            },
            '& .MuiSelect-select': {
              background: 'rgba(255,255,255,.3)',
              color: '#fff',
            },
            '& .MuiSvgIcon-root': {
              color: '#fff',
            },
            '& .Mui-focused fieldset': {
              border: 'solid 1px !important',
              borderColor: '#ffffff !important',
            },
            //color: theme.palette.grey[500],
          }),
        }),
      },
      variants: [
        {
          props: { variant: 'filled', size: 'micro' },
          style: {
            input: {
              padding: 0,
              fontSize: '12px',
              lineHeight: '12px',
              marginTop: '3px',
              width: '40px',
              textAlign: 'center',
            },
          },
        },
        {
          props: { size: 'inline' },
          style: {
            input: {
              padding: 0,
              fontSize: '12px',
              lineHeight: '12px',
              marginTop: '3px',
              width: '40px',
              textAlign: 'center',
            },
          },
        },
        {
          props: { size: 'small' },
          style: {},
        },
      ],
      defaultProps: {
        SelectProps: {
          displayEmpty: true,
          MenuProps: {
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            sx: { margin: '0px', padding: 0 },
            MenuListProps: {
              sx: {
                padding: 0,
                margin: '6px',
                li: { borderRadius: '2px !important' },
              },
            },
          },
        },
      },
    },

    MuiButtonGroup: {
      defaultProps: {
        sx: {
          textTransform: 'unset',
        },
      },
    },

    MuiDialog: {
      defaultProps: {
        className: 'bg-black/20',
        BackdropProps: {
          style: {
            background: 'rgb(var(--color-app-dark-navy)/.6)',
          },
        },
      },
    },

    // MuiList: {
    //   defaultProps: {
    //     sx: {
    //       backgroundColor: "#ff00dd",
    //       ">li": { padding: "6px" },
    //     },
    //   },
    // },

    // MuiListItem: {
    //   defaultProps: {
    //     sx: { paddingLeft: "6px" },
    //   },
    // },

    MuiFab: {
      defaultProps: {
        //disableElevation: true,
      },
      variants: [
        {
          props: { variant: 'flat', color: 'dark', disabled: false },
          style: {
            textTransform: 'unset',
            color: 'rgba(255,255,255,1) !important',
            backgroundColor: 'rgb(var(--color-app-dark-navy)) !important',
          },
        },
        {
          props: { variant: 'flat', color: 'dark', disabled: true },
          style: {
            textTransform: 'unset',
            color: 'rgba(255,255,255,1) !important',
            backgroundColor: 'rgb(var(--color-app-dark-navy)/.4) !important',
          },
        },
        {
          props: { variant: 'flat', color: 'primary', disabled: true },
          style: {
            textTransform: 'unset',
            color: 'rgba(255,255,255,.8) !important',
            backgroundColor: 'rgb(var(--color-app-aqua)/.5) !important',
          },
        },
        {
          props: { variant: 'flat', color: 'primary', disabled: false },
          style: {
            textTransform: 'unset',
            color: '#fff',
            backgroundColor: 'rgb(var(--color-app-aqua)) !important',
          },
        },
        {
          props: { variant: 'flat', color: 'light', disabled: false },
          style: {
            textTransform: 'unset',
            color: 'rgb(var(--color-app-aqua))',
            backgroundColor: 'rgb(var(--color-app-aqua-100)) !important',
          },
        },
        {
          props: { variant: 'flat', color: 'secondary', disabled: false },
          style: {
            textTransform: 'unset',
            color: '#fff !important',
            backgroundColor: 'rgb(var(--color-app-secondary)) !important',
          },
        },
        {
          props: { variant: 'flat', color: 'secondary', disabled: true },
          style: {
            textTransform: 'unset',
            color: 'rgb(var(--color-app-secondary-text)) !important',
            backgroundColor: 'rgb(var(--color-app-secondary)/.5) !important',
          },
        },
      ],
    },

    MuiIconButton: {
      variants: [
        {
          props: { color: 'dark' },
          style: {
            ':hover': { backgroundColor: 'rgb(var(--color-app-dark-navy)/.8)' },
          },
        },
        {
          props: { size: 'large' },
          style: {
            fontSize: '18px',
            height: '2.5rem',
            width: '2.5rem',
          },
        },
      ],
    },

    MuiButton: {
      variants: [
        {
          props: { variant: 'flat', size: 'medium' },
          style: {
            textTransform: 'unset',
            fontSize: '14px',
            minHeight: '40px',
            maxHeight: '40px',
            height: '40px',
          },
        },
        {
          props: { variant: 'flat', size: 'large' },
          style: {
            textTransform: 'unset',
            fontSize: '16px',
            minHeight: '60px',
            maxHeight: '60px',
            height: '60px',
          },
        },
        {
          props: { size: 'medium' },
          style: {
            textTransform: 'unset',
            fontSize: '14px',
            minHeight: '40px',
            maxHeight: '40px',
            height: '40px',
          },
        },
        {
          props: { size: 'large' },
          style: {
            height: '50px',
            maxHeight: '50px',
            minHeight: '50px',
          },
        },
        {
          props: { color: 'success' },
          style: {
            textTransform: 'unset',
            color: 'rgba(255,255,255,1) !important',
            backgroundColor: 'rgb(var(--color-app-green)) !important',
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            border: '1px solid',
            borderColor: 'rgb(var(--color-app-primary)) !important',
          },
        },
        {
          props: { variant: 'flat', color: 'dark', disabled: false },
          style: {
            textTransform: 'unset',
            color: 'rgba(255,255,255,1) !important',
            backgroundColor: 'rgb(var(--color-app-dark-navy)) !important',
          },
        },
        {
          props: { variant: 'flat', color: 'dark', disabled: true },
          style: {
            textTransform: 'unset',
            color: 'rgba(255,255,255,1) !important',
            backgroundColor: 'rgb(var(--color-app-dark-navy)/.4) !important',
          },
        },
        {
          props: { variant: 'flat', color: 'primary', disabled: true },
          style: {
            textTransform: 'unset',
            color: 'rgba(255,255,255,.8) !important',
            backgroundColor: 'rgb(var(--color-app-aqua)/.5) !important',
          },
        },
        {
          props: { variant: 'flat', color: 'primary', disabled: false },
          style: {
            textTransform: 'unset',
            color: '#fff !important',
            backgroundColor: 'rgb(var(--color-app-primary)) !important',
          },
        },
        {
          props: { variant: 'flat', color: 'light', disabled: false },
          style: {
            textTransform: 'unset',
            color: 'rgb(var(--color-app-aqua)) !important',
            backgroundColor: 'rgb(var(--color-app-aqua-100)) !important',
          },
        },
        {
          props: { variant: 'flat', color: 'secondary', disabled: true },
          style: {
            textTransform: 'unset',
            color: '#fff !important',
            backgroundColor: 'rgb(var(--color-app-secondary)) !important',
          },
        },
        {
          props: { variant: 'flat', color: 'secondary', disabled: false },
          style: {
            textTransform: 'unset',
            color: 'rgb(var(--color-app-secondary-text)) !important',
            backgroundColor: 'rgb(var(--color-app-secondary)/.5) !important',
          },
        },
        {
          props: { color: 'error', disabled: false },
          style: {
            textTransform: 'unset',
            color: 'rgb(255 255 255) !important',
            backgroundColor: 'rgb(var(--color-app-red)) !important',
          },
        },
      ],
      defaultProps: {
        disableElevation: true,
        // disableFocusRipple: true,
        // disableRipple: true,
        sx: {
          minWidth: 'unset',
          fontFamily: 'Inter',
          textTransform: 'unset',
          //borderStyle: "solid",
        },
      },
    },

    // MuiPopover: {
    //   sx: { backgroundColor: "rgba(255,255,255,.8)" },
    //   defaultProps: {
    //     PaperProps: { sx: { backgroundColor: "rgba(255,255,255,.8)" } },
    //   },
    // },
    // MuiPaper: {
    //   sx: { backgroundColor: "rgba(255,255,255,.8)" },
    // },
    // MuiMenu: {
    //   defaultProps: {
    //     PaperProps: {
    //       sx: { backgroundColor: "rgba(255,255,255,.8)" },
    //     },
    //   },
    // },
  },
} as any);
