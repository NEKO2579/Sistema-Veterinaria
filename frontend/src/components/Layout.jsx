import NavigationBar from "./navigation/Navbar";
import Footer from "./navigation/Footer";


function Layout({ children }) {
  return (
    <main className="layout-container" style={{ height: "400px" }}>
      <NavigationBar />
      {children}
      <Footer />
    </main>
  );
}

export default Layout;
