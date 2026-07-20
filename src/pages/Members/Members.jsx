import "./Members.css"
import Background from "../../components/Background.jsx";
import {useTranslation} from "react-i18next";
import ReactMarkdown from "react-markdown";
import LanguageIcon from '@mui/icons-material/Language';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TiktokIcon from "../../assets/icons/tiktok.svg?react"
import RedditIcon from '@mui/icons-material/Reddit';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitchIcon from "../../assets/icons/twitch.svg?react"
import DiscordIcon from "../../assets/icons/discord.svg?react"

import tbvns from "./member/tbvns/tbvns.json"
import tbvnsShortEn from "./member/tbvns/short/en.md?raw"
import tbvnsShortFr from "./member/tbvns/short/fr.md?raw"
import dinaru from "./member/dinaru/dinaru.json"
import dinaruShortEn from "./member/dinaru/short/en.md?raw"
import dinaruShortFr from "./member/dinaru/short/fr.md?raw"

function Member({ member, shortFr, shortEn }) {
  const {t} = useTranslation();
  return (
    <div className={"member"} >
      <div>
        <img src={member.img1} className={"memberImgLeft"} />
        <h2>{t("global.langId") === "fr" ? member.name.fr : member.name.en}</h2>
        <div className={"member-short"}>
          <ReactMarkdown>{t("global.langId") === "fr" ? shortFr : shortEn}</ReactMarkdown>
        </div>
        <div className={"member-info"}>
          <div className={"member-info-box"}>
            <div className={"member-text-content"}>
              <div className={"member-social"}>
                <h2>Socials:</h2>
                {member.socials.web && <div className={"member-social-icons"}>
                  <a href={member.socials.web} ><LanguageIcon /></a>
                </div>}
                {member.socials.youtube && <div className={"member-social-icons"}>
                  <a href={member.socials.youtube} ><YouTubeIcon /></a>
                </div>}
                {member.socials.telegram && <div className={"member-social-icons"}>
                  <a href={member.socials.telegram} ><TelegramIcon /></a>
                </div>}
                {member.socials.tiktok && <div className={"member-social-icons"}>
                  <a href={member.socials.tiktok} ><TiktokIcon /></a>
                </div>}
                {member.socials.reddit && <div className={"member-social-icons"}>
                  <a href={member.socials.reddit} ><RedditIcon /></a>
                </div>}
                {member.socials.github && <div className={"member-social-icons"}>
                  <a href={member.socials.github} ><GitHubIcon /></a>
                </div>}
                {member.socials.x && <div className={"member-social-icons"}>
                  <a href={member.socials.x} ><XIcon /></a>
                </div>}
                {member.socials.twitch && <div className={"member-social-icons"}>
                  <a href={member.socials.twitch} ><TwitchIcon /></a>
                </div>}
                {member.socials.discord && <div className={"member-social-icons"}>
                  <a href={member.socials.discord} ><DiscordIcon /></a>
                </div>}
              </div>
              <h2>Role: <span className={"text-highlight"}>{t("global.langId") === "fr" ? member.status.fr : member.status.en}</span></h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Members() {
  const {t} = useTranslation()
  return (
    <Background fixed>
      <div className="members-root">
        <h1>{t("members.our-members")}</h1>
        <Member member={tbvns} shortFr={tbvnsShortFr} shortEn={tbvnsShortEn} />
        <Member member={dinaru} shortFr={dinaruShortFr} shortEn={dinaruShortEn} />
      </div>
    </Background>
  )
}