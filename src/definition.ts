export interface lookbook {
  title: {
    [prop: string]: string;
  };
  ownedBy: {
    name: string;
    uid: string;
    isBrand: boolean;
    logo: string;
    logoLarge: string;
    logoDark: string;
    logoAlpha: number;
    thumbnail: string;
    brandGroup: string;
  };
  uid: string;
  summary: {
    [prop: string]: string;
  };
  credit: {
    [prop: string]: string;
  };
  qcc: boolean;
  plan: {
    ver: number;
    views: View[];
  };
  lbtype: string,
  interests: Interest[],
  looks: Look[]
  coverUID: string,
  previewUids: string[],
  tags: Tag[],
  link: string,
  updatedAt: string,
  createdAt: string,
  publishOn: string,
  defaultAdTag:{
    unitPath: string,
    pubwisePreScript: string,
    pubwiseScript: string,
  }

}

export interface Tag{
    uid: string, 
    name: string,
    category: string
}

export interface Interest{
    name: string,
    uid: string,
    level: number
}


export interface View {
  viewType: string;
  min_y: number;
  max_y: number;
  panes: Pane[];
}

export interface Look{
    uid: string,
    title: string,
    averageColor: string,
    previewParams:{
        '1:1': {
            centerX: number,
            centerY: number,
            breadth: number,
        },
        '9:4': {
            centerX: number,
            centerY: number,
            breadth: number, 
        }
    },
    images: Image[],
    thumbnails: Image[],
    ownedBy:{
        name: string,
        uid: string,
        isBrand: boolean,
        logo: string,
        logoLarge: string,
        logoDark: string,
        logoAlpha: number,
        thumbnail: string,
    },
    updatedAt: string,
}

export interface Image{
    height: string,
    width: string,
    url: string
}
export interface Pane {
  translations?: {
    [prop: string]: string;
  };
  lookUid?: string;
}
export {};
