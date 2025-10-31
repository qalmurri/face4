import MainRoutes from './Routes/MainRoutes'
import { Guard } from './Services/APIs/Auth/Guard';

export default function App() {
  return (
    <Guard>
      <MainRoutes />
    </Guard>
  );
}
