import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components'
import { Home } from './pages/home'
import { Results } from './pages/result'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'results',
        element: <Results />,
      },
    ],
  },
])

export { router }
