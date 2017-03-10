// class Map extends React.Component {
//   constructor(props){
//     super(props)
//   }
//
//   render(){
//     const map = new google.maps.Map(document.getElementById('content') , {
//           center: {lat: -34.397, lng: 150.644},
//           scrollwheel: false,
//           zoom: 8
//         });
//     return (
//       map
//     );
//   }
// };
//
// ReactDOM.render(
//   <Map />
//   ,document.getElementById('content')
// );
var map = new google.maps.Map(document.getElementById('cont'), {
          center: {lat: -34.397, lng: 150.644},
          scrollwheel: false,
          zoom: 8
        });
