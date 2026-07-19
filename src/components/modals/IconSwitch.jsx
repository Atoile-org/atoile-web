import "./IconSwitch.css";

export default function IconSwitch({disabled = false, isSwitchOn, setSwitchOn, IconOn, IconOff}) {
  return (
    <button disabled={disabled} className="icon-switch" data-on={isSwitchOn} onClick={() => {setSwitchOn(!isSwitchOn)}}>
      {isSwitchOn ? (<IconOn />) : (<IconOff />)}
    </button>
  )
}