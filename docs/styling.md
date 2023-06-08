## Styling

We use MUI (Material UI) styles to customize MUI components. We also use it for theme-dependant styles, like colours and breakpoints style changes.
For non MUI components, styling should be done by CSS modules.

Here is an example of how to style a component using both MUI and CSS modules:

```
import { withStyles } from '@material-ui/core/styles';
import styles from './index.module.css';

const CustomizableComponent = props => {
  const { classes } = props;
  return (
    <div className={classes.container || 'defaultGlobalClass__container'}>
      <button className={classes.button || 'defaultGlobalClass__button'}/>
    </div>
  );
};

const useStyles = theme => ({
    customColorClass: {
        color: theme.palette.primary.main,
    },
});

const UnstyledComponent = props => {
  const { classes } = props;

  return (
    <div className={styles.localClass}>         // Local classes can be applied to local elements
        <CustomizableComponent
          classes={{                            // Use the `classes` prop to override styles in other components
            container: styles.customStyleClass,
            button: classes.customColorClass,
          }}
        />
    </div>
  );
};

export default withStyles(useStyles)(UnstyledComponent);
```

### CSS modules

We use CSS modules to create unique CSS classnames that avoid class name collisions. For more information about how to use them check the [CSS modules documentation page](https://github.com/css-modules/css-modules#css-modules).

We recommend the use of CSS modules for any styling that does not involve the theme-dependant styles or a MUI component.

### Material UI

We heavily use components from Material UI and follow the Material Design guidelines.

#### Theming

MUI themes is our standard way to handle colour related styles, breakpoints, opacities... Please check MUI [themes docs](https://v3.material-ui.com/customization/themes/) for more information about how to work with themes.

The default devzone theme can be found and edited at [src/dw/devzone/themes/index.js](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/master/packages/devzone-core/src/themes/index.js).

The defaultTheme can be overwritten at any point in the applications. For example:

```
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const WithThemeComponent = ({ customColor, ...props }) => {
  const newTheme = theme =>
    createMuiTheme({
      ...theme,
      color: customColor,
    });
  return (
    <MuiThemeProvider theme={newTheme}>
      <Component {...props} />
    </MuiThemeProvider>
  );
};
```

In addition to the theme document in devzone-core, there are also theme files in [Navigation Bar](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/master/packages/devzone-core/src/NavigationBar/presentational.js), [abtesting](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/master/guest-apps/abtesting/src/abtesting/theme.js), and [event-manager](https://github.ihs.demonware.net/Demonware/devzone-frontend/blob/master/guest-apps/event-manager/src/playpants/components/App/theme.ts).

#### Class override

Style overrides should be done by the `classes` prop. The previous [example](#styling) shows how to override styles using the `classes` prop.

This method ensures that there are no application order issues on the passed classes. The [Material UI documentation](https://v3.material-ui.com/customization/overrides/#overriding-with-classes) goes into more detail.

This is done to ensure that there are no issues with the order of styles via the `className` prop when the app is compiled.

The following:

```
import classNames from 'classnames';
const MyComponent = { classNameProp } => <div className={classNames('globalClass', classNameProp)}>
```

will not have the same application order when the application compiles for production build. In fact, the global class will get applied after the classnameProp class, overwritting the previus styles.

### Legacy global styles

In general, you should avoid using global CSS to style the UI. It can lead to [problems in modern web applications](https://medium.com/seek-blog/the-end-of-global-css-90d2a4a06284).

Yet, for compatibility reasons we still have some global styles applied in some parts of the app. We use them in core components that were created before CSS modules were a thing. Also for some Ant-Design components that couldn't be overwritten otherwise.

If those styles are changed, it's recommended to move them to CSS modules or MUI styles.

### Using Web-Font Icons

Here is a comprehensive of how to implement and maintain web-font icons in the application:

#### Implement new icon

When exporting your icon, make sure that you set the Class prefix following the naming convention. The convention for new icons class name prefix is: `dw-icon-youriconnamehere`, all in lower case. So, if I want to add a timeline icon, you should set its classname as `dw-icon-timeline`.

Also, preferably ensure that the character code is not taken already by other icons, although it won't introduce an error if you do use a taken one as the character is used locally by the `.css` file to know which icon to inject.

Here is a list of the icon class names and character codes that we are currently being used:

| Icon                  | Class prefix             | Character code |
| --------------------- | ------------------------ | -------------- |
| Event Manager icon v1 | dw-icon-event-manager-v1 | e910           |
| Event Manager icon v2 | dw-icon-event-manager-v2 | e911           |
| AB Testing icon       | dw-icon-abtesting        | e900           |
| Audit Log icon        | dw-icon-audit-log        | e900           |
| WiiU logo             | dw-icon-logo-wiiu        | e900           |
| Battle.NET logo       | dw-icon-logo-bnet        | e901           |
| PlayStation logo      | dw-icon-logo-ps          | e902           |
| Steam logo            | dw-icon-logo-steam       | e903           |
| Wii logo              | dw-icon-logo-wii         | e904           |
| Xbox logo             | dw-icon-logo-xbox        | e905           |

In order to add a new font, copy the files of the exported SVG Icon into a new folder in `devzone/themes`. The exported files must include:

- A fonts folder, including the `.svg` file and the fonts of use (`.eot`, `.ttf`, `.woff`...).
- A `index.js` file that imports the font files and the `.svg` file.
- A `.css` file that applies the styling for particular icons use cases.

#### Maintain icons

Remember that the style applied on the icon's CSS file is going to be the last one applied. That style won't be able to be overwritten on higher parts of the application. Because of that, it is recommended to use as less styling as possible in this files and apply them on other parts of the application.

If you still want to reuse an icon's style and add something on top (color, font-weight...), we suggest adding a style class with the same prefix and a extension. For instance, if the icons to reuse have the prefix `dw-icon-logo`, create a new class called `dw-icon-logo-white` in the same `.css` file, where you can override CSS properties. Just remember that the icons using that class will ALWAYS be white:

```
[class^='dw-icon-logo'],
[class*=' dw-icon-logo'] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

[class^='dw-icon-logo-white'],
[class*=' dw-icon-logo-white'] {
  color: white;
}
```

#### Typography

Devzone uses Material UI Typography where possible. Typography is primarily defined in the theme file mentioned above. In the same file there is also `baseMuiTheme` which you can define any overrides that need to be accessed later in the theme file. Like this:

```
const baseMuiTheme = createMuiTheme({
  typography: {
    body2: {
      fontSize: '0.775rem',
    },
  },
});

(later in theme object)
globalTypography: {
    '& h1:not(class^="ab")': baseMuiTheme.typography.h1,
    '& h2:not(class^="ab")': baseMuiTheme.typography.h2,
    '& h3:not(class^="ab")': baseMuiTheme.typography.h3,
    ...
}
```

To have default styles from MUI automatically applied to header elements `globalTypography` is defined as a style and is used by the devzone App component.

To use Material UI Typography in the UI, import the Typography Component from material ui and wrap any text inside. See more on [material ui docs](https://material-ui.com/api/typography/).
