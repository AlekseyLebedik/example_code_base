/* eslint-disable no-use-before-define */
import * as d3 from 'd3';

function D3TimelineChart(data, config) {
  const state = {
    width: !config ? 900 : config.width,
    height: !config ? 300 : config.height,
    svg: null,
    graph: null,
    graphH: null,
    graphW: null,
    focusHeight: null,
    margin: {
      top: 20,
      right: 50,
      bottom: 25,
      left: 20,
    },
    xScale: null,
    yScale: null,
    leftAxis: null,
    labels: [],
    flatData: [],
    zoomX: [null, null],
    lineHeight: 80,
    zColorScale: d3.scaleOrdinal([
      ...d3.schemeCategory10,
      ...d3.schemeCategory20b,
    ]),
    colorScaleKey:
      config && config.colorScaleKey ? config.colorScaleKey : 'label',
    segmentClickHandler: () => false,
    overview: {
      margin: { top: 5, right: 20, bottom: 10, left: 20 },
      height: 35,
      xScale: null,
      xAxis: null,
      brush: null,
    },
  };

  function chart(el) {
    state.svg = d3.select(el);
    state.svg.html('');

    if (data.length === 0) {
      return;
    }
    processData(data);
    setupDimensions();

    state.zoomX = [
      state.startTime || d3.min(state.flatData, d => d.timeRange[0]),
      state.endTime || d3.max(state.flatData, d => d.timeRange[1]),
    ];
    state.svg
      .attr('width', state.width)
      .attr('height', state.height)
      .style('font-family', 'sans-serif');

    const axises = state.svg.append('g').attr('class', 'axises');
    axises.attr(
      'transform',
      `translate(${state.margin.left},${state.margin.top})`
    );
    axises.append('g').attr('class', 'x-axis');
    axises.append('g').attr('class', 'x-grid');
    axises.append('g').attr('class', 'y-axis');
    axises.append('g').attr('class', 'left-axis');

    state.graph = state.svg.append('g');
    state.graph.attr(
      'transform',
      `translate(${state.margin.left},${state.margin.top})`
    );

    state.xScale = d3.scaleUtc();
    state.overview.xScale = d3.scaleUtc();
    state.yScale = d3.scalePoint();

    state.xAxis = d3.axisBottom().tickSize(0);
    state.overview.xAxis = d3.axisBottom().tickSize(0);
    state.yAxis = d3.axisRight().tickSize(0);
    state.leftAxis = d3.axisLeft().tickSize(0);

    state.xScale.domain(state.zoomX).range([0, state.graphW]).clamp(true);
    state.overview.xScale
      .domain(state.zoomX)
      .range([0, state.graphW])
      .clamp(true);
    state.xAxis.scale(state.xScale);
    state.overview.xAxis.scale(state.overview.xScale);

    state.yScale.domain(state.labels).range([0, state.graphH]).padding(0.5);
    state.yAxis.scale(state.yScale);

    state.leftAxis.scale(state.yScale).tickFormat('');

    state.svg
      .select('g.x-axis')
      .attr('transform', `translate(0,${state.graphH})`)
      .call(state.xAxis);

    state.svg.select('g.left-axis').call(state.leftAxis);

    state.svg
      .select('g.y-axis')
      .attr('transform', `translate(${state.graphW}, 0)`)
      .call(state.yAxis);

    renderSegments();
    addOverviewArea();

    function processData(rawData) {
      const labels = new Set();
      state.flatData = rawData;

      for (let i = 0; i < rawData.length; i += 1) {
        labels.add(rawData[i].label);
      }

      state.labels = Array.from(labels);
    }

    function setupDimensions() {
      state.graphH = state.labels.length * state.lineHeight;
      state.graphW = state.width - state.margin.left - state.margin.right;
      state.focusHeight = state.graphH + state.margin.top + state.margin.bottom;
      state.height = state.focusHeight + state.overview.height;
    }

    function renderSegments() {
      const focus = state.graph.append('g');
      const timelines = focus
        .selectAll('rect.series-segment')
        .data(state.flatData);

      timelines
        .enter()
        .append('rect')
        .on('click', state.segmentClickHandler)
        .attr('class', 'series-segment')
        .style('fill', d => state.zColorScale(d[state.colorScaleKey]))
        .attr('x', d =>
          Number.isNaN(state.xScale(d.timeRange[0]))
            ? 0
            : state.xScale(d.timeRange[0])
        )
        .attr('width', d =>
          d3.max([
            0,
            state.xScale(d.timeRange[1]) - state.xScale(d.timeRange[0]),
          ])
        )
        .attr('y', d => state.yScale(d.label) - state.lineHeight / 2)
        .attr('height', state.lineHeight)
        .style('fill-opacity', 0.8);
    }

    function addOverviewArea() {
      const brush = d3
        .brushX()
        .extent([
          [0, 0],
          [state.graphW, state.overview.height - state.overview.margin.bottom],
        ])
        .on('brush end', brushed);

      const zoom = d3
        .zoom()
        .scaleExtent([1, Infinity])
        .translateExtent([
          [0, 0],
          [state.graphW, state.graphH],
        ])
        .extent([
          [0, 0],
          [state.graphW, state.graphH],
        ])
        .on('zoom', zoomed);

      const context = state.svg
        .append('g')
        .attr('class', 'context')
        .attr(
          'transform',
          `translate(${state.overview.margin.left},${state.focusHeight})`
        );

      context
        .append('g')
        .attr(
          'transform',
          `translate(0,${state.overview.height - state.overview.margin.bottom})`
        )
        .call(state.overview.xAxis);

      context
        .append('g')
        .attr('class', 'brush')
        .call(brush)
        .call(brush.move, state.xScale.range());

      context
        .selectAll('rect.context-events')
        .data(state.flatData)
        .enter()
        .append('rect')
        .attr('class', 'context-events')
        .attr('opacity', 0.4)
        .attr('x', d =>
          Number.isNaN(state.xScale(d.timeRange[0]))
            ? 0
            : state.xScale(d.timeRange[0])
        )
        .attr('y', 10)
        .attr('width', d =>
          d3.max([
            0,
            state.xScale(d.timeRange[1]) - state.xScale(d.timeRange[0]),
          ])
        )
        .attr(
          'height',
          state.overview.height - state.overview.margin.bottom - 10
        )
        .attr('fill', d => state.zColorScale(d[state.colorScaleKey]));

      state.svg.call(zoom);

      function brushed() {
        // ignore brush-by-zoom
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom')
          return;
        const selection = d3.event.selection || state.overview.xScale.range();
        state.xScale.domain(
          selection.map(state.overview.xScale.invert, state.overview.xScale)
        );
        state.svg.select('.x-axis').call(state.xAxis);
        state.svg.call(
          zoom.transform,
          d3.zoomIdentity
            .scale(state.graphW / (selection[1] - selection[0]))
            .translate(-selection[0], 0)
        );
      }

      function zoomed() {
        // ignore zoom-by-brush
        if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush')
          return;
        state.xScale.domain(
          d3.event.transform.rescaleX(state.overview.xScale).domain()
        );
        state.svg.select('.x-axis').call(state.xAxis);
        state.svg
          .selectAll('rect.series-segment')
          .attr('x', d =>
            Number.isNaN(state.xScale(d.timeRange[0]))
              ? 0
              : state.xScale(d.timeRange[0])
          )
          .attr('width', d =>
            d3.max([
              0,
              state.xScale(d.timeRange[1]) - state.xScale(d.timeRange[0]),
            ])
          );
        context
          .select('.brush')
          .call(
            brush.move,
            state.xScale
              .range()
              .map(d3.event.transform.invertX, d3.event.transform)
          );
      }
    }
  }

  chart.segmentClickHandler = value => {
    if (!arguments.length) return state.segmentClickHandler();
    state.segmentClickHandler = value;
    return chart;
  };

  chart.startTime = value => {
    if (!arguments.length) return state.startTime;
    state.startTime = value;
    return chart;
  };

  chart.endTime = value => {
    if (!arguments.length) return state.endTime;
    state.endTime = value;
    return chart;
  };
  return chart;
}

export default D3TimelineChart;
