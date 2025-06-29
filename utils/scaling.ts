import {Dimensions} from 'react-native';


const { width, height } = Dimensions.get('window');

const wp = (percentage:number) => {
  return (width * percentage) / 100;
};

const hp = (percentage:number) => {
  return (height * percentage) / 100;
};

const getFontSize = (size:number) => {
  const scale = width / 375; 
  const newSize = size * scale;
  return Math.max(12, Math.min(newSize, size * 1.2)); 
};
export default {wp,hp,getFontSize}