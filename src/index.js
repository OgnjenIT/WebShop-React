import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
<Auth0Provider
domain="dev-w2axzk5nu8fhl1v4.us.auth0.com"
clientId="Q5W7ywYcw7nyTp0u95ogGZ7j5pVZX53u"
redirectUri={window.location.origin}
cacheLocation="localstorage"
>
    <UserProvider>
        <ProductsProvider>
            <FilterProvider>
                <CartProvider>
                     <App />
                </CartProvider>
            </FilterProvider> 
        </ProductsProvider>
    </UserProvider>
</Auth0Provider>, document.getElementById("root")
)