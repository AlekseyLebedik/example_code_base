import React, { Component } from 'react';

import { hasData } from 'dw/core/helpers/object';
import { getColor } from 'dw/devzone/components/Graph/selectors';
import { TOTAL_COLOR } from 'dw/devzone/components/Graph/constants';

import GraphContainerStateless from './presentational';
import { buildSeries } from './selectors';

class GraphContainer extends Component {
  state = {
    series: null,
    visibility: null,
    colors: null,
  };

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    if (state.series === null && props.series) {
      newState.series = [...props.series];
      newState.visibility = {};
      newState.colors = {};
      props.series.forEach((s, idx) => {
        newState.visibility[s.id] = s.visible === undefined ? true : s.visible;
        if (s.color) {
          newState.colors[s.id] = s.color;
        } else {
          newState.colors[s.id] =
            s.id === 'total'
              ? TOTAL_COLOR
              : getColor({ idx, name: s.short || s.name || s.id });
        }
      });
    }
    if (hasData(newState)) {
      return newState;
    }
    return null;
  }

  charts = [];

  chartRef = el => {
    this.charts.push(el);
  };

  printGraphs = () => {
    const origDisplay = [];
    const origParent = [];
    const { body } = document;
    const { childNodes } = body;
    const origBodyClassName = body.className;

    body.className = 'print';

    // hide all body content
    childNodes.forEach((node, i) => {
      if (node.nodeType === 1) {
        origDisplay[i] = node.style.display;
        // eslint-disable-next-line
        node.style.display = 'none';
      }
    });

    // put the charts back in
    this.charts.forEach((chart, i) => {
      origParent[i] = chart.parentNode;
      body.appendChild(chart);
    });

    // print
    window.print();

    // allow the browser to prepare before reverting
    setTimeout(() => {
      body.className = origBodyClassName;
      // put the charts back in
      this.charts.forEach((chart, i) => {
        origParent[i].appendChild(chart);
      });

      // restore all body content
      childNodes.forEach((node, i) => {
        if (node.nodeType === 1) {
          // eslint-disable-next-line
          node.style.display = origDisplay[i];
        }
      });
    }, 500);
  };

  toggleSeries = id => {
    this.setState(prevState => {
      const visibility = { ...prevState.visibility };
      if (id !== undefined) {
        visibility[id] = !visibility[id];
      } else {
        const newValue = !Object.values(visibility).every(v => v);
        Object.keys(visibility).forEach(k => {
          visibility[k] = newValue;
        });
      }
      return { visibility };
    });
  };

  render() {
    return (
      <GraphContainerStateless
        {...this.props}
        series={buildSeries(this.state)}
        toggleSeries={this.toggleSeries}
        chartRef={this.chartRef}
        printGraphs={this.printGraphs}
      />
    );
  }
}

export default GraphContainer;
