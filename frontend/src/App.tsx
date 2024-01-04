import { lazy, Suspense, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Common/NavBar.tsx";
import NotFound from "./components/Common/NotFound.tsx";
import HomePage from "./containers/HomePage.tsx";
import Footer from "./components/Common/Footer.tsx";
import { UserContext } from "./context/userContext.tsx";
import EditProfilePage from "./containers/User/EditProfilePage.tsx";

const LoginPage = lazy(() => import("./containers/User/LoginPage.tsx"));
const LogOutPage = lazy(() => import("./containers/User/LogOutPage.tsx"));
const ArticleMainPage = lazy(
  () => import("./containers/Article/ArticleMainPage.tsx"),
);
const OverviewPage = lazy(
  () => import("./containers/Article/OverviewPage.tsx"),
);
const EdittingPage = lazy(
  () => import("./containers/Article/EdittingPage.tsx"),
);
const ForumMainPage = lazy(
  () => import("./containers/Forum/ForumMainPage.tsx"),
);
const IntroductionPage = lazy(
  () => import("./containers/IntroductionPage.tsx"),
);

const ProfilePage = lazy(() => import("./containers/User/ProfilePage.tsx"));

function App() {
  const { fetchUser } = useContext(UserContext);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <div className="bg-gray-50">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LoginPage />
              </Suspense>
            }
          />

          <Route
            path="/logout"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LogOutPage />
              </Suspense>
            }
          />

          <Route
            path="/article"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ArticleMainPage />
              </Suspense>
            }
          />

          <Route
            path="/article/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <OverviewPage />
              </Suspense>
            }
          />

          <Route
            path="/article/:id/edit"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <EdittingPage />
              </Suspense>
            }
          />

          <Route
            path="/forum"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ForumMainPage />
              </Suspense>
            }
          />

          <Route
            path="/introduction"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <IntroductionPage />
              </Suspense>
            }
          />
          <Route
            path="/user/:userid"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProfilePage />
              </Suspense>
            }
          />
          <Route
            path="/user/:userid/edit"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <EditProfilePage />
              </Suspense>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App as React.FC;
