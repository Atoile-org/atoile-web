import "./IconSwitch.css";

export default function IconSwitch({isSwitchOn, setIsSwitchOn, IconOn, IconOff}) {
  return (
    <button className="icon-switch" data-on={isSwitchOn} onClick={() => {setIsSwitchOn(!isSwitchOn)}}>
      {isSwitchOn ? (<IconOn />) : (<IconOff />)}
    </button>
  )
}