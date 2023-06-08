import { makeStyles } from '@material-ui/core/styles';

// Styles from react-bootstrap-typeahead
export const useStyles = makeStyles(theme => {
  const tokenColor = '#000';
  const tokenBkgColor = theme.palette.grey[200];

  return {
    typeahead: {
      '& .rbt': {
        outline: 'none',
        '& .rbt-input-main::-ms-clear': {
          display: 'none',
        },
      },
      '& .sr-only': {
        display: 'none',
      },
      '& .rbt-menu': {
        float: 'left',
        minWidth: '10rem',
        margin: '.125rem 0 0',
        fontSize: '1rem',
        color: '#6c757d',
        textAlign: 'left',
        listStyle: 'none',
        backgroundColor: '#fff',
        backgroundClip: 'padding-box',
        border: '1px solid #d9e3e9',
        marginBottom: '2px',
        borderRadius: '4px',
        padding: '8px 14px',
        '& > .dropdown-item': {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'block',
          '&:focus': {
            outline: 'none',
          },
        },
        '&-pagination-option': {
          textAlign: 'center',
        },
      },
      '& .rbt-menu > li a': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: tokenColor,
      },
      '& .rbt-menu > li a:focus': {
        outline: 'none',
      },
      '& .rbt-menu-pagination-option': {
        textAlign: 'center',
      },
      '& .form-control': {
        display: 'block',
        width: '100%',
        fontSize: '1rem',
        fontWeight: '400',
        color: '#6c757d',
        backgroundClip: 'padding-box',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
        border: '1px solid #e2e2e2',
        borderRadius: '4px',
        backgroundColor: '#FFF',
        height: '1.1876em',
        padding: '7.5px 14px',
      },
      '& .rbt-input-multi': {
        cursor: 'text',
        position: 'relative',
        height: 'auto',
        '&.focus': {
          outline: '0',
        },
        '&.form-control[disabled]': {
          backgroundColor: '#e9ecef',
          opacity: '1',
        },
        '& input::-moz-placeholder': {
          color: '#999',
          opacity: '1',
        },
        '& input:-ms-input-placeholder': {
          color: '#999',
        },
        '& input::-webkit-input-placeholder': {
          color: '#999',
        },
        '& .rbt-input-wrapper': {
          marginBottom: '-4px',
          marginTop: '-1px',
          overflow: 'hidden',
        },
        '& .rbt-input-main': {
          height: '20px',
          margin: '1px 0 4px',
        },
        '& .rbt-input-hint-container': {
          display: 'inline-block',
        },
        '&.input-lg .rbt-input-main': {
          height: '24px',
        },
        '&..form-control-lg .rbt-input-main': {
          height: '24px',
        },
        '&.input-sm .rbt-input-main': {
          height: '18px',
        },
        '&.form-control-sm .rbt-input-main': {
          height: '18px',
        },
      },
      '& .rbt-close': {
        zIndex: '1',
        '& .sr-only': {
          display: 'none',
        },
      },
      '& .rbt-close-lg': {
        fontSize: '24px',
      },
      '& .rbt-token': {
        backgroundColor: tokenBkgColor,
        border: '0',
        borderRadius: '2px',
        color: tokenColor,
        display: 'inline-block',
        lineHeight: '1em',
        margin: '0 3px 3px 0',
        padding: '4px 7px',
        position: 'relative',
        '& .rbt-token-remove-button': {
          bottom: '0',
          color: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'normal',
          opacity: '1',
          outline: 'none',
          padding: '3px 7px',
          position: 'absolute',
          right: '0',
          textShadow: 'none',
          top: '-2px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
        },
      },
      '& .rbt-token-disabled': {
        backgroundColor: '#ddd',
        color: '#888',
        pointerEvents: 'none',
      },
      '& .rbt-token-removeable': {
        cursor: 'pointer',
        paddingRight: '21px',
      },
      '& .rbt-token-active': {
        outline: 'none',
        textDecoration: 'none',
      },
      '& .rbt-loader': {
        animation: 'rotate 600ms infinite linear',
        border: '1px solid #d5d5d5',
        borderRadius: '50%',
        borderTopColor: theme.palette.primary.main,
        display: 'block',
        height: '14px',
        width: '14px',
      },
      '& .rbt-aux': {
        display: 'flex',
        alignItems: 'center',
        bottom: '0',
        justifyContent: 'center',
        pointerEvents: 'none',
        /* Don't block clicks on the input */
        position: 'absolute',
        right: '0',
        top: '0',
        width: '34px',
      },
      '& .rbt-aux-lg': {
        width: '46px',
      },
      '& .rbt-aux .rbt-close': {
        marginTop: '-4px',
        pointerEvents: 'auto',
        /* Override pointer-events: none; above */
      },
      '& .has-aux .rbt-input': {
        paddingRight: '34px',
      },
      '& .rbt-highlight-text': {
        backgroundColor: 'inherit',
        color: 'inherit',
        fontWeight: 'bold',
        padding: '0',
      },
      // /* Input Groups */
      '& .input-group > .rbt': {
        flex: '1',
      },
      '& .input-group > .rbt .rbt-input-hint-container': {
        display: 'flex',
      },
      '& .input-group > .rbt .rbt-aux': {
        zIndex: '5',
      },
      '& .input-group > .rbt .rbt-input-hint': {
        zIndex: '5',
      },
      '& .input-group > .rbt:not(:first-child) .form-control': {
        borderTopLeftRadius: '0',
        borderBottomLeftRadius: '0',
      },
      '& .input-group > .rbt:not(:last-child) .form-control': {
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
      },
      // // /* Validation States */
      '& .has-error .rbt-input-multi.focus': {
        borderColor: '#843534',
        boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483',
      },
      '& .has-warning .rbt-input-multi.focus': {
        borderColor: '#66512c',
        boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #c0a16b',
      },
      '& .has-success .rbt-input-multi.focus': {
        borderColor: '#2b542c',
        boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #67b168',
      },
    },
  };
});
