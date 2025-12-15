import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import styles from "./SupportChat.module.css";

const SupportChat = () => {
  return (
    <button className={styles.supportChat}>
      <ManageAccountsOutlinedIcon className={styles.icon} />
      <span className={styles.text}>Support Chat</span>
    </button>
  );
};

export default SupportChat;
