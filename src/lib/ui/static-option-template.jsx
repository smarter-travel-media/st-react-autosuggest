import React from "react";
export default class OptionsTemplate extends React.Component {
  render() {
      var classes = "option-value",
      optionData = this.props.data;
      if (this.props.isSelected) {
        classes += " selected-option";
      }
      return (
          <div>
              <div className={classes}>
                  {optionData}
              </div>
          </div>
      );
  }
}
OptionsTemplate.propTypes = {
  data: React.PropTypes.string,
  isSelected: React.PropTypes.bool
};
