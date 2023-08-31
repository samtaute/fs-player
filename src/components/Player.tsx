import { useEffect, useState } from "react";
import { useContext } from "react";
import SoftboxContext from "../store/softbox-context";

const Player: React.FC = () => {
  const [index, setIndex] = useState(0);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("uid");

  const ctx = useContext(SoftboxContext);

  useEffect(() => {
    ctx.fetchData(id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function incrementIndex() {
    setIndex((prev) => {
      return prev + 1;
    });
  }

  return (
    <div onClick={incrementIndex} id='player'>
      {ctx.pages[index]}
      <div className='invisible'>{ctx.pages[index+1]}</div>
    </div>
  );
};
export default Player;
