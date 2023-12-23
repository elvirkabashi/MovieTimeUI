
function Footer() {
  return (
    <div className="cotainer-fluid" style={{backgroundColor: '#A73911',marginTop: 'auto'}}>
      <div className="container d-flex flex-column justify-content-center py-3 px-5">
        <div>
            <ul className="d-flex flex-wrap gap-3 justify-content-center list-unstyled text-center">
              <li className="text-white">Lorem</li>
              <li className="text-white">Lorem</li>
              <li className="text-white">Lorem</li>
              <li className="text-white">Lorem</li>
              <li className="text-white">Lorem</li>
            </ul>
        </div>
        <div className="d-flex gap-3 justify-content-center">
          <div className="text-white"><h3 className="bi bi-linkedin"></h3></div>
          <div className="text-white"><h3 className="bi bi-twitter"></h3></div>
          <div className="text-white"><h3 className="bi bi-facebook"></h3></div>
          <div className="text-white"><h3 className="bi bi-instagram"></h3></div>
        </div>
        <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }}/>
        <div className="text-white d-flex justify-content-center">
          <p>Movie Time &copy;2023</p>
        </div>
      </div>
    </div>
  )
}

export default Footer