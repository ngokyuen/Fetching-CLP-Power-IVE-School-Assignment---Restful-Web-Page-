const {connect} = ReactRedux

class ContactComponent extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    const {showContactPage} = this.props.page.showContactPage;
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      scrollwheel: false,
      zoom: 8
    });

    return (
      <div style={{background:"#737373", width:"100%", height:"100%", opacity: 0.5}}>
        <div style={{position:"absolute", top:"50%", left:"50%",}}>
          <div>
            20 Tsing Yi Road<br/>
            Tsing Yi Island<br/>
            New Territories<br/>
            Tel: 1234 4567<br/>
            Fax: 1234 4568<br/>
            Email: <a href="mailto:tedngok@gmail.com">tedngok@gmail.com</a>
          </div>
        </div>
        <div id="map"></div>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_uk7pUPriJEafftHHGKp4pozIieTegdA"
            async defer></script>
      </div>
    );
  }

}


const Contact = connect(state=>state, null)(ContactComponent);
