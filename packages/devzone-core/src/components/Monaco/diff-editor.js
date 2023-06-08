import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';

const Diff = require('diff');

const { monaco } = window;

const useStyles = makeStyles(theme => ({
  diffEditor: props => ({
    width: `${props.width}px`,
    height: `${props.height}px`,
    position: 'relative',
  }),
  diffActions: {
    display: 'flex',
    alignItems: 'center',
    '& div:last-child': {
      marginLeft: theme.spacing(2),
    },
    '& strong': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
}));

const handleDiffOnly = (original, modified) => {
  try {
    const diff = Diff.diffLines(original, modified);
    const diffOnly = diff.reduce(
      (acc, change) => {
        if (change.added) return { ...acc, new: acc.new.concat(change.value) };
        if (change.removed)
          return { ...acc, old: acc.old.concat(change.value) };
        let hidden = change.count;
        if (change.value.includes('{\n')) hidden -= 1;
        if (change.value.includes('\n}')) hidden -= 1;
        let value = '';
        if (hidden > 10) {
          let prefix = '';
          let suffix = '';
          if (change.value[0] !== '{') {
            prefix = change.value.substring(0, change.value.indexOf('\n') + 1);
          }
          if (change.value[change.value.length - 1] !== '}') {
            suffix = change.value.substring(
              change.value
                .substring(0, change.value.length - 2)
                .lastIndexOf('\n') + 1,
              change.value.length
            );
          }
          value = prefix
            .concat(
              `  //\n  // ${
                hidden - (suffix ? 1 : 0) - (prefix ? 1 : 0)
              } lines hidden\n  //\n`
            )
            .concat(suffix);
        } else {
          value = change.value;
          if (value[0] === '{') {
            value = value.substring(1);
          }
          if (value[value.length - 1] === '}') {
            value = value.substring(0, value.length - 1);
          }
        }
        return {
          old: acc.old.concat(value),
          new: acc.new.concat(value),
        };
      },
      { old: '', new: '' }
    );
    return {
      old: `${'{\n'}${diffOnly.old}${'}'}`,
      new: `${'{\n'}${diffOnly.new}${'}'}`,
    };
  } catch (e) {
    return null;
  }
};

const MonacoDiffEditor = ({
  language,
  originalEditable,
  originalText,
  modifiedText,
  height,
  width,
  diffActionsProps,
}) => {
  const [initialized, setInitialized] = useState(false);
  const navigatorRef = useRef(null);
  const diffEditor = useRef(null);
  const classes = useStyles({ height, width });
  const divEl = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(1);
  const [diffOnly, setDiffOnly] = useState(true);
  const navigate = useCallback(direction => () => {
    if (direction === 'next') navigatorRef.current.next();
    else navigatorRef.current.previous();
    setTimeout(() => setCurrentIdx(navigatorRef.current.nextIdx + 1), 200);
  });
  const [original, modified] = useMemo(() => {
    if (!diffOnly) return [originalText, modifiedText];
    const result = handleDiffOnly(originalText, modifiedText);
    return result ? [result.old, result.new] : [originalText, modifiedText];
  }, [originalText, modifiedText, diffOnly]);

  useEffect(() => {
    if (divEl.current) {
      diffEditor.current = monaco.editor.createDiffEditor(divEl.current, {
        originalEditable, // for left panel
        readOnly: true, // for right panel
        autoClosingOvertype: 'auto',
        wordWrap: 'on',
        fontSize: 12,
      });
    }
    return () => diffEditor.current.dispose();
  }, []);

  useEffect(() => {
    if (navigatorRef.current) navigatorRef.current.dispose();
    setInitialized(false);
    const originalModel = monaco.editor.createModel(original, language);
    const modifiedModel = monaco.editor.createModel(modified, language);
    diffEditor.current.setModel({
      original: originalModel,
      modified: modifiedModel,
    });
    navigatorRef.current = monaco.editor.createDiffNavigator(
      diffEditor.current,
      {
        followsCaret: true, // resets the navigator state when the user selects something in the editor
        ignoreCharChanges: true, // jump from line to line
      }
    );
    setTimeout(() => {
      if (navigatorRef.current.canNavigate()) {
        setInitialized(true);
        setCurrentIdx(navigatorRef.current.nextIdx + 1);
      }
    }, 1000);
    return () => navigatorRef.current.dispose();
  }, [original, modified, language, setInitialized, setCurrentIdx]);
  return (
    <div ref={divEl} className={classes.diffEditor}>
      <div className={cn(diffActionsProps.className, classes.diffActions)}>
        {initialized && navigatorRef.current && (
          <>
            Change <strong>{currentIdx}</strong> of{' '}
            <strong>{navigatorRef.current.ranges.length}</strong>
          </>
        )}
        <Tooltip title="Jump to previous change">
          <span>
            <IconButton onClick={navigate('previous')} disabled={!initialized}>
              <Icon>skip_previous</Icon>
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Jump to next change">
          <span>
            <IconButton onClick={navigate('next')} disabled={!initialized}>
              <Icon>skip_next</Icon>
            </IconButton>
          </span>
        </Tooltip>
        <div className="flex items-center">
          <Switch
            checked={diffOnly}
            onChange={() => setDiffOnly(!diffOnly)}
            color="primary"
            name="viewSwitch"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          Hide un-changed lines
        </div>
      </div>
    </div>
  );
};

MonacoDiffEditor.propTypes = {
  language: PropTypes.string,
  originalEditable: PropTypes.bool,
  originalText: PropTypes.string,
  modifiedText: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  diffActionsProps: PropTypes.shape({
    className: PropTypes.string,
  }),
};
MonacoDiffEditor.defaultProps = {
  language: 'text',
  originalEditable: true,
  originalText: '',
  modifiedText: '',
  height: 300,
  width: 300,
  diffActionsProps: {},
};

export default MonacoDiffEditor;
