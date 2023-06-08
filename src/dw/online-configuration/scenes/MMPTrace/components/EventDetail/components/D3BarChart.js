import * as d3 from 'd3';

const PING_THRESHOLD = 150;

function D3BarChart(data, config, servers) {
  const state = {
    width: !config ? 500 : config.width,
    height: 300,
    graphH: 0,
    graphW: 0,
    margin: {
      top: 10,
      right: 20,
      bottom: 120,
      left: 45,
    },
  };

  function chart(el) {
    const displayServersInfo = Object.keys(servers).length > 0;
    state.svg = d3.select(el);
    state.graphH = state.height - state.margin.top - state.margin.bottom;
    state.graphW = state.width - state.margin.left - state.margin.right;

    state.svg
      .attr('width', state.width)
      .attr('height', state.height)
      .style('font-family', 'sans-serif');

    // set the ranges
    state.xScale = d3.scaleBand().range([0, state.graphW]).padding(0.1);
    state.yScale = d3.scaleLinear().range([state.graphH, 0]);

    const axises = state.svg.append('g').attr('class', 'axises');
    axises.attr(
      'transform',
      `translate(${state.margin.left},${state.margin.top})`
    );

    state.xScale.domain(data.map(d => d.data_center));
    state.yScale.domain([0, d3.max(data, d => d.median_ping_ms) + 100]);

    // add bars and colors based on ping value
    state.svg
      .append('g')
      .attr('transform', `translate(${state.margin.left},${state.margin.top})`)
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => {
        try {
          return state.xScale(d.data_center);
        } catch (err) {
          return 0;
        }
      })
      .attr('width', state.xScale.bandwidth())
      .attr('y', d => state.yScale(d.median_ping_ms))
      .attr('height', d => state.graphH - state.yScale(d.median_ping_ms))
      .attr('fill', d =>
        d.median_ping_ms > PING_THRESHOLD ? '#FF0000' : '#00A652'
      );

    // add add ping median values
    state.svg
      .append('g')
      .attr('transform', `translate(${state.margin.left},${state.margin.top})`)
      .selectAll('.text')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr(
        'x',
        d => state.xScale(d.data_center) + state.xScale.bandwidth() / 2
      )
      .attr('y', d => state.yScale(d.median_ping_ms))
      .attr('dy', '-0.3em')
      .attr('text-anchor', 'middle')
      .text(d => (d.median_ping_ms > 0 ? d.median_ping_ms : ''));

    // add packet loss values
    state.svg
      .append('g')
      .attr('transform', `translate(${state.margin.left},${state.margin.top})`)
      .selectAll('.text')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'label packet-loss')
      .attr('fill', '#fec000')
      .attr(
        'x',
        d => state.xScale(d.data_center) + state.xScale.bandwidth() / 2
      )
      .attr('y', d => state.yScale(d.median_ping_ms))
      .attr('dy', '-1.3em')
      .attr('text-anchor', 'middle')
      .text(d => (d.percent_packet_loss > 0 ? d.percent_packet_loss : ''));

    // add packet loss label
    state.svg
      .append('text')
      .attr('class', 'label')
      .attr('fill', '#fec000')
      .attr('x', 40)
      .attr('y', 10)
      .text('Packet Loss %');

    if (displayServersInfo) {
      // add idle servers label
      state.svg
        .append('text')
        .attr('class', 'label')
        .attr('x', state.margin.left - 20)
        .attr('y', state.height - state.margin.bottom + 15)
        .text('Idle');

      // add idle servers counts
      state.svg
        .append('g')
        .attr('transform', `translate(${state.margin.left},0)`)
        .selectAll('.text')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr(
          'x',
          d => state.xScale(d.data_center) + state.xScale.bandwidth() / 2
        )
        .attr('y', state.height - state.margin.bottom + 15)
        .attr('text-anchor', 'middle')
        .text(d => {
          try {
            return servers[d.data_center].idle_servers;
          } catch (err) {
            return '-';
          }
        });

      // add allocated servers label
      state.svg
        .append('text')
        .attr('class', 'label')
        .attr('x', state.margin.left - 45)
        .attr('y', state.height - state.margin.bottom + 25)
        .text('Free Slots');

      // add allocated servers counts
      state.svg
        .append('g')
        .attr('transform', `translate(${state.margin.left},0)`)
        .selectAll('.text')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr(
          'x',
          d => state.xScale(d.data_center) + state.xScale.bandwidth() / 2
        )
        .attr('y', state.height - state.margin.bottom + 25)
        .attr('text-anchor', 'middle')
        .text(d => {
          try {
            return servers[d.data_center].free_slots;
          } catch (err) {
            return '-';
          }
        });
    }

    // add the x Axis
    axises
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${state.graphH})`)
      .call(d3.axisBottom(state.xScale).tickSize(0))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', displayServersInfo ? '-3em' : '-.8em')
      .attr('dy', displayServersInfo ? '25px' : '10px')
      .attr('transform', 'rotate(-55)');
    axises
      .append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(state.yScale).ticks(6).tickSize(0));
  }

  return chart;
}

export default D3BarChart;
