# react-native-steps
A react-native implementation of step indicators widget.

### Features

  - Can be used with ViewPager and Listview
  - Extremely Customizable
  - Supports vertical and horizontal orientation
  - Supports reversed mode
  - Supports animation between steps
  
  
### Sample
```sh
$ cd sample
$ npm i // Or yarn install
$ react-native run-ios   // For ios
$ react-native run-android   // For Android
```

### Installation
``npm install react-native-steps --save``

or

``yarn add react-native-steps --save``

### Usage
```javascript
import Steps from 'react-native-steps';

const labels = ["Cart","Delivery Address","Order Summary","Payment Method","Track"];
const configs = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
};


constructor() {
    this.state = {
        current: 0
    }
}

render() {
  return (
    <Steps
         configs={configs}
         current={this.state.current}
         labels={labels}
    />
  )
}

onPageChange(position){
    this.setState({current: position});
}
//...
```

### Props

| Name | Type | Description | Default
| ------------ | ------------- | ------------ |------------ |
| `current` | Number  | Current position in steps | 0
| ```count``` | Number  | Number of steps | 5
| ```direction``` | String  | Orientation(i.e. horizontal,vertical) | horizontal
| ```configs``` | Object  | Customization | {}
| ```labels``` | Array  | Labels for each step | null
| ```reversed``` | Boolean  | Direction of progress | false
| `onPress` | Function (position: Number) | Function called when a step is pressed | null
| `renderStepIndicator` | Function (position: Number, stepStatus: String) | Use this to render custom content inside step | null 

### Configs

| Name | Type | Default
| ------------ | ------------ |------------ |
| ```stepIndicatorSize``` | Number  | 30
| ```currentStepIndicatorSize``` | Number  | 40
| ```separatorStrokeWidth``` | Number  | 3
| ```separatorStrokeUnfinishedWidth``` | Number  | 0
| ```separatorStrokeFinishedWidth``` | Number  | 0
| ```stepStrokeWidth``` | Number  | 0
| ```currentStepStrokeWidth``` | Number  | 5
| ```stepStrokeCurrentColor``` | String  | '#4aae4f'
| ```stepStrokeFinishedColor``` | String  | '#4aae4f'
| ```stepStrokeUnFinishedColor``` | String  | '#4aae4f'
| ```separatorFinishedColor``` | String  | '#4aae4f'
| ```separatorUnFinishedColor``` | String  | '#a4d4a5'
| ```stepIndicatorFinishedColor``` | String  | '#4aae4f'
| ```stepIndicatorUnFinishedColor``` | String  | '#a4d4a5'
| ```stepIndicatorCurrentColor``` | String  | '#ffffff'
| ```stepIndicatorLabelFontSize``` | Number  | 15
| ```currentStepIndicatorLabelFontSize``` | Number  | 15
| ```stepIndicatorLabelCurrentColor``` | String  | '#000000'
| ```stepIndicatorLabelFinishedColor``` | String  | '#ffffff'
| ```stepIndicatorLabelUnFinishedColor``` | String  | 'rgba(255,255,255,0.5)'
| ```labelColor``` | String  | '#000000'
| ```currentStepLabelColor``` | String  | '#4aae4f'
| ```labelSize``` | Number  | 13
| ```labelAlign``` | String  | 'center'
| ```labelStyle``` | Object  | {}


### License

 - [Apache-2.0](https://github.com/hamraa/react-native-steps/blob/master/LICENSE).  © hamraa
