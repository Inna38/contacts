import css from "./MainPage.module.css";
import CreateContacts from "../../components/CreateContacts/CreateContacts";
import AllContacts from "../../components/AllContacts/AllContacts";

const MainPage = () => {
  return (
    <div className={css.main_container}>
      <div className={css.create_contacts}>
        <CreateContacts />
      </div>

      <div className={css.contacts_info}>
        <AllContacts />
      </div>
    </div>
  );
};

export default MainPage;
