import Link from "next/link";

const routes = [
  [
    "/",
    "Home"
  ],
  [
    "/calculator",
    "Solar calculator"
  ],
  [
    "/catalog",
    "Product catalog"
  ],
  [
    "/catalog/scaffold-example",
    "Product details"
  ],
  [
    "/cart",
    "Cart"
  ],
  [
    "/checkout",
    "Checkout"
  ],
  [
    "/support",
    "Technical support"
  ],
  [
    "/login",
    "Login"
  ],
  [
    "/register",
    "Register"
  ],
  [
    "/account",
    "Account"
  ],
  [
    "/account/profile",
    "Account profile"
  ],
  [
    "/account/estimates",
    "Saved estimates"
  ],
  [
    "/account/orders",
    "My orders"
  ],
  [
    "/account/orders/scaffold-example",
    "Order details"
  ],
  [
    "/account/tickets",
    "My support tickets"
  ],
  [
    "/account/tickets/scaffold-example",
    "Support ticket details"
  ],
  [
    "/admin",
    "Admin dashboard"
  ],
  [
    "/admin/categories",
    "Manage categories"
  ],
  [
    "/admin/products",
    "Manage products"
  ],
  [
    "/admin/products/new",
    "New product"
  ],
  [
    "/admin/products/scaffold-example",
    "Edit product"
  ],
  [
    "/admin/orders",
    "Manage orders"
  ],
  [
    "/admin/orders/scaffold-example",
    "Admin order details"
  ],
  [
    "/admin/tickets",
    "Manage support tickets"
  ],
  [
    "/admin/tickets/scaffold-example",
    "Admin support details"
  ],
  [
    "/admin/users",
    "Manage users"
  ],
  [
    "/admin/users/scaffold-example",
    "Admin user details"
  ]
] as const;

export function ScaffoldNavigation() {
  return (
    <header className="border-b p-4">
      <nav aria-label="Scaffold navigation" className="flex flex-wrap gap-4">
        <Link href="/">Solara home</Link>
        <Link href="/calculator">Calculator</Link>
        <Link href="/catalog">Catalog</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/checkout">Checkout</Link>
        <Link href="/support">Support</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/account">Account placeholder</Link>
        <Link href="/admin">Admin placeholder</Link>
      </nav>
      <details className="mt-3">
        <summary>All placeholder pages</summary>
        <p>Detail links use example route values only; no records are loaded.</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">{routes.map(([href, label]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
      </details>
    </header>
  );
}
