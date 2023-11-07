import React from "react";
import PropTypes from "prop-types";
import hole from "../assets/hole.png";
import rabbit from "../assets/rabbit.png";
import mole from "../assets/mole.png";

const Mole = ({ type, onClick }) => (
  <img
    onClick={onClick}
    className="mole"
    src={type === "hole" ? hole : type === "rabbit" ? rabbit : mole}
    alt="mole"
    data-testid={type}
  />
);

Mole.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Mole;
