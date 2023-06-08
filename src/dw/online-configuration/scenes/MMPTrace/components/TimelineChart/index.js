import React from 'react';
import PropTypes from 'prop-types';

import D3TimelineChart from './D3TimelineChart';

import './index.css';

class TimelineChart extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.data !== this.props.data ||
      Math.abs(nextProps.config.width - this.props.config.width) > 20
    );
  }

  setRef = node => {
    this.node = node;
  };

  render() {
    D3TimelineChart(this.props.data, this.props.config)
      .startTime(this.props.startTime)
      .endTime(this.props.endTime)
      .segmentClickHandler(this.props.onSegmentClick)(this.node);
    return (
      <div className="timeline-wrapper">
        <svg ref={this.setRef} />
      </div>
    );
  }
}

TimelineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  config: PropTypes.object.isRequired,
  onSegmentClick: PropTypes.func.isRequired,
  startTime: PropTypes.number,
  endTime: PropTypes.number,
};

TimelineChart.defaultProps = {
  startTime: undefined,
  endTime: undefined,
};

export default TimelineChart;
