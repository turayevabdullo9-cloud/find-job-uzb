import Link from "next/link";

const Header = () => {
    return (
      <header className="sticky top-0 z-50 w-full backdrop-blur-md ">
        <div className="container  shadow-2xl rounded-2xl max-w-300 py-4 flex justify-between items-center mx-auto px-4">
          <Link href="/" className="flex items-center">
            <h1 className="text-3xl">Logo</h1>
          </Link>

          <nav className="flex items-center gap-10">
            <ul className="flex items-center gap-4">
              <li className="hover:text-blue-500 transition-all">
                <Link href="/" className="transition-all hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li className="hover:text-blue-500 transition-all">
                <Link
                  href="/jobs"
                  className="transition-all hover:text-blue-500"
                >
                  Jobs
                </Link>
              </li>
            </ul>

            <Link
              href="/admin"
              className="inline-flex h-8 items-center rounded-lg bg-gray-800 px-4 text-sm font-medium text-white transition hover:bg-gray-500"
            >
              Post a Job
            </Link>
          </nav>
        </div>
      </header>
    );
}

export default Header;