import PropTypes from 'prop-types';
function Ellipse({top}) {
  return (
        <div className="ellipse" style={{backgroundColor: '#a82f02',borderRadius: '86.5px', height: '173px', left:'95%', position:'fixed',top:top,width:'173'}}/>
  )
}

Ellipse.propTypes = {
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  };

export default Ellipse