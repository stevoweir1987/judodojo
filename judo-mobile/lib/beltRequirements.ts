/**
 * Belt progression requirements (BJA Mon Grade syllabus, simplified).
 * Edit these to match the official BJA syllabus PDFs.
 */

export type Requirement = { id: string; label: string };
export type BeltSection = { title: string; items: Requirement[] };
export type Belt = {
  id: string;       // stable id
  from: string;     // "6th Kyu (Red)"
  to: string;       // "5th Kyu (Yellow)"
  color: string;    // tailwind bg color
  sections: BeltSection[];
};

export const BELTS: Belt[] = [
  {
    id: "6-to-5",
    from: "6th Kyu",
    to: "5th Kyu (Yellow)",
    color: "#facc15",
    sections: [
      {
        title: "Fundamental Skills",
        items: [
          { id: "ukemi-back", label: "Ushiro-ukemi (back breakfall)" },
          { id: "ukemi-side", label: "Yoko-ukemi (side breakfall)" },
          { id: "ukemi-front", label: "Mae-ukemi (front breakfall)" },
          { id: "tachi-1", label: "O-soto-gari" },
          { id: "tachi-2", label: "O-goshi" },
          { id: "tachi-3", label: "Ippon-seoi-nage" },
          { id: "ne-1", label: "Kesa-gatame" },
          { id: "ne-2", label: "Yoko-shiho-gatame" },
        ],
      },
      {
        title: "Knowledge",
        items: [
          { id: "kn-rei", label: "Bowing etiquette (rei)" },
          { id: "kn-terms", label: "Basic terminology" },
        ],
      },
    ],
  },
  {
    id: "5-to-4",
    from: "5th Kyu (Yellow)",
    to: "4th Kyu (Orange)",
    color: "#fb923c",
    sections: [
      {
        title: "Fundamental Skills",
        items: [
          { id: "tachi-1", label: "Tai-otoshi" },
          { id: "tachi-2", label: "Harai-goshi" },
          { id: "tachi-3", label: "Uchi-mata" },
          { id: "ne-1", label: "Kami-shiho-gatame" },
          { id: "ne-2", label: "Tate-shiho-gatame" },
        ],
      },
      {
        title: "Performance Skills",
        items: [
          { id: "combo-1", label: "One renraku-waza (combination)" },
          { id: "counter-1", label: "One kaeshi-waza (counter)" },
        ],
      },
    ],
  },
  {
    id: "4-to-3",
    from: "4th Kyu (Orange)",
    to: "3rd Kyu (Green)",
    color: "#22c55e",
    sections: [
      {
        title: "Fundamental Skills",
        items: [
          { id: "tachi-1", label: "Ko-uchi-gari" },
          { id: "tachi-2", label: "O-uchi-gari" },
          { id: "tachi-3", label: "Sasae-tsurikomi-ashi" },
        ],
      },
      {
        title: "Performance Skills",
        items: [
          { id: "combo", label: "Two renraku-waza" },
          { id: "counter", label: "One kaeshi-waza" },
          { id: "ne", label: "One escape from osaekomi" },
        ],
      },
    ],
  },
  {
    id: "3-to-2",
    from: "3rd Kyu (Green)",
    to: "2nd Kyu (Blue)",
    color: "#3b82f6",
    sections: [
      {
        title: "Fundamental Skills",
        items: [
          { id: "tachi-1", label: "Tomoe-nage" },
          { id: "tachi-2", label: "Hane-goshi" },
          { id: "ne-1", label: "Juji-jime" },
          { id: "ne-2", label: "Hadaka-jime" },
        ],
      },
      {
        title: "Performance Skills",
        items: [
          { id: "combo", label: "Three renraku-waza" },
          { id: "counter", label: "Two kaeshi-waza" },
        ],
      },
    ],
  },
  {
    id: "2-to-1",
    from: "2nd Kyu (Blue)",
    to: "1st Kyu (Brown)",
    color: "#a16207",
    sections: [
      {
        title: "Fundamental Skills",
        items: [
          { id: "tachi-1", label: "Soto-makikomi" },
          { id: "tachi-2", label: "Ushiro-goshi" },
          { id: "ne-1", label: "Ude-garami" },
          { id: "ne-2", label: "Ude-hishigi-juji-gatame" },
        ],
      },
      {
        title: "Knowledge",
        items: [
          { id: "rules", label: "Contest rules summary" },
          { id: "moral", label: "Moral code of judo" },
        ],
      },
    ],
  },
];
