import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import PageTitle from './components/PageTitle';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return  (
      <Routes>
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | SkywardLease" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | SkywardLease" />
              <SignUp />
            </>
          }
        />
    </Routes>
    
  );
}

export default App;
