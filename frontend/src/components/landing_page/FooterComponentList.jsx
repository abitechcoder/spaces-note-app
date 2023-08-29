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
    <footer className="container mx-auto px-6 pt-6 md:pt-12 lg:pt-24 lg:px-8">
      <section className="grid grid-cols-2 lg:grid-cols-6 justify-center">
        {menuList}
      </section>
      <section className="flex justify-center md:justify-between items-center py-4 container mt-8 md:mt-[5rem] border-t">
      <img src={Logo} className="w-[100px] md:w-[170px] hidden md:block" alt="Website Logo" />
        <p className="text=gray-400 font-dm font-bold">© 2022 Note.d All rights reserved.</p>
      </section>
    </footer>
  );
};

export default FooterList;
