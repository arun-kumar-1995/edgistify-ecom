import { Header } from "../components/Header/Header";
export const AppLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};
