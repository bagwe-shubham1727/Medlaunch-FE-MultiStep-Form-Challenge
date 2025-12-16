import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import styles from "./SupportChat.module.css";

const SupportChat = () => {
  return (
    <button
      className={styles.supportChat}
      aria-label="Open support chat"
      type="button"
    >
      <ManageAccountsOutlinedIcon className={styles.icon} aria-hidden="true" />
      <span className={styles.text}>Support Chat</span>
    </button>
  );
};

export default SupportChat;
