export interface Fact {

  id:number;
  category:string;
  fact:string;
  shortExplanation:string;
  moreDetails:string;
  likes:number;
  expanded?:boolean;
}