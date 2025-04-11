import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostList from './components/PostList';

function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Rantz</h1>
      <PostList />
    </div>
  );
}
export default App;

