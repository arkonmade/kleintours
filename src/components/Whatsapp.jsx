import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { assets } from "../assets/assets";

const Whatsapp = () => {
  return (
    // phoneNumber, accountName, onClick, onSubmit, onClose, onLoopDone, onNotification, avatar, statusMessage, chatMessage, darkMode, allowClickAway, allowEsc, className, style,
    <>
      <FloatingWhatsApp
        phoneNumber="250789596504"
        avatar={assets.brand.mainLogo}
        accountName="Josue | Klein Tours 🇷🇼"
        statusMessage="Local expert • Online"
        chatMessage={`Hello 👋 First time in Rwanda?  
What would you love to explore?`}
        darkMode={false}
        allowClickAway
        allowEsc
      />
    </>
  );
};

export default Whatsapp;
