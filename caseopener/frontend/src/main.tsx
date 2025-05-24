import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = () => {
  React.useEffect(() => {
    fetch('http://localhost:4000/api/ping')
      .then(res => res.text())
      .then(console.log);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-xl">
      🎁 Case Opener: Ping to backend should appear in console!
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
