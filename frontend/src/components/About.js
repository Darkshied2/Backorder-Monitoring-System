import React from 'react';
// import Navbar from './Navbar';

const About = () => {
  return (
    <div className="min-h-screen text-white flex flex-col">
      <header className="header" style={{ backgroundColor: 'black' }}>
        <nav className="navbar bg-opacity-30 bg-black backdrop-blur-lg p-4 rounded-md shadow-lg flex justify-between">
          {/* Logo or Title on the Left */}
          <div className="navbar-logo text-white font-bold text-lg"><a href="/">
          Backorder Vision
          </a>
          </div>
          {/* Links on the Right */}
          <ul className="navbar-list flex space-x-6">
            {/* <li className="navbar-item">
              <a
                href="/challenge"
                className="navbar-link text-white font-semibold hover:bg-orange-500 hover:text-black transition-all duration-300 transform hover:scale-105 px-4 py-2 rounded-lg no-underline"
              >
                Challenge
              </a>
            </li> */}
          </ul>
        </nav>
      </header>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-10 text-black">About Our Project</h1>

        {/* Project Overview Section */}
        <section className="mb-12 p-6 bg-orange-500 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
          <p className="text-gray-200 leading-relaxed">
            Our Backorder Prevention System leverages machine learning algorithms to help businesses proactively manage their inventory and prevent backorders. By analyzing historical data and predicting future demand, our solution enables companies to maintain optimal stock levels, reduce stockouts, and improve customer satisfaction.
          </p>
        </section>

        {/* Why Backorder Prevention Section */}
        <section className="mb-12 p-6 bg-orange-500 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Why Backorder Prevention?</h2>
          <p className="text-gray-200 leading-relaxed">
            Backorders can lead to customer dissatisfaction and revenue loss. Our project aims to address these challenges by using predictive analytics to forecast demand accurately and recommend the ideal inventory levels. This helps businesses avoid missed sales opportunities, reduce operational costs, and enhance customer loyalty.
          </p>
        </section>

        {/* How It Works Section */}
        <section className="mb-12 p-6 bg-orange-500 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <p className="text-gray-200 leading-relaxed">
            Using machine learning models, our system analyzes data such as historical sales, seasonality, and trends to predict demand. With this information, it can alert businesses about potential inventory issues and recommend replenishment actions. This proactive approach ensures that businesses stay prepared, even during peak demand periods.
          </p>
        </section>

        {/* Key Features Section */}
        <section className="mb-12 p-6 bg-orange-500 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-gray-200">
            <li className="mb-2">Predicting the backorder</li>
            <li className="mb-2">Inventory optimization</li>
            <li className="mb-2">Quick user-admin interaction</li>
            <li className="mb-2">Enhanced reporting and analytics</li>
          </ul>
        </section>

        {/* Our Mission Section */}
        <section className="mb-12 p-6 bg-orange-500 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-200 leading-relaxed">
            Our mission is to empower businesses with the tools they need to avoid backorders and optimize their inventory management processes. By leveraging the latest advancements in machine learning, we aim to provide businesses with actionable insights that drive efficiency and improve customer satisfaction.
          </p>
        </section>

        {/* Developer Section */}
        <section className="bg-gray-100 p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Meet the Developers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-200 to-blue-300 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105">
              <img
                src="Harsh.jpg"
                alt="Developer 1"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white object-fill"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">Harsh Kumar</h3>
              <p className="text-center text-gray-600 text-sm italic">Full Stack Developer</p>
            </div>
            <div className="bg-gradient-to-br from-blue-200 to-blue-300 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105">
              <img
                src="kashish.jpg"
                alt="Developer 2"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">Kashish Singh</h3>
              <p className="text-center text-gray-600 text-sm italic">Machine Learning Engineer</p>
            </div>
            <div className="bg-gradient-to-br from-blue-200 to-blue-300 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105">
              <img
                src="Asees.jpg"
                alt="Developer 3"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white object-fit"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">Kashish Singh</h3>
              <p className="text-center text-gray-600 text-sm italic">UI/UX Designer</p>
            </div>
            <div className="bg-gradient-to-br from-blue-200 to-blue-300 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105">
              <img
                src="anshu.jpg"
                alt="Developer 4"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white"
              />
              <h3 className="text-xl font-semibold text-gray-800 text-center">Anshu Srivastava</h3>
              <p className="text-center text-gray-600 text-sm italic">Data Scientist</p>
            </div>
          </div>
        </section>
      </div>
      <footer className="footer text-center py-2 pt-3 bg-gray-900">
        <p className="footer-text text-gray-300 text-sm">
          &copy; Backorder Vision - 2024. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default About;
