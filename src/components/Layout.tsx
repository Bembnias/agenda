import { Inter } from "next/font/google";
import { Navbar } from "./navbar/Navbar";

interface LayoutProps {
  children: JSX.Element;
}

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main className={inter.className}>{children}</main>
    </>
  );
};

export default Layout;
