import { GrLinkedinOption } from "react-icons/gr";
import { BsGithub, BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { FcDocument } from "react-icons/fc";
import { LiaFileDownloadSolid } from "react-icons/lia";
import { MdCloudDownload } from "react-icons/md";
import { TbNotesOff} from "react-icons/tb"; //icon para CV no cargado
import { profiles } from "./data";
import './Team.css'

const socialIcons = {
    linkedin:<GrLinkedinOption />,
    github:<BsGithub />,
    facebook:<BsFacebook />, 
    twitter:<BsTwitter />,
    instagram:<BsInstagram />,
    whatsapp:<AiOutlineWhatsApp />
  };

const Team = () => {

return (
  <div className="team-container">
    <h2 className="team-h1">Conoce a nuestro equipo</h2>
    <p className="team-subtitle">Quiénes formaron parte de este proyecto</p>

    <div className="team-cards-container">
      {profiles &&
        profiles.map((profile) => (
          <div className="team-card">
            <div class="team-card-inner">
              {/* FRONT CARD */}
              <div class="team-card-front">
                <div className="team-card-img-cont">
                  <img src={profile.profileImage} alt="imagen perfil" />
                </div>
                <p className="team-card-name">{profile.name}</p>
                <p className="team-card-subtitle">{profile.occupation}</p>
                <p className="team-card-p-msj">{profile.message}</p>

                <div className="team-card-icons-cont">
                  {Object.entries(profile.socialMedia).map(
                    ([key, value]) =>
                      value && (
                        <a href={value} target="_blank" key={key}>
                          {socialIcons[key]}
                        </a>
                      )
                  )}
                </div>
              </div>
              {/* BACK CARD */}
              <div class="team-card-back">
                <div className="team-card-img-cont">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3048/3048127.png"
                    alt="imagen perfil"
                  />
                </div>
                <div className="team-card-icons-cv">
                  {profile.downloadCv && (
                    <div className="team-card-icons-cv-animation">
                        <a href={profile.downloadCv} target="_blank"> 
                            <div className="team-card-icon-cv-down">
                                <MdCloudDownload />
                            </div>
                            <div className="team-card-icon-cv">
                                <FcDocument />
                            </div>
                        </a>
                    </div>
                  )}
                  {!profile.downloadCv && (
                    <div className="team-card-icon-cv-none">
                      <TbNotesOff/>
                    </div>
                  )}
                </div>

                <p className="team-card-p-cv-donw">Descarga mi CV</p>
                <div className="team-card-icons-cont">
                  {Object.entries(profile.socialMedia).map(
                    ([key, value]) =>
                      value && (
                        <a href={value} target="_blank" key={key}>
                          {socialIcons[key]}
                        </a>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
);
};

export default Team;
