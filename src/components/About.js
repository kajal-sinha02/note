import React from 'react';

const AboutPage = () => {

  const paragraphStyle = {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 400
  };

    return (
        <div className="dark bg-gray-900 text-gray-200">
            {/* Header Section */}
            {/* <header className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold" >Note Management</h1>
                    
                </div>
            </header> */}

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500 text-white py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-5xl font-bold mb-4" style={paragraphStyle}>MEMOMATE</h2>
                    <p className="text-xl mb-8">Your ultimate solution for organizing and managing notes effortlessly</p>
                    
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto p-8">
                {/* About Section */}
                <section className="mb-12">
                    <h2 className="text-4xl font-bold mb-4" style={paragraphStyle}>About Us</h2>
                    <p className="text-lg mb-4">
                        Welcome to Note Management, your number one solution for organizing and managing your notes efficiently.
                        We are dedicated to providing you with the best note-taking experience, with a focus on simplicity, user-friendly
                        design, and robust features.
                    </p>
                    <p className="text-lg">
                        Our mission is to help you capture your thoughts, ideas, and important information in a seamless and accessible manner.
                        Whether you are a student, professional, or simply someone who loves to jot down ideas, Note Management is here to help.
                    </p>
                </section>

                {/* Features Section */}
                <section className="mb-12">
                    <h2 className="text-4xl font-bold mb-4" style={paragraphStyle}>Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                            <h3 className="text-2xl font-bold mb-2" style={paragraphStyle}>Easy-to-use Interface</h3>
                            <p className="text-lg">A clean and intuitive interface to manage your notes effortlessly.</p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                            <h3 className="text-2xl font-bold mb-2" style={paragraphStyle}>Organize with Tags</h3>
                            <p className="text-lg">Use tags and categories to organize your notes efficiently.</p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                            <h3 className="text-2xl font-bold mb-2" style={paragraphStyle}>Sync Across Devices</h3>
                            <p className="text-lg">Access your notes on any device, anytime, anywhere.</p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                            <h3 className="text-2xl font-bold mb-2" style={paragraphStyle}>Secure and Private</h3>
                            <p className="text-lg">Your notes are encrypted and secure, ensuring privacy.</p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                            <h3 className="text-2xl font-bold mb-2" style={paragraphStyle}>Rich Text Editing</h3>
                            <p className="text-lg">Format your notes with our rich text editor for better readability.</p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                            <h3 className="text-2xl font-bold mb-2" style={paragraphStyle}>Collaboration</h3>
                            <p className="text-lg">Collaborate with others by sharing your notes easily.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer Section */}
            
        </div>
    );
};

export default AboutPage;
