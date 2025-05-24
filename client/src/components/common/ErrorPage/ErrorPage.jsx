import { Link, useRouteError } from "react-router-dom";


const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
  
    return (
      <div id="error-page" className="text-center mt-10">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>URL {error.statusText || error.message}!</i>
        </p>
        <Link to='/'><button className="p-2 bg-cyan-900 text-white rounded-xl mt-5"> Go back</button></Link>
        
      </div>
    );
}

export default ErrorPage