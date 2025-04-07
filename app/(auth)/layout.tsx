/* const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center">{children}</div>
  );
};

export default Layout; */


import Hero from "@/components/hero";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center flex-wrap md:flex-nowrap md:justify-evenly">
      
      <Hero />
      {children}
    </div>
  );
};

export default Layout;
