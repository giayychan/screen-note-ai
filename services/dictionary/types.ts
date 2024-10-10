export interface WordDefinition {
  meta: {
    uuid: string;
  };
  hwi: {
    hw: string;
    prs?: {
      mw: string;
      sound?: {
        audio: string;
        ref: string;
        stat: string;
      };
    }[];
  };
  fl?: string;
  shortdef: string[];
}

export type AutoCorrectString = string[];
export type EmptyResult = [];
