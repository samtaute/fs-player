import React, { ReactNode, useCallback, useState } from "react";
import Page from "../components/Page";


type SoftboxContextObj = {
  fetchData: (uid: string) => void;
  data: any;
  pages: any;
};

export const SoftboxContext = React.createContext<SoftboxContextObj>({
  fetchData(uid: string) {},
  data: {},
  pages: {},
});

export const SoftboxContextProvider: React.FC<{
  children: ReactNode;
}> = (props) => {
  const [data, setData] = useState({} as any);
  const [pages, setPages] = useState([] as any); 
  const createPages = useCallback((data: any) => {
    let pages = [];
    for (const look of data.lookbook.looks) {
      pages.push(createCoverPage(look.images[0]["url"]));
    }
    return pages;
  },[]);
  function createCoverPage(imageUrl: string) {
    const pageData = {
      backgroundImage:
        imageUrl,
      title: 'test',
      summary:
        "A celebrity with a big bank account is the norm in Hollywood, but some of the entertainment industry’s elite stand way above the rest.</p><p>Check out this list of popular celebs with insanely high net worths",
    };
    return <Page data={pageData} key={imageUrl}/>;
  }

  const fetchData = useCallback(async (uid: string) => {
    const requestUrl = `https://fotoscapes.com/wp/v1/lookbook/${uid}?ckey=733053ec7939379e&tf=html`;
    try {
      const response = await fetch(requestUrl);
      if (!response.ok) {
        throw new Error(`Request failed: ${requestUrl}`);
      }
      const data = await response.json();
      const pages = createPages(data); 
      setData(data);
      setPages(pages);
    } catch (err) {
      console.log((err as Error).message);
    }
  },[createPages]);

  const contextValue = {
    fetchData: fetchData,
    data: data,
    pages: pages, 
  };
  return (
    <SoftboxContext.Provider value={contextValue}>
      {props.children}
    </SoftboxContext.Provider>
  );
};
export default SoftboxContext;
