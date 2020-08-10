import React from "react";
import PropTypes from "prop-types";

const InfoCard = (props) => {
  const { colorClass, title, number, icon } = props;
  return (
    <div className="col-md-4 mb-4">
      <div className={`card ${colorClass} shadow h-100 py-2`}>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div
                className={`text-xs font-weight-bold text-${colorClass} text-uppercase mb-1`}
              >
                {title}
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                {number}
              </div>
            </div>
            <div className="col-auto">
              <i className={`fas ${icon} fa-2x text-gray-300`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

InfoCard.defaultProps = {
  colorClass: "border-left-primary",
  icon: "fa-user",
  title: "",
  number: "33333",
};

export default InfoCard;
