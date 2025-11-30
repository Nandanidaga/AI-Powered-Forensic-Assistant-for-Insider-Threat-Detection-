import React, { useState } from 'react';
import {
  FiUpload,
  FiCpu,
  FiFileText,
  FiShield,
  FiAlertTriangle,
  FiGitBranch,
  FiTrendingUp,
  FiShare2,
  FiLayers
} from 'react-icons/fi';

const App = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/json") {
      setFile(selectedFile);
      setResults([]);
      setError('');
    } else {
      setFile(null);
      setError('Please upload a valid .json file.');
    }
  };

  const handlePredict = async () => {
    if (!file) {
      setError('Please upload a file first.');
      return;
    }

    setIsLoading(true);
    setResults([]);
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);

        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || 'Backend Error: Could not get prediction.');
        }

        const predictionResults = await response.json();
        setResults(predictionResults);
      } catch (err) {
        setError(`An error occurred: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Failed to read the file.');
      setIsLoading(false);
    };
  };

  const models = [
    { name: 'Random Forest', accuracy: '98.981%', icon: <FiGitBranch /> },
    { name: 'Gradient Boosting', accuracy: '98.924%', icon: <FiTrendingUp /> },
    { name: 'Multi-Layer Perceptron', accuracy: '99.017%', icon: <FiShare2 /> },
    { name: 'Stacking Ensemble', accuracy: '99.017%', icon: <FiLayers /> },
  ];

  const features = [
    { name: 'Suspicious Behavior Detection', description: 'Analyzes logs for unusual file access, after-hours logins, and more.', icon: <FiFileText /> },
    { name: 'Anomaly Detection', description: 'Identifies deviations from normal communication patterns and user activities.', icon: <FiCpu /> },
    { name: 'Automated Forensic Reports', description: 'Generates human-readable summaries and contextual alerts for quick responses.', icon: <FiShield /> }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans antialiased">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <FiShield className="text-3xl text-blue-500" />
            <h1 className="text-2xl font-bold tracking-wider">SysSecura AI</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#demo" className="hover:text-blue-400 transition-colors">Demo</a>
            <a href="#models" className="hover:text-blue-400 transition-colors">Models</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 text-center">
        <h2 className="text-5xl font-extrabold mb-4 leading-tight">AI-Powered Forensic Assistant</h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
          Detect and analyze insider threats with cutting-edge machine learning. Proactively secure your organization's sensitive data before it's too late.
        </p>
        <a href="#demo" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105">
          Try the Demo
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-16">Why SysSecura AI?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                <div className="text-5xl text-blue-400 mx-auto mb-4">{feature.icon}</div>
                <h4 className="text-2xl font-bold mb-2">{feature.name}</h4>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-12">Live Threat Detection Demo</h3>
          <div className="bg-gray-800 p-8 rounded-lg max-w-4xl mx-auto shadow-2xl">
            <div className="mb-6">
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center bg-gray-700 p-10 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 transition-colors">
                <FiUpload className="text-5xl text-gray-500 mb-3" />
                <span className="text-lg font-semibold">{file ? `Selected: ${file.name}` : 'Click to Upload a JSON Log File'}</span>
                <span className="text-sm text-gray-400 mt-1">Maximum file size: 5MB</span>
              </label>
              <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" accept=".json" />
            </div>

            {error && <p className="text-red-500 my-4 text-center bg-red-900/20 p-3 rounded-md">{error}</p>}

            <div className="text-center">
              <button
                onClick={handlePredict}
                disabled={isLoading || !file}
                className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-12 rounded-full text-lg transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none transform hover:scale-105"
              >
                {isLoading ? 'Analyzing...' : 'Detect Threats'}
              </button>
            </div>
          </div>

          {results.length > 0 && (
            <div className="mt-12 max-w-4xl mx-auto">
              <h4 className="text-3xl font-bold mb-4">Analysis Results</h4>
              <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="p-4 font-semibold">User</th>
                        <th className="p-4 font-semibold">PC</th>
                        <th className="p-4 font-semibold">Size</th>
                        <th className="p-4 font-semibold">Attachments</th>
                        <th className="p-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index} className={`border-t border-gray-700 ${result.anomaly === 1 ? 'bg-red-900/30' : ''}`}>
                          <td className="p-4">{result.user}</td>
                          <td className="p-4">{result.pc}</td>
                          <td className="p-4">{result.size}</td>
                          <td className="p-4">{result.attachments}</td>
                          <td className={`p-4 font-bold ${result.anomaly === 1 ? 'text-red-400' : 'text-green-400'}`}>
                            <div className="flex items-center space-x-2">
                              {result.anomaly === 1 ? <FiAlertTriangle /> : <FiShield />}
                              {/* MODIFICATION HERE: Display the specific status message from the API */}
                              <span>{result.status}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="models" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold text-center mb-16">Powered by Advanced AI Models</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {models.map((model, index) => (
              <div key={index} className="bg-gray-800 p-8 rounded-lg text-center shadow-lg flex flex-col items-center justify-start transform hover:-translate-y-2 transition-transform duration-300">
                <div className="text-6xl text-blue-400 mb-5 h-16 flex items-center">{model.icon}</div>
                <h4 className="text-2xl font-bold mb-2">{model.name}</h4>
                <p className="text-lg text-green-400 font-semibold">{model.accuracy} Accuracy</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 border-t border-gray-800">
        <p>© {new Date().getFullYear()} SysSecura AI. All Rights Reserved.</p>
        <p className="mt-1">An AI-Powered Forensic Assistant by Nandani Daga.</p>
      </footer>
    </div>
  );
};

export default App;