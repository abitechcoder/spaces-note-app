import { FooterComponent, Navbar } from "../landing_page";
import { footerMenu } from "../../util/footerContent";
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
      {/* <Navbar/> */}
      <section className="grid grid-cols-2 lg:grid-cols-6 justify-center">
        {menuList}
      </section>
      <section className="flex justify-between items-center container mx-auto p-6 lg:px-8 mt-3 md:mt-[5rem]">
        <h1 className="text-[2.8rem] font-[500] hidden md:block">Note.d</h1>
        <p className="text=gray-400">© 2022 Note.d All rights reserved.</p>
      </section>
    </footer>
  );
};

export default FooterList;
