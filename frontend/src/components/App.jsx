import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ChatPage from './ChatPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import NotFoundPage from './NotFoundPage';
import ChatHeader from './ChatHeader.jsx';
import PrivateRoute from './PrivateRoute';
import AuthProvider from './AuthProvider';

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <ChatHeader />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<ChatPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
