import React from 'react'
import { useRouteError } from 'react-router-dom';
// import errorImage from './assets/error.jpg'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageTitle from '../../components/PageTitle';
import errorImage from '../../assets/error.jpg'
import { Link } from 'react-router-dom';
import './ErrorPage.css'

function ErrorPage() {
    const routeError = useRouteError();
    let errorTitle = "Oops! Something went wrong";
    let errorMessage = "An unexpected error occured. Please try again."
    if(routeError){
        errorTitle = routeError.status;
        errorMessage = routeError.data;
    }

    return (
        <div className="error-container">
        <Header />
        <main className="error-main-content">
        <div className="error-content-section">
            <div className="error-page-title-wrapper">
            <PageTitle title={errorTitle} />
            </div>
            <div className="error-wrapper">
            <p className="error-message">{errorMessage}</p>
            <img
                src={errorImage}
                alt="Error"
                className="error-image"
            />
            <Link to="/home" className="error-back-button">
                Back to Home
            </Link>
            </div>
        </div>
        </main>
        <Footer />
    </div> 
  );
}

export default ErrorPage