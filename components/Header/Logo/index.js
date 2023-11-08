import logo from '../../../resources/logo.png';
import { LogoContainer, LogoIMG } from './Logo.styles.js';

export const Logo = () => {
  return (
    <LogoContainer>
      <LogoIMG src={logo} />
    </LogoContainer>
  );
};
