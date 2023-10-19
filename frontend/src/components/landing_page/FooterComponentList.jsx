import { FooterComponent, Navbar } from "../landing_page";
import { footerMenu } from "../../util/footerContent";
import { Logo } from "../../assets";
const FooterList = () => {
  const menuList = footerMenu.map((menu) => {
    return (
      <div key={menu.id}>
        <FooterComponent Title={menu.title} Menu={menu.menu} />
      </div>
    );
  });
  return (
    <footer className="container mx-auto px-6 pt-6 md:pt-8 lg:pt-16 lg:px-8">
      <section className="grid grid-cols-2 lg:grid-cols-5 text-center justify-center">
        {menuList}
      </section>
      <section className="flex justify-center md:justify-between items-center py-4 container mt-8 md:mt-[2rem] border-t">
      <img src={Logo} className="w-[100px] md:w-[170px] hidden md:block" alt="Website Logo" />
        <p className="text=gray-400 font-dm font-bold">© 2023 Spaces All rights reserved.</p>
      </section>
    </footer>
  );
};

export default FooterList;
