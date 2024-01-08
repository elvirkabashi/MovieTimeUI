import { FaStar } from "react-icons/fa";
import PropTypes from 'prop-types';

const RatingDisplay = ({ rate }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          size={18}
          style={{
            color: i <= rate ? "yellow" : "gray",
            cursor: "pointer",
            margin: "0 2px",
          }}
        />
      );
    }
    return stars;
  };

  return <div>{renderStars()}</div>;
};

RatingDisplay.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default RatingDisplay;
