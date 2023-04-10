import { Routes, Route, useMatch, Outlet } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import PrivateRoute from "./PrivateRoute";
import Login from "../Pages/Auth/Login";
import Home from "../Pages/Home/Index";
import routes from "./routes";
import ContactUs from "../Pages/ContactUs/Index";
import Signup from "../Pages/Auth/Signup";
import MarketPlace from "../Pages/MarketPlace/Index";
import ProductDetail from "../Pages/ProductDetail/Index";
import Wishlist from "../Pages/Wishlist/Index";
import ViewToken from "../Components/ViewToken";
import ListItem from "../Components/ListItem";

export default function Router() {
  const match = useMatch(window.location.pathname);

  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.contact} element={<ContactUs />} />
      {/* <Route path={routes.marketPlace.index} exact element={<PrivateRoute><Outlet /></PrivateRoute>}>
        <Route path={routes.marketPlace.productDetail} exact element={<ProductDetail />}></Route>
      </Route> */}
      <Route path={routes.marketPlace.index} element={<MarketPlace />} />
      <Route path={routes.wishlist} element={<Wishlist />} />
      <Route path={`${routes.marketPlace.index}/:id`} element={<ProductDetail />} />
      <Route path={routes.login} element={<AuthGuard><Login /></AuthGuard>} />
      <Route path={routes.signup} element={<AuthGuard><Signup /></AuthGuard>} />
      <Route path={routes.buyTokens} element={<ViewToken/>}/>
      <Route path={routes.listItem} element={<ListItem/>}/>
    </Routes>
  );
}