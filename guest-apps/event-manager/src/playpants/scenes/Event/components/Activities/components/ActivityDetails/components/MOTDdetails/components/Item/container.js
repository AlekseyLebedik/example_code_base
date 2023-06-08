import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RootRef from '@material-ui/core/RootRef';

import StatelessItem from './presentational';

const initialState = {
  error: null,
  isEditable: false,
  languageInput: '',
  languageValidation: '',
  textInput: '',
};

class Item extends Component {
  static propTypes = {
    id: PropTypes.number,
    language: PropTypes.string,
    languages: PropTypes.arrayOf(PropTypes.object).isRequired,
    onUpdate: PropTypes.func.isRequired,
    text: PropTypes.string,
  };

  static defaultProps = {
    id: null,
    language: '',
    text: '',
  };

  constructor(props) {
    super(props);
    this.state = initialState;
    this.domRef = React.createRef();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick, false);
  }

  onLanguageChange = event => {
    const languageList = this.props.languages.map(a => a.language);
    const { value } = event.target;

    if (languageList.includes(value) && value !== this.props.language) {
      this.setState({
        error: true,
        languageInput: value,
        languageValidation: 'Same language exists',
      });
      return;
    }

    this.setState({
      error: null,
      languageInput: value,
      languageValidation: '',
    });
  };

  onTextChange = e => {
    this.setState({
      textInput: e.target.value,
    });
  };

  onToggle = () => {
    if (!this.state.isEditable) {
      document.addEventListener('mousedown', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('mousedown', this.handleOutsideClick, false);
    }
    this.setState(state => ({
      isEditable: !state.isEditable,
      languageInput: '',
    }));
  };

  handleOutsideClick = e => {
    if (
      this.domRef.current.contains(e.target) ||
      e.target.className.includes('MuiListItem') ||
      e.target.className.includes('MuiBackdrop')
    ) {
      return;
    }
    if (this.state.languageInput || this.state.textInput) {
      this.handleSubmit();
    }
  };

  handleRemove = () => {
    const { id, languages, onUpdate } = this.props;
    languages.splice(id, 1);

    onUpdate();
  };

  handleSubmit = () => {
    const { error, languageInput, textInput } = this.state;
    const { languages, language, text, id, onUpdate } = this.props;
    const params = {
      language: languageInput || language,
      text: textInput || text,
    };
    if (error) {
      return;
    }
    if (language) {
      languages[id] = params;
    } else if (!languageInput) {
      this.setState({
        error: true,
        languageValidation: 'Must choose a language',
      });
      return;
    } else {
      languages.push(params);
    }

    onUpdate();
    this.setState(initialState);
    document.removeEventListener('mousedown', this.handleOutsideClick, false);
  };

  render() {
    const newProps = {
      ...this.props,
      ...this.state,
      handleSubmit: this.handleSubmit,
      handleRemove: this.handleRemove,
      onLanguageChange: this.onLanguageChange,
      onTextChange: this.onTextChange,
      onToggle: this.onToggle,
    };
    return (
      <RootRef rootRef={this.domRef}>
        <StatelessItem {...newProps} />
      </RootRef>
    );
  }
}

export default Item;
