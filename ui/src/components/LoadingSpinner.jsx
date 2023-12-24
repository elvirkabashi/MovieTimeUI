import '../assets/css/loadingSpinner.css'

// React component
const LoadingSpinner = () => {
  return (

        <div className="loader">
            <div className="loader__filmstrip">
            </div>
            <p className="loader__text text-white">
                loading
            </p>
        </div>
  );
};

export default LoadingSpinner;
