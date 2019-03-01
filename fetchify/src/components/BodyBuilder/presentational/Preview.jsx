import React from "react";
import JSONPretty from "react-json-pretty";
import { Link } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import PropTypes from "prop-types";

const Preview = props => {
  if (Object.entries(props.data).length > 0) {
    return (
      <div>
        <h2 className="home-head-title" data-test="preview-section">Preview</h2>
        <Segment color="blue">
          <Link className="ui positive fluid button" to="/data">
            Submit JSON body
          </Link>
          <JSONPretty
            id="json-pretty"
            className="ui secondary segment"
            data={props.data}
            theme={{
              main:
                "line-height:1.3;color:black;background:white;overflow-x: hidden;",
              key: "color:#b24bfc;",
              string: "color:#379926;",
              value: "color:#59a3e0;",
              boolean: "color:#e07b28;"
            }}
          />
        </Segment>
      </div>
    );
  } else {
    return null;
  }
};

Preview.defaultProps = {
  data: {}
}

Preview.propTypes = {
  data: PropTypes.object.isRequired
};

export default Preview;
