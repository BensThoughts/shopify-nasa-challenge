import {
  Twitter,
  Facebook,
  Linkedin,
  GitHub,
} from 'react-feather';

import AnimatedIcon from '../AnimatedIcon';

export default function ContactCard() {
  return (
    <div>
      <a href="https://github.com/bensthoughts" className="mx-3">
        <AnimatedIcon>
          <GitHub className="text-primary" />
        </AnimatedIcon>
      </a>
      <a href="https://twitter.com/bensthoughts" className="mx-3">
        <AnimatedIcon>
          <Twitter style={{color: 'rgb(29, 161, 242)'}} />
        </AnimatedIcon>
        {/* <SocialIcon iconName="twitter" url="https://twitter.com/bensthoughts" /> */}
      </a>
      <a href="https://www.linkedin.com/in/benjaminblumenfeldjones" className="mx-3">
        <AnimatedIcon>
          <Linkedin style={{color: 'rgb(40,103,178)'}} />
        </AnimatedIcon>
      </a>
      <a href="https://www.facebook.com/benjamin.blumenfeldjones.9" className="mx-3">
        <AnimatedIcon>
          <Facebook style={{color: 'rgb(66, 103, 178)'}} />
        </AnimatedIcon>
      </a>
    </div>
  );
}
