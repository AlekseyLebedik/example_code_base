import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import download from 'downloadjs';

import AsyncComponent from 'dw/core/components/AsyncComponent';
import { makeCancelable } from 'dw/core/helpers/promise';

import { getIMPContent } from 'dw/online-configuration/services/imp';

const Monaco = AsyncComponent(() =>
  import(
    /* webpackChunkName: "MonacoEditor" */ 'dw/core/components/FormFields/Monaco'
  )
);

class ExpandedRow extends Component {
  state = {
    content: null,
    contentType: null,
    name: null,

    isLoading: true,
  };

  componentDidMount() {
    this.getIMPContentPromise = makeCancelable(
      getIMPContent(this.props.record.id)
    );
    this.getIMPContentPromise.promise.then(res =>
      this.setState({ ...res.data, isLoading: false })
    );
  }

  componentWillUnmount() {
    if (this.getIMPContentPromise) {
      this.getIMPContentPromise.cancel();
    }
  }

  handleDownload = () => {
    const { content, contentType, name } = this.state;
    download(content, name, contentType);
  };

  render() {
    if (this.state.isLoading) return null;

    const { record } = this.props;
    const { content, contentType } = this.state;

    return (
      <Card>
        <CardHeader
          title={record.md5sum}
          subtitle={`Applied by ${record.user.username}`}
        />
        <Monaco
          height={240}
          options={{
            folding: false,
            fontSize: 12,
            minimap: { enabled: false },
            readOnly: true,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            wrappingIndent: 'indent',
          }}
          language={contentType}
          value={content}
        />
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleDownload}
          >
            Download<Icon>file_download</Icon>
          </Button>
        </CardActions>
      </Card>
    );
  }
}

ExpandedRow.propTypes = {
  record: PropTypes.shape({
    id: PropTypes.number.isRequired,
    md5sum: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ExpandedRow;
