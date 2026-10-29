import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <p className="text-center text-sm text-slate-500">
          © 2026 KJPJ Webshop
        </p>

        <p className="mt-2 text-center text-sm text-slate-500">
          <Link to="/cookies" className="underline hover:text-slate-800">
            Om cookies
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
