import ReactDOM from 'react-dom/client';
/* Se incorpora BS5 */
import 'bootstrap/dist/css/bootstrap.min.css';
/* Se incorporan iconos de BS5 */
import 'bootstrap-icons/font/bootstrap-icons.css';

import GastosList from './components/GastosList';

ReactDOM.createRoot(document.getElementById('root')).render(<GastosList/>);
