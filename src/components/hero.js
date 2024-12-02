import React from 'react'

import Script from 'dangerous-html/react'
import PropTypes from 'prop-types'

import './hero.css'

const Hero = (props) => {
  const handleGetStarted = () => {
    window.open('http://localhost:8501', '_blank'); 
  };
  return (
    <div className="hero-header78">
      <div className="hero-column thq-section-padding thq-section-max-width">
        <div className="hero-content1">
          <h1 className="hero-text1 thq-heading-1">Welcome To DocTalk</h1>
          <p className="hero-text2 thq-body-large">Predict Your Insurance Cost and Get Personalized Analysis To Your Report. </p>
        </div>
        <div className="hero-actions">
          <button className="thq-button-filled hero-button1"   onClick={handleGetStarted}>
            <span className="thq-body-small">{props.action1}</span>
          </button>
          <button className="thq-button-outline hero-button2">
            <span className="thq-body-small">{props.action2}</span>
          </button>
        </div>
      </div>
      <div className="hero-content2">
        <div className="hero-row-container1 thq-animated-group-container-horizontal thq-mask-image-horizontal">
          <div className="thq-animated-group-horizontal">
            <img
              alt={props.image1Alt}
              src={props.image1Src}
              className="hero-placeholder-image10 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image2Alt}
              src={props.image2Src}
              className="hero-placeholder-image11 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image3Alt}
              src={props.image3Src}
              className="hero-placeholder-image12 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image4Alt}
              src={props.image4Src}
              className="hero-placeholder-image13 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image5Alt}
              src={props.image5Src}
              className="hero-placeholder-image14 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image6Alt}
              src={props.image6Src}
              className="hero-placeholder-image15 thq-img-ratio-1-1 thq-img-scale"
            />
          </div>
          <div className="thq-animated-group-horizontal">
            <img
              alt={props.image1Alt}
              src={props.image1Src}
              className="hero-placeholder-image16 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image2Alt}
              src={props.image2Src}
              className="hero-placeholder-image17 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image3Alt}
              src={props.image3Src}
              className="hero-placeholder-image18 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image4Alt}
              src={props.image4Src}
              className="hero-placeholder-image19 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image5Alt}
              src={props.image5Src}
              className="hero-placeholder-image20 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt="Hero Image"
              src="https://images.unsplash.com/photo-1534312527009-56c7016453e6?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDIxfHxhYnN0cmFjdHxlbnwwfHx8fDE3MTA4NzA5MzB8MA&amp;ixlib=rb-4.0.3&amp;w=1500"
              className="hero-placeholder-image21 thq-img-ratio-1-1 thq-img-scale"
            />
          </div>
        </div>
        <div className="hero-row-container2 thq-animated-group-container-horizontal thq-mask-image-horizontal">
          <div className="thq-animated-group-horizontal-reverse">
            <img
              alt={props.image7Alt}
              src={props.image7Src}
              className="hero-placeholder-image22 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image8Alt}
              src={props.image8Src}
              className="hero-placeholder-image23 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image9Alt}
              src={props.image9Src}
              className="hero-placeholder-image24 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image10Alt}
              src={props.image10Src}
              className="hero-placeholder-image25 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image11Alt}
              src={props.image11Src}
              className="hero-placeholder-image26 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image12Alt}
              src={props.image12Src}
              className="hero-placeholder-image27 thq-img-ratio-1-1 thq-img-scale"
            />
          </div>
          <div className="thq-animated-group-horizontal-reverse">
            <img
              alt={props.image7Alt}
              src={props.image7Src}
              className="hero-placeholder-image28 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image8Alt}
              src={props.image8Src}
              className="hero-placeholder-image29 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image9Alt}
              src={props.image9Src}
              className="hero-placeholder-image30 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image10Alt}
              src={props.image10Src}
              className="hero-placeholder-image31 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image11Alt}
              src={props.image11Src}
              className="hero-placeholder-image32 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt="Hero Image"
              src="https://images.unsplash.com/photo-1568214379698-8aeb8c6c6ac8?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDEyfHxncmFmaWN8ZW58MHx8fHwxNzE1Nzk0OTk5fDA&amp;ixlib=rb-4.0.3&amp;w=1500"
              className="hero-placeholder-image33 thq-img-ratio-1-1 thq-img-scale"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="hero-container2">
          <Script
            html={`<style>
  @keyframes scroll-x {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% - 16px));
    }
  }

  @keyframes scroll-y {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(calc(-100% - 16px));
    }
  }
</style>
`}
          ></Script>
        </div>
      </div>
    </div>
  )
}

Hero.defaultProps = {
  image10Src:
    'https://images.pexels.com/photos/7108388/pexels-photo-7108388.jpeg?auto=compress&cs=tinysrgb&w=800',
  image5Alt: 'Doctor consultation',
  image6Alt: 'Medical advice',
  image4Src:
    'https://images.pexels.com/photos/5452221/pexels-photo-5452221.jpeg?auto=compress&cs=tinysrgb&w=800',
  image7Src:
    'https://images.pexels.com/photos/7088483/pexels-photo-7088483.jpeg?auto=compress&cs=tinysrgb&w=800',
  image5Src:
    'https://images.pexels.com/photos/6011598/pexels-photo-6011598.jpeg?auto=compress&cs=tinysrgb&w=800',
  image7Alt: 'Healthcare support',
  image12Alt: 'Digital health platform',
  image8Src:
    'https://images.pexels.com/photos/8413288/pexels-photo-8413288.jpeg?auto=compress&cs=tinysrgb&w=800',
  image2Alt: 'Medical documents',
  content1:
    'Get all your medical questions answered by our team of expert doctors. Upload your documents and receive personalized responses.',
  image8Alt: 'Medical research',
  image2Src:
    'https://images.pexels.com/photos/7723510/pexels-photo-7723510.jpeg?auto=compress&cs=tinysrgb&w=800',
  image11Alt: 'Patient care',
  image3Src:
    'https://images.pexels.com/photos/8830669/pexels-photo-8830669.jpeg?auto=compress&cs=tinysrgb&w=800',
  image4Alt: 'Mobile app',
  image11Src:
    'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
  heading1: 'Welcome to ChatDoc',
  action1: 'Get Started',
  image9Src:
    'https://images.pexels.com/photos/3861976/pexels-photo-3861976.jpeg?auto=compress&cs=tinysrgb&w=800',
  image9Alt: 'Telemedicine services',
  image10Alt: 'Health information',
  image1Alt: 'Doctor with stethoscope',
  image3Alt: 'Online chat',
  image12Src:
    'https://images.unsplash.com/photo-1619794555233-e563edf91173?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  image1Src:
    'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=800',
  image6Src:
    'https://images.pexels.com/photos/7578815/pexels-photo-7578815.jpeg?auto=compress&cs=tinysrgb&w=800',
  action2: 'Learn More',
}

Hero.propTypes = {
  image10Src: PropTypes.string,
  image5Alt: PropTypes.string,
  image6Alt: PropTypes.string,
  image4Src: PropTypes.string,
  image7Src: PropTypes.string,
  image5Src: PropTypes.string,
  image7Alt: PropTypes.string,
  image12Alt: PropTypes.string,
  image8Src: PropTypes.string,
  image2Alt: PropTypes.string,
  content1: PropTypes.string,
  image8Alt: PropTypes.string,
  image2Src: PropTypes.string,
  image11Alt: PropTypes.string,
  image3Src: PropTypes.string,
  image4Alt: PropTypes.string,
  image11Src: PropTypes.string,
  heading1: PropTypes.string,
  action1: PropTypes.string,
  image9Src: PropTypes.string,
  image9Alt: PropTypes.string,
  image10Alt: PropTypes.string,
  image1Alt: PropTypes.string,
  image3Alt: PropTypes.string,
  image12Src: PropTypes.string,
  image1Src: PropTypes.string,
  image6Src: PropTypes.string,
  action2: PropTypes.string,
}

export default Hero
