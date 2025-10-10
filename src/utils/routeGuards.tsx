import { Navigate } from "react-router-dom";

export function requirePremium(isPremium: boolean, children: JSX.Element) {
  return isPremium
    ? children
    : (
        <Navigate
          to="/tabs/dashboard"
          replace
          state={{ from: window.location.pathname }}
        />
      );
}