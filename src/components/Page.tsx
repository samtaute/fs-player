import styles from "./Page.module.css";
import {motion} from 'framer-motion'

const Page: React.FC<{
  data: {
    backgroundImage: string;
    title: string;
    summary: string;
  };
}> = ({ data }) => {
  return (
    <motion.img
      className={styles["background-image"]}
      alt="background"
      src={data.backgroundImage}
      initial={{x: 300}}
      animate={{x: 0}}
    />
  );
};
export default Page;
