import { motion } from "framer-motion";

const PlanPage: React.FC<{
  data: {
    imageUrl: string;
    summary: string;
  };
}> = ({ data }) => {
  return (
    <motion.div
      className="slide-container"
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.1 }}
    >
      <img className ='background-image' src={data.imageUrl} alt="preview" />
    </motion.div>
  );
};
export default PlanPage;
