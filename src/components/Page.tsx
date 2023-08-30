import { motion } from "framer-motion";

const Page: React.FC<{
  data: {
    backgroundImage: string;
    title: string;
    summary: string;
  };
}> = ({ data }) => {
  return (
    <motion.div
      className="slide-container"
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <img
        className="background-image"
        alt="background"
        src={data.backgroundImage}
      />
      <div className='text-section'>
        <div className="gradient-overlay"></div>
        <div className="title">Test overlay</div>
        <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>
      </div>
    </motion.div>
  );
};
export default Page;
