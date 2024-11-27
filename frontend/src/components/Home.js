import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/Home.css'; // Custom CSS for additional styling

function Home() {
    const navigate = useNavigate(); // Initialize the navigation function

    const handleStartPredicting = () => {
        navigate('/signup'); // Navigate to the signup page
    };

    return (
        <div className="landing-page min-h-screen text-white flex flex-col">
            {/* Header Section */}
            <header className="header" style={{ backgroundColor: 'black' }}> {/* Black background */}
                <nav className="navbar bg-opacity-30 bg-black backdrop-blur-lg p-4 rounded-lg shadow-lg mb-8 flex justify-between">
                    {/* Logo or Title on the Left */}
                    <div className="navbar-logo text-white font-bold text-lg">
                        Backorder Vision
                    </div>
                    {/* Links on the Right */}
                    <ul className="navbar-list flex space-x-6">
                        <li className="navbar-item">
                            <a
                                href="/login"
                                className="navbar-link text-white font-semibold hover:bg-orange-500 hover:text-black transition-all duration-300 transform hover:scale-105 px-4 py-2 rounded-lg no-underline"
                            >
                                Login
                            </a>
                        </li>
                        <li className="navbar-item">
                            <a
                                href="/signup"
                                className="navbar-link text-white font-semibold hover:bg-orange-500 hover:text-black transition-all duration-300 transform hover:scale-105 px-4 py-2 rounded-lg no-underline"
                            >
                                Sign Up
                            </a>
                        </li>
                        <li className="navbar-item">
                            <a
                                href="/profile"
                                className="navbar-link text-white font-semibold hover:bg-orange-500 hover:text-black transition-all duration-300 transform hover:scale-105 px-4 py-2 rounded-lg no-underline"
                            >
                                Profile
                            </a>
                        </li>

                    </ul>
                </nav>
                <div className="text-center mt-8">
                    <h1 className="title text-5xl font-extrabold drop-shadow-lg">
                        Welcome to the Backorder Vision
                    </h1>
                    <p className="subtitle mt-4 text-lg text-gray-300">
                        Predict and manage your inventory effectively with ease
                    </p>
                </div>
            </header>

            {/* Main Content Section */}
            <main className="main-content flex-grow">
                {/* Call-to-Action Section */}
                <section
                    className="call-to-action p-8 text-center rounded-lg shadow-lg"
                    style={{
                        backgroundColor: '#FF5722', // Orange background
                    }}
                >
                    <h2 className="cta-title text-3xl font-bold mb-4 text-white">Get Started Today</h2>
                    <p className="cta-description text-gray-200 text-lg mb-6">
                        Join us in optimizing your supply chain management and make data-driven decisions.
                    </p>
                    <button
                        onClick={handleStartPredicting}
                        className="cta-button px-6 py-3 bg-yellow-400 text-purple-900 font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300"
                    >
                        Get Started
                    </button>
                </section>
                {/* Features Section */}
                <section className="features p-8 text-center" style={{ backgroundColor: '#FF5722' }}> {/* Orange background */}
                    <h2 className="feature-title text-3xl font-bold mb-6 text-white">Our Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="feature-item p-6 bg-white bg-opacity-20 rounded-lg shadow-lg hover:bg-opacity-30 transition-all duration-300 text-black">
                            <img
                                src="Photo1.jpeg" // Replace with actual image path
                                alt="Accurate Predictions"
                                className="feature-image w-20 h-20 mx-auto"
                            />
                            <p className="mt-4 font-semibold">Accurate Backorder Predictions</p>
                            <p className="text-sm mt-2">
                                AI-driven insights to forecast backorders effectively.
                            </p>
                        </div>
                        <div className="feature-item p-6 bg-white bg-opacity-20 rounded-lg shadow-lg hover:bg-opacity-30 transition-all duration-300 text-black">
                            <img
                                src="Photo2.png" // Replace with actual image path
                                alt="Real-Time Tracking"
                                className="feature-image w-20 h-20 mx-auto"
                            />
                            <p className="mt-4 font-semibold">Real-Time Inventory Tracking</p>
                            <p className="text-sm mt-2">
                                Monitor inventory levels to stay ahead of demand.
                            </p>
                        </div>
                        <div className="feature-item p-6 bg-white bg-opacity-20 rounded-lg shadow-lg hover:bg-opacity-30 transition-all duration-300 text-black">
                            <img
                                src="Photo3.png" // Replace with actual image path
                                alt="User Interface"
                                className="feature-image w-20 h-20 mx-auto"
                            />
                            <p className="mt-4 font-semibold">User-Friendly Interface</p>
                            <p className="text-sm mt-2">
                                Intuitive design for seamless user experience.
                            </p>
                        </div>
                        <div className="feature-item p-6 bg-white bg-opacity-20 rounded-lg shadow-lg hover:bg-opacity-30 transition-all duration-300 text-black">
                            <img
                                src="Photo4.jpeg" // Replace with actual image path
                                alt="Prediction History"
                                className="feature-image w-20 h-20 mx-auto"
                            />
                            <p className="mt-4 font-semibold">Comprehensive Prediction History</p>
                            <p className="text-sm mt-2">
                                Detailed logs for informed decision-making.
                            </p>
                        </div>
                    </div>
                </section>


            </main>

            {/* Footer Section */}
            <footer className="footer text-center py-2 pt-3 bg-gray-900">
                <p className="footer-text text-gray-300 text-sm">
                    &copy; Backorder Vision - 2024. All rights reserved.
                </p>
            </footer>
        </div>
    );
}

export default Home; 
