const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen flex justify-center items-center w-full dark:bg-zinc-600">{children}</div>;
};

export default Layout;
