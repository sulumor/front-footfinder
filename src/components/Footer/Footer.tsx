import { BrowserView, MobileView } from "react-device-detect";
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
        <BrowserView>
      <div className="footer_socials">
        <Button colorScheme="linkedin" size='sm' leftIcon={<FaLinkedin />}>
          LinkedIn
        </Button>
        <Button colorScheme="facebook" size='sm' leftIcon={<FaFacebook />}>
          Facebook
        </Button>
        <Button colorScheme="pink" size='sm' leftIcon={<FaInstagram />}>
          Instagram
        </Button>
        <Button colorScheme="red" size='sm' leftIcon={<FaYoutube />}>
          Youtube
        </Button>
      </div>
      </BrowserView>
      <MobileView>
      <div className="mobile_footer_socials">
      <Button colorScheme="linkedin" size='xs' leftIcon={<FaLinkedin />}>
          LinkedIn
        </Button>
        <Button colorScheme="facebook" size='xs' leftIcon={<FaFacebook />}>
          Facebook
        </Button>
        <Button colorScheme="pink" size='xs' leftIcon={<FaInstagram />}>
          Instagram
        </Button>
        <Button colorScheme="red" size='xs' leftIcon={<FaYoutube />}>
          Youtube
        </Button>
        </div>
      </MobileView>
      <div className="mobile_footer_legals">
        <a href="/notices">Mentions légales</a>
      </div>
    </div>
  );
};

export default Footer;
