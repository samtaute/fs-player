import { useEffect } from "react";
import { lookbook } from "./definition";
import { useState, useCallback } from "react";
import CoverPage from "./components/CoverPage";
import PlanPage from "./components/PlanPage";

function App() {
  //Get lookbook Id to pass to ctx
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let lookbookId = urlParams.get("uid");
  if (!lookbookId) {
    lookbookId = "bYfR2jud";
  }

  const urlIndex = Number(window.location.pathname.split("#")[1]);

  // if (!lookbookId || pathArray.length<3) {
  //   lookbookId = "e1f1NXZH7";
  // }

  const [idx, setIdx] = useState<number>(-1);
  if (urlIndex) {
    setIdx(urlIndex as number);
  }
  const [pages, setPages] = useState([] as any);

  //Fetch lookbook data from Softbox API and use it to
  //create an array of pages. This function runs once.
  useEffect(() => {
    async function fetchData(id: string) {
      
      const requestUrl = `https://fotoscapes.com/wp/v1/lookbook/${lookbookId}?ckey=733053ec7939379e&tf=md`;
      try {
        const response = await fetch(requestUrl);
        if (!response.ok) {
          throw new Error(`Request failed: ${requestUrl}`);
        }
        const data = await response.json();

        const pages = createPages(data.lookbook);

        setPages(pages);
      } catch (err) {
        console.log((err as Error).message);
      }
    }
    
    fetchData(lookbookId as string);
    setIdx(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createPages = useCallback(
    (data: lookbook) => {
      const pages = [];
      pages.push(
        <CoverPage lookbookData={data} pageIndex={0} idx={idx} key={0} />
      );
      for (let i = 0; i < data.plan.views.length; i++) {
        pages.push(
          <PlanPage
            idx={idx}
            pageIdx={i}
            view={data.plan.views[i]}
            lookbookData={data}
            key={i}
          />
        );
      }

      return pages;
    },
    [idx]
  );

  function incrementIndexHandler() {
    setIdx((prev) => {
      if (prev < pages.length - 1) {
        return prev + 1;
      } else {
        return 0;
      }
    });

  }

  //swipe conditions
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setIdx((prev) => {
        if (prev < pages.length - 1) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    }
    if (isRightSwipe) {
      setIdx((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else return 0;
      });
    }
  };

  return (
    <div className="App">
      <div
        onClick={incrementIndexHandler}
        id="player"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {pages[idx]}
      </div>
      <div className="invisible">{pages[idx + 1]}</div>
    </div>
  );
}

export default App;
