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

export interface kenBurnsParam{
  startX: number, 
  startY: number, 
  startB: number, 
  endX: number, 
  endY: number,
  endB: number,
}

export type kenBurnsParamKey = '0:0'|'1:1'|'1:3'|'3:1'|'4:3'|'9:4'

export interface kenBurnsParams{
  "0:0": kenBurnsParam,
  "1:1": kenBurnsParam,
  "1:3": kenBurnsParam,
  "3:1": kenBurnsParam,
  "3:4": kenBurnsParam, 
  "4:3": kenBurnsParam,
  "9:4": kenBurnsParam
}
export interface Look{
    uid: string,
    title: string,
    averageColor: string,
    kenBurnsParams:kenBurnsParams,
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
    height: number,
    width: number,
    url: string
}
export interface Pane {
  translations?: {
    [prop: string]: string;
  };
  lookUid?: string;
}
export {};
