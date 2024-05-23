import { Text as DefaultText, View as DefaultView } from 'react-native';


export function LatoText(props : DefaultText['props']) {
  return  <DefaultText {...props} style={[props.style, {fontFamily : 'Lato'}]}/> 
}


export function LatoBlackText(props : DefaultText['props']) {
    return  <DefaultText {...props} style={[props.style, {fontFamily : 'LatoBlack'}]}/> 
  }

