import React from "react";

import CloseCircleOutlineIcon from 'node_modules/mdi-react/CloseCircleOutlineIcon';
import PencilCircleOutlineIcon from 'node_modules/mdi-react/PencilCircleOutlineIcon';

import "./Display.scss";

export default class Display extends React.Component {
  constructor (){
    super();
  }

  handleSelect(id) {
    this.props.handleSelect(id);
  }

  render() {
    let classes = "display";
    if( this.props.target == this.props.id ){
      classes += " target";
    }

    let styles = {};

    if( this.props.media.type && this.props.media.type.startsWith("image") ) {
      styles.backgroundImage = 'url('+ this.props.media.thumbnail + ')'
    }

    return (
        <div
          styleName={classes}
          style={styles}
        >
          <div styleName="overlay" onClick={() => this.handleSelect(this.props.id)}>
            <div styleName="icons">
              <CloseCircleOutlineIcon styleName="icon" />
              <PencilCircleOutlineIcon styleName="icon" />
            </div>
          </div>
        </div>
    );
  }
}
