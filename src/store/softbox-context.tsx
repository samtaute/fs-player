import React, { ReactNode, useCallback, useState } from "react";
import Page from "../components/Page";
import { lookbook, Pane } from "../definition";
import PlanPage from "../components/PlanPage";

type SoftboxContextObj = {
  fetchData: (uid: string) => void;
  pages: [];
};

export const SoftboxContext = React.createContext<SoftboxContextObj>({
  fetchData(uid: string) {},
  pages: [],
});

export const SoftboxContextProvider: React.FC<{
  children: ReactNode;
}> = (props) => {
  // const [data, setData] = useState({} as any);


  const [pages, setPages] = useState([] as any); 


  const createPages = useCallback((data: lookbook) => {
    let pages = [];

    const coverLook = createCover(data.coverUID, data); 

    pages.push(coverLook); 

    for (const view of data.plan.views){
      const page = createPage(view.panes, data);
      pages.push(page)
    }

    return pages;
  },[]);

  function createPage(panes: Pane[], data: lookbook){
    let imageUrl = '';   
    let summary = ''; 

    for (const pane of panes){
      if (pane.translations){
        summary = pane.translations.en; 
      }
      if (pane.lookUid){
        imageUrl = data.looks.find((look)=>{return look.uid === pane.lookUid})?.thumbnails[0].url as string;
      }
    }

    const pageData = {
      summary,
      imageUrl,
    }
    // return <PlanPage data={pageData} key={imageUrl}></PlanPage>
    return <div></div>
  }
  function createCover(coverUID: string, data: lookbook) {
    const look = data.looks.find((look)=>{return look.uid === coverUID })
    let imageUrl = look?.images[0].url; 

    if (!imageUrl){
      imageUrl = 'None found'
    }
    //todo: get language from browser 
    const title = data.title['en']; 
    const summary = data.summary['en']
    const lightLogo = data.ownedBy.logoLarge; 

    const pageData = {
     imageUrl,
     title,
     summary,
     lightLogo,
    };
    return <Page data={pageData} key={imageUrl}/>;
  }

  const fetchData = useCallback(async (uid: string) => {
    const requestUrl = `https://fotoscapes.com/wp/v1/lookbook/${uid}?ckey=733053ec7939379e`;
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
  },[createPages]);

  const contextValue = {
    fetchData: fetchData,
    pages: pages, 
  };
  return (
    <SoftboxContext.Provider value={contextValue}>
      {props.children}
    </SoftboxContext.Provider>
  );
};
export default SoftboxContext;
