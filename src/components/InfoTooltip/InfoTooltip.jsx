import './InfoTooltip.css';
import React from 'react';
import {usePopupClose} from '../../hooks/usePopupClose';
import infoSuccess from '../../images/info.svg';
import infoNon from '../../images/info-cr.svg';

const InfoTooltip = ({ onClose, isOpen, isRegister }) => {usePopupClose(isOpen, onClose);
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup_type_infoTip">
        <button className="popup__close" onClick={onClose} id="close-popup-profile" type="button"></button>
        <img className="popup__image-status" src={isRegister.status ? infoSuccess : infoNon} alt="Статус"></img>
        <p className="popup__text-status">{isRegister.message}</p>
      </div>
    </div>
  );
};

export default InfoTooltip;
