import { useRoutes } from 'react-router-dom';
import { routes } from './routes/Route';
import Footer from './components/Footer';

function App() {
  const element = useRoutes(routes);
  return (
    <>
       <div className="flex flex-col min-h-screen">
      {/* Page content */}
      <main className="flex-1 flex justify-center items-center">
        {element}
      </main>

      {/* Footer at bottom */}
      <Footer />
    </div>

    </>
  );
}

export default App;
