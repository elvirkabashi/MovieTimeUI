import PropTypes from 'prop-types';

function MovieTrailer({ videoUrl }) {
  var url = videoUrl;
  var parts = url.split('/');

  return (
    <iframe
      width="800" 
      height="455"
      src={`https://www.youtube.com/embed/${parts[3]}`}
      title="Trailer"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
}

MovieTrailer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default MovieTrailer;
