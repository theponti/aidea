import Link from "next/link";
import AuthMenu from "./components/AuthMenu";

function Header() {
  return (
    <nav className="navbar bg-base-100 sticky top-0 left-0 px-0 drop-shadow-sm">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="flex-1 text-primary">
          <span className="font-semibold text-2xl">
            <Link href="/">🧠 Aidea</Link>
          </span>
        </div>
        <AuthMenu />
      </div>
    </nav>
  );
}

export default Header;
