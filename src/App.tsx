
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import Article from './pages/article/Article';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<Article />} />
    </Routes>
  )
}

export default App
