import ReactGA from "react-ga4";

type Params = {
  action: string;
  label: string;
};

const trackAnalyticEvent = ({ action, label }: Params) => {
  const category = "Notable";

  ReactGA.event({
    category,
    action,
    label,
  });
};

export default trackAnalyticEvent;
