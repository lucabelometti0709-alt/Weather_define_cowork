import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import GrainRoundedIcon from "@mui/icons-material/GrainRounded";
import ThunderstormRoundedIcon from "@mui/icons-material/ThunderstormRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import WavesRoundedIcon from "@mui/icons-material/WavesRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import SignalWifiStatusbarConnectedNoInternet4Icon from "@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4";

function codeValue(code) {
  return Number(code);
}

export function getWeatherIcon(code) {
  const value = codeValue(code);

  if (value === 0 || value === 1 || value === 2) {
    return WbSunnyRoundedIcon;
  }

  if (value === 3) {
    return CloudRoundedIcon;
  }

  if (value >= 45 && value <= 48) {
    return WavesRoundedIcon;
  }

  if ((value >= 51 && value <= 67) || (value >= 80 && value <= 82)) {
    return GrainRoundedIcon;
  }

  if ((value >= 71 && value <= 77) || value === 85 || value === 86) {
    return AcUnitRoundedIcon;
  }

  if (value >= 95 && value <= 99) {
    return ThunderstormRoundedIcon;
  }

      return SignalWifiStatusbarConnectedNoInternet4Icon;
}

export function getWeatherTone(code) {
  const value = codeValue(code);

  if (value === 0 || value === 1 || value === 2) {
    return "#f1a94e";
  }

  if (value >= 51 && value <= 99) {
    return "#93c5fd";
  }

  return "#a8bcf5";
}