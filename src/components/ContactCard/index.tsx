import {
  Twitter,
  Facebook,
  Linkedin,
  GitHub,
  Mail,
} from 'react-feather';

import AnimatedIcon from '../AnimatedIcon';

export default function ContactCard({className, ...rest}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col text-center ${className}`} {...rest}>
      <p>
      Contact me on these platforms.
      </p>
      <div className="flex mt-3">
        <a href="mailto:bensthoughts@gmail.com" className="mx-3">
          <AnimatedIcon>
            <Mail className="text-primary" />
          </AnimatedIcon>
        </a>
        <a href="https://github.com/bensthoughts" target="_blank" rel="noreferrer noopener" className="mx-3">
          <AnimatedIcon>
            <GitHub className="text-primary" />
          </AnimatedIcon>
        </a>
        <a href="https://twitter.com/bensthoughts" target="_blank" rel="noreferrer noopener" className="mx-3">
          <AnimatedIcon>
            <Twitter style={{color: 'rgb(29, 161, 242)'}} />
          </AnimatedIcon>
          {/* <SocialIcon iconName="twitter" url="https://twitter.com/bensthoughts" /> */}
        </a>
        <a href="https://www.linkedin.com/in/benjaminblumenfeldjones" target="_blank" rel="noreferrer noopener" className="mx-3">
          <AnimatedIcon>
            <Linkedin style={{color: 'rgb(40,103,178)'}} />
          </AnimatedIcon>
        </a>
        <a href="https://www.facebook.com/benjamin.blumenfeldjones.9" target="_blank" rel="noreferrer noopener" className="mx-3">
          <AnimatedIcon>
            <Facebook style={{color: 'rgb(66, 103, 178)'}} />
          </AnimatedIcon>
        </a>
      </div>
    </div>
  );
}
