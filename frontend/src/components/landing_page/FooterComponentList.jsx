import { FooterComponent } from "../landing_page";
import { footerMenu } from "../../util/footerContent";
const FooterList = () => {
  const menuList = footerMenu.map((menu) => {
    return (
      <div className=" " key={menu.id}>
        <FooterComponent Title={menu.title} Menu={menu.menu} key={menu.id} />
      </div>
    );
  });
  return (
    <footer>
      <section className="grid grid-cols-2 lg:grid-cols-6 justify-center ml-auto lg:w-[90%]">
        {menuList}
      </section>
      <section className="flex justify-between container mx-auto p-6 lg:px-8 mt-[5rem]">
        <h1 className="text-[2.8rem] font-[500]">Note.d</h1>
        <p className="text=gray-400">© 2022 Note.d All rights reserved.</p>
      </section>
    </footer>
  );
};

export default FooterList;
