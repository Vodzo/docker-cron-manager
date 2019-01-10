import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from '@material-ui/core';

class ViewLogButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    logId: PropTypes.number,
    children: PropTypes.string,
  };

  handleClick = () => {
    this.props.onClick(this.props.logId);
  };

  render() {
    const {
      onClick, children, logId, ...props
    } = this.props;
    return (
      <Button {...props} onClick={this.handleClick}>
        {this.props.children}
      </Button>
    );
  }
}

export default ViewLogButton;
