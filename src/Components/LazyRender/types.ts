export interface Params {
  TargetComponent: any;
  CustomPlaceholder?: any;
  placeholderStyle?: any;
  distance?: number;
}

export interface Props {
  [propName: string]: any;
}
export interface State {
  isTrueRender: boolean;
  customComId: string;
}

export const defaultStyle: {
  minHeight: string;
  background: string;
  borderRadius: number;
  marginBottom: string;
} = {
  minHeight: '200px',
  background: '#f9f8f9',
  borderRadius: 8,
  marginBottom: '10px',
};
