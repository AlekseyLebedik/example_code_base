import React from 'react';
import PropTypes from 'prop-types';

import D3BarChart from './D3BarChart';

const getBarChartConfig = () => ({
  width: (window.innerWidth || document.body.clientWidth) * 0.5,
});

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: getBarChartConfig(),
    };
    while (this.node?.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateBarChartDimensions);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.data !== this.props.data ||
      nextState.config !== this.state.config ||
      nextProps.servers !== this.props.servers
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateBarChartDimensions);
  }

  updateBarChartDimensions = () => {
    this.setState({
      config: getBarChartConfig(),
    });
  };

  onDivMount = node => {
    this.node = node;
    this.renderChart();
  };

  renderChart() {
    if (this.props.data && this.props.data.length > 0) {
      D3BarChart(
        this.props.data,
        this.state.config,
        this.props.servers
      )(this.node);
    }
  }

  render() {
    if (this.node) {
      this.renderChart();
    }
    return (
      <div className="barchart-wrapper">
        <svg ref={this.onDivMount} />
      </div>
    );
  }
}

BarChart.propTypes = {
  data: PropTypes.array,
  servers: PropTypes.object.isRequired,
};
BarChart.defaultProps = {
  data: [],
};

export default BarChart;
