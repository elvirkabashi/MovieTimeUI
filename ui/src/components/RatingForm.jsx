import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};

const RatingForm = ({ movieId ,onSubmit }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [comment, setComment] = useState('');

  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = async () => {
    // Prepare the data to be sent
    const ratingData = {
      MovieId: movieId,
      Rate: currentValue,
      Comment: comment,
    };

    try {
      await axios.post('http://localhost:7147/api/ratings', ratingData);
      onSubmit();
    } catch (error) {
      // Handle errors
      console.error('Error submitting rating', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.stars}>
        {stars.map((_, index) => (
          <FaStar
            key={index}
            size={24}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
            style={{
              marginRight: 10,
              cursor: "pointer"
            }}
          />
        ))}
      </div>
      <textarea
        placeholder="What's your experience? (max char 100!)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={100}
        style={styles.textarea}
      />

      <button style={styles.button} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  }
};

RatingForm.propTypes = {
  movieId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
};

export default RatingForm;
