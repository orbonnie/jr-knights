export type Player = {
  slug: string;
  number: string;
  firstName: string;
  lastName: string;
  classYear: string;
  position: string;
  photo: string;
  height: string;
  weight: string;

  gpa?: number;

  bio?: string;
  hometown?: string;
  offers: string;

  gamesPlayed: number;
  tackles?: number;
  yards?: number;
  touchdowns?: number;

  bench?: number;
  squat?: number;
  deadlift?: number;
  clean?: number;
  forty?: number;

  hudlUrl?: string;
  instagramUrl?: string;
  xUrl?: string;
  highlightsUrl?: string;
};

export type HsGame = {
  date: string;
  isoDate: string;
  opponent: string;
  time: string;
  note: string;
  location: "vs" | "@" | "BYE" | "scrimmage";
  result: string;
  recording: string;
  team: "varsity" | "jv" | "freshman";
};

export type JrkPlayer = {
  name: string;
  number: number;
  position: string;
  grade: "6th" | "7th" | "8th";
};

export type JrkGame = {
  date: string;
  isoDate: string;
  opponent: string;
  time: string;
  note: string;
  location: "vs" | "@" | "BYE" | "TBD";
  result: string;
  grade: "6th" | "7th" | "8th";
};

export type Coach = {
  name: string;
  role: string;
  grade: "6th" | "7th" | "8th";
  photo?: string;
};

export type NewsStory = {
  title: string;
  description: string;
  image: string;
  href: string;
  date: string;
};

export type CalendarConfig = {
  id: string;
  name: string;
  color: string;
  group: string;
};

export type Sponsor = {
  name: string;
  href: string;
  logo?: string;
};

type SocialLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
  hover: string;
};

type AgreementModalProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  step: "view" | "sign";
  setStep: (v: "view" | "sign") => void;
};
