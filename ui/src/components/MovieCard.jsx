import noimage from '../assets/img/no-image.jpg'
import PropTypes from 'prop-types'; 

function MovieCard({title,description,publishedYear,genre,actors}) {
  return (
    <div className="card" style={{width: '18rem'}}>
    <img src={noimage} className="card-img-top" />
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
      <p>Published year: {publishedYear}</p>
      <p>Gendre: {genre}</p>
      <p>Actors: {actors.map(a => <div className="d-flex flex-row" key={a}><b>{a}</b></div>)}</p>
    </div>
  </div>
  )
}

MovieCard.propTypes = {
    title : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
    publishedYear : PropTypes.number.isRequired,
    genre : PropTypes.string.isRequired,
    actors : PropTypes.arrayOf(PropTypes.string)
}

export default MovieCard