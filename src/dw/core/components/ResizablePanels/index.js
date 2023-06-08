/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import styles from './index.module.css';

const SNAP_MIN_SIZE = 10;

class ResizablePanels extends React.Component {
  state = {
    isDragging: false,
    panels: this.props.sizes,
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.resizePanel);
    document.addEventListener('mouseup', this.stopResize);
    document.addEventListener('mouseleave', this.stopResize);
  }

  // Check for updated `sizes` parameters and update the appropriate state
  componentDidUpdate(prevProps) {
    // If the caller updated the parameters
    if (!isEqual(prevProps.sizes, this.props.sizes)) {
      // Set the panels parameter according to the updated sizes
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ panels: this.props.sizes });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.resizePanel);
    document.removeEventListener('mouseup', this.stopResize);
    document.removeEventListener('mouseleave', this.stopResize);
  }

  /*  onTogglePanel is used to expand or collapse the panel. If panel has a size value it will set it to 0
  or if it is 0 it sets it to initial size  */
  onTogglePanel = index => {
    this.setState(({ panels }) => {
      const newPanels = panels.map((panel, i) => {
        const newPanel = { ...panel };
        if (i === index) {
          newPanel.size = panel.size === 0 ? this.props.sizes[index].size : 0;
        }
        return newPanel;
      });
      return {
        panels: newPanels,
      };
    });
  };

  /* resizeWidth checks if panels[currentPanel] exists
     and if it does take the size property and add delta to check if its greater than 0. If yes set the panel width
     to panels[currentPanel].size + delta otherwise set it to 0.
  */
  resizeWidth = (panels, currentPanel, delta) => {
    const panelWidth =
      ((panels[currentPanel] && panels[currentPanel].size) || 0) + delta > 0
        ? panels[currentPanel] && panels[currentPanel].size + delta
        : 0;
    return panelWidth;
  };

  /* stopResize is used to set isDragging to false and reset currentPanel and delta */
  stopResize = () => {
    this.setState({
      isDragging: false,
      delta: 0,
      currentPanel: null,
    });
  };

  /* startResize sets isDragging to true and sets the values of currentPanel and initial position  */
  startResize = (event, index) => {
    this.setState({
      isDragging: true,
      currentPanel: index,
      initialPos: event.screenX,
    });
  };

  resizePanel = event => {
    this.setState(({ panels, currentPanel, initialPos, isDragging }) => {
      if (!isDragging) {
        return {};
      }
      const delta = event.screenX - initialPos;

      const currentPanelWidth = this.resizeWidth(panels, currentPanel, delta);

      /* If is dragging to the left and it reaches the minSize
        or SNAP_MIN_SIZE it will resize to 0 and stop dragging */
      if (
        delta < 0 &&
        (currentPanelWidth < SNAP_MIN_SIZE ||
          (panels[currentPanel].min > 0 &&
            currentPanelWidth < panels[currentPanel].min))
      ) {
        return {
          isDragging: false,
          delta: 0,
          initialPos: event.screenX,
          panels: Object.assign([...panels], {
            [currentPanel]: { ...panels[currentPanel], size: 0 },
          }),
        };
      }
      /* If the current panel width is greater than the max width
     of the panel defined we set the panel width to max panel width
     and stop the dragging. */
      if (panels[currentPanel].max < currentPanelWidth) {
        return {
          delta: 0,
          isDragging: false,
          panels: Object.assign([...panels], {
            [currentPanel]: {
              ...panels[currentPanel],
              size: panels[currentPanel].max,
            },
          }),
        };
      }

      /* If none of the above conditions are met we set the currentPanelWidth,
       delta and then initial position  */
      return {
        delta,
        initialPos: event.screenX,
        panels: Object.assign([...panels], {
          [currentPanel]: {
            ...panels[currentPanel],
            size: currentPanelWidth,
          },
        }),
      };
    });
  };

  render() {
    const rest = this.props.children.slice(0, this.props.children.length - 1);
    return (
      <div className={styles.mainContainer}>
        <div
          className={styles.panelContainer}
          onMouseUp={() => this.stopResize()}
        >
          {[
            ...rest.map((child, i) => [
              <div
                key={`panel_${i}`}
                className={classNames(styles.panel, this.props.classes.panel)}
                style={{
                  width: this.state.panels[i].size,
                  maxWidth: this.props.sizes[i].max,
                }}
              >
                <div
                  style={{
                    minWidth: this.props.sizes[i].min,
                  }}
                >
                  {child}
                </div>
              </div>,
              <div
                onMouseDown={e => this.startResize(e, i)}
                key={`resizer_${i}`}
                className={classNames(
                  styles.resizer,
                  this.props.classes.resizer
                )}
                onDoubleClick={() => this.onTogglePanel(i)}
              >
                {this.state.panels[i].size === 0 && this.props.titles[i] && (
                  <div className={styles.panelTitle}>
                    {this.props.titles[i]}
                  </div>
                )}
                <Icon className={styles.drag}>drag_indicator</Icon>
              </div>,
            ]),
          ]}
          <div
            className={styles.panel}
            style={{
              width: `calc(100% ${this.state.panels
                .slice(0, this.props.children.length - 1)
                .map(x => ` - ${x.size}px`)
                .join(' ')})`,
            }}
          >
            {this.props.children[this.props.children.length - 1]}
          </div>
        </div>
      </div>
    );
  }
}

ResizablePanels.propTypes = {
  sizes: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.number,
      max: PropTypes.number,
      min: PropTypes.number,
    })
  ),
  titles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  classes: PropTypes.object,
};

ResizablePanels.defaultProps = {
  sizes: [
    {
      size: 300,
      max: 300,
      min: 0,
    },
  ],
  titles: [],
  classes: {},
};

export default ResizablePanels;
