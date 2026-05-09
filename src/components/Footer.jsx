import IconFacebook from "../assets/facebook.png";
import IconInstagram from "../assets/instagram.png";
import IconTwitter from "../assets/twitter.png";
import IconYoutube from "../assets/youtube.png";

const Footer = () => {
  const handleClickYoutube = () => {
    window.open("https://www.youtube.com/@Greenkorea_united", "_blank");
  };
  const handleClickFacebook = () => {
    window.open("https://www.facebook.com/i.greenkorea/", "_blank");
  };
  const handleClickTwitter = () => {
    // window.open("https://www.twitter.com", "_blank");
  };
  const handleClickInstagram = () => {
    window.open("https://www.instagram.com/greenkorea_united/", "_blank");
  };

  return (
    <footer className="flex justify-between items-center py-24">
      <p className="text-14 font-medium leading-[140%] text-[#238EDD]">
        녹색연합 @ 2026. All rights reserved.
      </p>
      <div className="flex items-center gap-16">
        <button type="button" onClick={handleClickYoutube}>
          <img src={IconYoutube} alt="Youtube" className="w-24 h-24" />
        </button>
        <button type="button" onClick={handleClickFacebook}>
          <img src={IconFacebook} alt="Facebook" className="w-24 h-24" />
        </button>
        <button type="button" onClick={handleClickTwitter}>
          <img src={IconTwitter} alt="Twitter" className="w-24 h-24" />
        </button>
        <button type="button" onClick={handleClickInstagram}>
          <img src={IconInstagram} alt="Instagram" className="w-24 h-24" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
