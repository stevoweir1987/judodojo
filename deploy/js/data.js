const TECHNIQUES = [

  // ── TE-WAZA ─────────────────────────────────────────────────────────────────
  {name:"Ippon-seoi-nage",       en:"One-arm shoulder throw",            cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=OmKfUXAAdZ0"},
  {name:"Morote-seoi-nage",      en:"Two-arm shoulder throw",            cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=UjtL1h9htb8"},
  {name:"Eri-seoi-nage",         en:"Collar shoulder throw",             cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=vOpRNSg1O14"},
  {name:"Seoi-otoshi",           en:"Shoulder drop",                     cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=vu1TMVNnq34"},
  {name:"Tai-otoshi",            en:"Body drop",                         cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=DUiZ8JZkGx8"},
  {name:"Kata-guruma",           en:"Shoulder wheel",                    cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=cnHRhSy8yi4"},
  {name:"Te-guruma",             en:"Hand wheel",                        cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=P-4HUgB_rK4"},
  {name:"Sumi-otoshi",           en:"Corner drop",                       cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=lLU9wv52ni0"},
  {name:"Uki-otoshi",            en:"Floating drop",                     cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=6H5tmncOY4Q"},
  {name:"Yama-arashi",           en:"Mountain storm",                    cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=MGlyKmSuzdc"},
  {name:"Kibisu-gaeshi",         en:"Heel trip reversal",                cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=tJylJYfBliA"},
  {name:"Kuchiki-taoshi",        en:"Single leg takedown",               cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=ZNL47q1aJNY"},
  {name:"Morote-gari",           en:"Two-leg reap",                      cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=BHLQS4K85bs"},
  {name:"Sukui-nage",            en:"Scooping throw",                    cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=vU6aJ2kFxoI"},
  {name:"Obi-otoshi",            en:"Belt drop",                         cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=ff8U2TVZIYI"},
  {name:"Tsubame-gaeshi",        en:"Swallow counter",                   cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=GwweWqqFB5g"},
  {name:"Uchi-makikomi",         en:"Inner wraparound",                  cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=5BowcjduxVc"},
  {name:"Daki-age",              en:"High lift",                         cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=5lFXv3crN30"},
  {name:"Seoi-nage",             en:"Shoulder throw (overview)",         cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=eWEW9SfI5xg"},
  {name:"Ippon-seoi-otoshi",     en:"One-arm shoulder drop",             cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=VJ5WmoX0JPU"},
  {name:"Morote-seoi-otoshi",    en:"Two-arm shoulder drop",             cat:"Nage-waza",sub:"Te-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=9XbIoHXggT4"},

  // ── KOSHI-WAZA ──────────────────────────────────────────────────────────────
  {name:"O-goshi",               en:"Major hip throw",                   cat:"Nage-waza",sub:"Koshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=yhu1mfy2vJ4"},
  {name:"Uki-goshi",             en:"Floating hip",                      cat:"Nage-waza",sub:"Koshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=bPKwtB4lyOQ"},
  {name:"Tsuri-goshi",           en:"Lifting hip throw",                 cat:"Nage-waza",sub:"Koshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=51Htlp7xEvE"},
  {name:"Koshi-guruma",          en:"Hip wheel",                         cat:"Nage-waza",sub:"Koshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=SU7Id6uVJ44"},
  {name:"Tsurikomi-goshi",       en:"Lifting pulling hip throw",         cat:"Nage-waza",sub:"Koshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=McfzA0yRVt4"},
  {name:"Harai-goshi",           en:"Sweeping hip throw",                cat:"Nage-waza",sub:"Koshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=qTo8HlAAkOo"},
  {name:"Hane-goshi",            en:"Spring hip throw",                  cat:"Nage-waza",sub:"Koshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=M9_7De6A1kk"},
  {name:"Sode-tsurikomi-goshi",  en:"Sleeve lifting pulling hip throw",  cat:"Nage-waza",sub:"Koshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=QsmAxpmYLOI"},
  {name:"Utsuri-goshi",          en:"Hip shift",                         cat:"Nage-waza",sub:"Koshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=4pQd_bEnlf0"},
  {name:"Ushiro-goshi",          en:"Rear hip throw",                    cat:"Nage-waza",sub:"Koshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=ORIYstuxYT8"},
  {name:"O-tsuri-goshi",         en:"Major lifting hip throw",           cat:"Nage-waza",sub:"Koshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=oB3hwIbdzqM"},
  {name:"O-guruma",              en:"Large wheel",                       cat:"Nage-waza",sub:"Koshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=SnZciTAY9vc"},

  // ── ASHI-WAZA ───────────────────────────────────────────────────────────────
  {name:"Deashi-harai",          en:"Advancing foot sweep",              cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=4BUUvqxi_Kk"},
  {name:"Okuri-ashi-harai",      en:"Sliding foot sweep",                cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=nw1ZdRjrdRI"},
  {name:"Harai-tsurikomi-ashi",  en:"Lifting pulling foot sweep",        cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=gGPXvWL8VbE"},
  {name:"Sasae-tsurikomi-ashi",  en:"Lifting pulling ankle block",       cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=699i--pvYmE"},
  {name:"Hiza-guruma",           en:"Knee wheel",                        cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=JPJx9-oAVns"},
  {name:"Uchi-mata",             en:"Inner thigh throw",                 cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=iUpSu5J-bgw"},
  {name:"Ouchi-gari",            en:"Major inner reap",                  cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=0itJFhV9pDQ"},
  {name:"Ko-uchi-gari",          en:"Minor inner reap",                  cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=3Jb3tZvr9Ng"},
  {name:"Ko-uchi-gake",          en:"Minor inner hook",                  cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=v-bPmFsDU7A"},
  {name:"O-soto-gari",           en:"Major outer reap",                  cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=c-A_nP7mKAc"},
  {name:"Ko-soto-gari",          en:"Minor outer reap",                  cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=jeQ541ScLB4"},
  {name:"Ko-soto-gake",          en:"Minor outer hook",                  cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=8b6kY4s4zH4"},
  {name:"O-soto-otoshi",         en:"Major outer drop",                  cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=2DsVvDw7b8g"},
  {name:"O-soto-guruma",         en:"Major outer wheel",                 cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=92KbCm6pQeI"},
  {name:"O-uchi-barai",          en:"Major inner sweep",                 cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=g6N0ua1tV74"},
  {name:"Ashi-guruma",           en:"Leg wheel",                         cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=ROeayhvom9U"},
  {name:"O-uchi-gaeshi",         en:"Major inner reap counter",          cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=dCyZTXyjIXE"},
  {name:"Ko-uchi-gaeshi",        en:"Minor inner reap counter",          cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=_MWAdYi_LC4"},
  {name:"Hane-goshi-gaeshi",     en:"Spring hip throw counter",          cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=9bZAZSBtnGs"},
  {name:"Tai-otoshi-gaeshi",     en:"Body drop counter",                 cat:"Nage-waza",sub:"Ashi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=imECTzUV-vY"},

  // ── MA-SUTEMI-WAZA ──────────────────────────────────────────────────────────
  {name:"Tomoe-nage",            en:"Circle throw",                      cat:"Nage-waza",sub:"Ma-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=TON-fQk3aTc"},
  {name:"Hikikomi-gaeshi",       en:"Pulling sacrifice throw",           cat:"Nage-waza",sub:"Ma-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=92zUYWBp5N8"},
  {name:"Sumi-gaeshi",           en:"Corner reversal",                   cat:"Nage-waza",sub:"Ma-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=5VhduA5xkbA"},
  {name:"Tawara-gaeshi",         en:"Rice bag reversal",                 cat:"Nage-waza",sub:"Ma-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=TmTWgrmViZc"},
  {name:"Ura-nage",              en:"Rear throw",                        cat:"Nage-waza",sub:"Ma-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=Fgi9b8DJ5sQ"},
  {name:"Ko-uchi-makikomi",      en:"Small inner wrap-around throw",     cat:"Nage-waza",sub:"Ma-sutemi-waza",ko:"No", url:"https://www.youtube.com/watch?v=_1eygIXLD_w"},

  // ── YOKO-SUTEMI-WAZA ────────────────────────────────────────────────────────
  {name:"Yoko-otoshi",           en:"Side drop",                         cat:"Nage-waza",sub:"Yoko-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=MnNG67pF_a0"},
  {name:"Tani-otoshi",           en:"Valley drop",                       cat:"Nage-waza",sub:"Yoko-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=3b9Me3Fohpk"},
  {name:"Yoko-gake",             en:"Side hook",                         cat:"Nage-waza",sub:"Yoko-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=tP1Sj1uDfSo"},
  {name:"Yoko-guruma",           en:"Side wheel",                        cat:"Nage-waza",sub:"Yoko-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=MehP6I5cY2c"},
  {name:"Yoko-wakare",           en:"Side separation",                   cat:"Nage-waza",sub:"Yoko-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=bp1tscHlePI"},
  {name:"Uki-waza",              en:"Floating technique",                cat:"Nage-waza",sub:"Yoko-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=weVOpJ63gII"},
  {name:"Yoko-tomoe-nage",       en:"Side circle throw",                 cat:"Nage-waza",sub:"Yoko-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=9-byceOifXo"},
  {name:"Soto-makikomi",         en:"Outer wraparound",                  cat:"Nage-waza",sub:"Yoko-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=bWG9O1BVKtQ"},
  {name:"Kawazu-gake",           en:"One-leg entanglement",              cat:"Nage-waza",sub:"Yoko-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=-SQCIZFscNs"},
  {name:"Kani-basami",           en:"Crab scissors",                     cat:"Nage-waza",sub:"Yoko-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=OR-HGHnarYc"},
  {name:"Obi-tori-gaeshi",       en:"Belt grab reversal",                cat:"Nage-waza",sub:"Yoko-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=bpc82SrunUU"},
  {name:"Daki-wakare",           en:"Hug split (side sacrifice)",        cat:"Nage-waza",sub:"Yoko-sutemi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=Hr0cOMGBDYo"},
  {name:"Yoko-sumi-gaeshi",      en:"Side corner reversal",              cat:"Nage-waza",sub:"Yoko-sutemi-waza",ko:"No", url:"https://www.youtube.com/watch?v=TnvdcBbB0sA"},

  // ── MAKIKOMI-WAZA ───────────────────────────────────────────────────────────
  {name:"Harai-makikomi",        en:"Sweeping wraparound throw",         cat:"Nage-waza",sub:"Makikomi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=VBaHzKaCXss"},
  {name:"Hane-makikomi",         en:"Spring wraparound throw",           cat:"Nage-waza",sub:"Makikomi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=6CRBGLGz9j8"},
  {name:"Uchi-mata-makikomi",    en:"Inner thigh wraparound throw",      cat:"Nage-waza",sub:"Makikomi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=jZXENTLpJCI"},
  {name:"O-soto-makikomi",       en:"Major outer reap wraparound",       cat:"Nage-waza",sub:"Makikomi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=DGDv2oMwmas"},

  // ── KAESHI-WAZA (COUNTERS) ───────────────────────────────────────────────────
  {name:"O-soto-gaeshi",         en:"Major outer reap counter",          cat:"Nage-waza",sub:"Kaeshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=8ZjM3X_EANo"},
  {name:"Ko-soto-gaeshi",        en:"Minor outer reap counter",          cat:"Nage-waza",sub:"Kaeshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=8ZjM3X_EANo"},
  {name:"Harai-goshi-gaeshi",    en:"Sweeping hip throw counter",        cat:"Nage-waza",sub:"Kaeshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=4U3It-7PPsc"},
  {name:"Uchi-mata-gaeshi",      en:"Inner thigh throw counter",         cat:"Nage-waza",sub:"Kaeshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=Sy6sLWxkWYw"},
  {name:"Uchi-mata-sukashi",     en:"Inner thigh void (slip counter)",   cat:"Nage-waza",sub:"Kaeshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=V-RS3uhtVWM"},
  {name:"Uki-goshi-gaeshi",      en:"Floating hip counter",              cat:"Nage-waza",sub:"Kaeshi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=H_LVaa0t0DY"},

  // ── OSAEKOMI-WAZA (HOLDS) ───────────────────────────────────────────────────
  {name:"Kesa-gatame",           en:"Scarf hold",                        cat:"Katame-waza",sub:"Osaekomi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=NDaQuJOFBYk"},
  {name:"Hon-kesa-gatame",       en:"Main scarf hold",                   cat:"Katame-waza",sub:"Osaekomi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=Hqt_qagQWQw"},
  {name:"Kuzure-kesa-gatame",    en:"Broken scarf hold",                 cat:"Katame-waza",sub:"Osaekomi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=Q2fb9jaoUFQ"},
  {name:"Ushiro-kesa-gatame",    en:"Reverse scarf hold",                cat:"Katame-waza",sub:"Osaekomi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=SBapox2M2dE"},
  {name:"Kata-gatame",           en:"Shoulder hold",                     cat:"Katame-waza",sub:"Osaekomi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=zQR3IOXxO_Q"},
  {name:"Mune-gatame",           en:"Chest hold",                        cat:"Katame-waza",sub:"Osaekomi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=lIt5vywPBF0"},
  {name:"Kami-shiho-gatame",     en:"Upper four-corner hold",            cat:"Katame-waza",sub:"Osaekomi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=HFuMjOv0WN8"},
  {name:"Kuzure-kami-shiho-gatame",en:"Broken upper four-corner hold",  cat:"Katame-waza",sub:"Osaekomi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=YUrogQWdwiY"},
  {name:"Yoko-shiho-gatame",     en:"Side four-corner hold",             cat:"Katame-waza",sub:"Osaekomi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=TT7XJVSEQxA"},
  {name:"Kuzure-yoko-shiho-gatame",en:"Broken side four-corner hold",   cat:"Katame-waza",sub:"Osaekomi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=54fQM7dYz0M"},
  {name:"Tate-shiho-gatame",     en:"Vertical four-corner hold",         cat:"Katame-waza",sub:"Osaekomi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=XjWzNxlKH1M"},
  {name:"Sankaku-gatame",        en:"Triangular hold",                   cat:"Katame-waza",sub:"Osaekomi-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=Sh01Hgobdgw"},

  // ── SHIME-WAZA (STRANGLES) ───────────────────────────────────────────────────
  {name:"Nami-juji-jime",        en:"Normal cross choke",                cat:"Katame-waza",sub:"Shime-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=k2cHry9HByQ"},
  {name:"Gyaku-juji-jime",       en:"Reverse cross choke",               cat:"Katame-waza",sub:"Shime-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=t3tQriIPdlI"},
  {name:"Kata-juji-jime",        en:"Half cross choke",                  cat:"Katame-waza",sub:"Shime-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=3VZVUAmiMD8"},
  {name:"Hadaka-jime",           en:"Naked choke (rear naked choke)",    cat:"Katame-waza",sub:"Shime-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=9f0n8jez7iA"},
  {name:"Okuri-eri-jime",        en:"Sliding collar choke",              cat:"Katame-waza",sub:"Shime-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=EiqyoVcIAi8"},
  {name:"Kata-ha-jime",          en:"Single wing choke",                 cat:"Katame-waza",sub:"Shime-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=yaTGgRjnwB8"},
  {name:"Sankaku-jime",          en:"Triangle choke",                    cat:"Katame-waza",sub:"Shime-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=lq1CUBRAm7s"},
  {name:"Sode-guruma-jime",      en:"Sleeve wheel choke",                cat:"Katame-waza",sub:"Shime-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=E3nvQzClcAU"},
  {name:"Tsukkomi-jime",         en:"Thrust choke",                      cat:"Katame-waza",sub:"Shime-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=dKKpnD3eLcY"},
  {name:"Ryote-jime",            en:"Two-hand choke",                    cat:"Katame-waza",sub:"Shime-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=-RHC4V7TQiY"},
  {name:"Morote-jime",           en:"Two-handed collar choke",           cat:"Katame-waza",sub:"Shime-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=VbW71vPdZmg"},
  {name:"Ashi-jime",             en:"Leg choke",                         cat:"Katame-waza",sub:"Shime-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=fuDCkSjCON8"},

  // ── KANSETSU-WAZA (ARM LOCKS) ────────────────────────────────────────────────
  {name:"Juji-gatame",                   en:"Cross arm lock",            cat:"Katame-waza",sub:"Kansetsu-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=jOp5XyPd59M"},
  {name:"Ude-garami",                    en:"Entangled arm lock",        cat:"Katame-waza",sub:"Kansetsu-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=AIlTvZb4RlE"},
  {name:"Ude-hishigi-ude-gatame",        en:"Straight arm lock",         cat:"Katame-waza",sub:"Kansetsu-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=SBf0aTma1VI"},
  {name:"Ude-hishigi-hiza-gatame",       en:"Knee arm lock",             cat:"Katame-waza",sub:"Kansetsu-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=H2HtAJdiJcE"},
  {name:"Ude-hishigi-waki-gatame",       en:"Armpit arm lock",           cat:"Katame-waza",sub:"Kansetsu-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=8F5p1zuJRG0"},
  {name:"Ude-hishigi-hara-gatame",       en:"Stomach arm lock",          cat:"Katame-waza",sub:"Kansetsu-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=ZzEycg8R_9M"},
  {name:"Ude-hishigi-ashi-gatame",       en:"Leg arm lock",              cat:"Katame-waza",sub:"Kansetsu-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=ClY7g_pX-4s"},
  {name:"Ude-hishigi-te-gatame",         en:"Hand arm lock",             cat:"Katame-waza",sub:"Kansetsu-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=6DnvhY0tQVM"},
  {name:"Ude-hishigi-sankaku-gatame",    en:"Triangle arm lock",         cat:"Katame-waza",sub:"Kansetsu-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=WefAmW4azhk"},
  {name:"Ashi-garami",                   en:"Leg entanglement lock",     cat:"Katame-waza",sub:"Kansetsu-waza",ko:"Historically",url:"https://www.youtube.com/watch?v=BWWb0GoAtZw"},
  {name:"Waki-gatame",                   en:"Armpit arm lock (standing)", cat:"Katame-waza",sub:"Kansetsu-waza",ko:"Yes",url:"https://www.youtube.com/watch?v=OtqfF2D8kIc"},
  {name:"Kansetsu-waza overview",        en:"Complete arm lock guide",    cat:"Katame-waza",sub:"Kansetsu-waza",ko:"",  url:"https://www.youtube.com/watch?v=QtVipMcTsdw"},

  // ── COMBINATIONS (THROW → HOLD) ──────────────────────────────────────────────
  {name:"Tai-otoshi → Yoko-shiho-gatame",       en:"Body drop into side hold",          cat:"Combination",sub:"",ko:"",url:"https://www.youtube.com/watch?v=caXBWqLeW6I"},
  {name:"Ippon-seoi-nage → Kami-shiho-gatame",  en:"Shoulder throw into upper hold",    cat:"Combination",sub:"",ko:"",url:"https://www.youtube.com/watch?v=jBl0Q-Egbdg"},
  {name:"Ouchi-gari → Tate-shiho-gatame",       en:"Inner reap into vertical hold",     cat:"Combination",sub:"",ko:"",url:"https://www.youtube.com/watch?v=OH8PgkWGxQU"},

  // ── NE-WAZA — ESCAPES ─────────────────────────────────────────────────────────
  {name:"Escape from Kami-shiho-gatame (action & reaction)",   en:"Ne-waza escape",cat:"Ne-waza",sub:"Escape",ko:"",url:"https://www.youtube.com/watch?v=Hl0C4RRavHo"},
  {name:"Escape from Tate-shiho-gatame (clamp & roll)",        en:"Ne-waza escape",cat:"Ne-waza",sub:"Escape",ko:"",url:"https://www.youtube.com/watch?v=PV_anL347rw"},
  {name:"Escape from Yoko-shiho-gatame (trap, bridge & roll)", en:"Ne-waza escape",cat:"Ne-waza",sub:"Escape",ko:"",url:"https://www.youtube.com/watch?v=yK_GSamSPko"},

  // ── NE-WAZA — TURNOVERS ───────────────────────────────────────────────────────
  {name:"Turnover into Kesa-gatame (uke all fours)",        en:"Ne-waza turnover",cat:"Ne-waza",sub:"Turnover",ko:"",url:"https://www.youtube.com/watch?v=r-ODhj19vL0"},
  {name:"Turnover into Yoko-shiho-gatame (uke face-down)",  en:"Ne-waza turnover",cat:"Ne-waza",sub:"Turnover",ko:"",url:"https://www.youtube.com/watch?v=19TTB0bdL7w"},

  // ── KUMI-KATA (GRIPPING) ──────────────────────────────────────────────────────
  {name:"Standard grips — right and left",                  en:"Kumi-kata: right lapel, left sleeve standard",     cat:"Ne-waza",sub:"Gripping",ko:"",url:"https://www.youtube.com/watch?v=T6c_FpfVZy4"},
  {name:"Right vs left, double lapel, high collar grips",   en:"Kumi-kata: grip variations in contest",            cat:"Ne-waza",sub:"Gripping",ko:"",url:"https://www.youtube.com/watch?v=97djf2GY6I0"},

  // ── RANDORI ───────────────────────────────────────────────────────────────────
  {name:"Nage-komi in light randori",     en:"Repetitive throwing with cooperative partner",              cat:"Randori",sub:"Drills",ko:"",url:"https://www.youtube.com/watch?v=QUKkd08DT9M"},
  {name:"Randori — how to improve",       en:"Key principles for getting better in free practice",        cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/watch?v=wsDFpn_Yol0"},
  {name:"Randori highlights",             en:"Competition-level randori examples to study",               cat:"Randori",sub:"Drills",ko:"",url:"https://www.youtube.com/watch?v=6t3fTUPSxvQ"},
  {name:"Randori mistakes to avoid",      en:"Common errors in free practice — what not to do",          cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/watch?v=68a6896ZhOo"},
  {name:"Relaxing in randori",            en:"Stay loose — tension kills technique and speed",            cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/shorts/gIqNLmF09Mo"},
  {name:"Randori tips — short",           en:"Quick tactical tips for free practice",                    cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/shorts/zUidSlnJktk"},
  {name:"Footsweeps in randori",          en:"Using ashi-waza effectively in free practice",             cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/watch?v=73ym6D0MdpE"},
  {name:"Randori tips — tactical",        en:"Tactical awareness and strategy in free practice",         cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/watch?v=ndaPVAgFo-0"},
  {name:"Randori demonstration",          en:"Full randori demo — watch the timing and kuzushi",         cat:"Randori",sub:"Drills",ko:"",url:"https://www.youtube.com/watch?v=JCFO2BeL1oU"},
  {name:"Attack-first principle",              en:"Always be the initiator — passive judo earns shido",         cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/watch?v=RxWxPp-wTfw"},
  {name:"Kuzushi before everything",           en:"Break balance first, every time — strength follows timing",   cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/watch?v=luK9Eklbn78"},
  {name:"5 basic combination setups",          en:"Core combination patterns every judoka should drill",         cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/watch?v=VFOUp-nQpqM"},
  {name:"Tai-otoshi combination setup",        en:"Setting up tai-otoshi with feints and foot movement",         cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/watch?v=u34wRSY-suM"},
  {name:"O-soto-gari combination setup",       en:"Building combos around the major outer reap",                cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/watch?v=BIrhmaUkB_8"},
  {name:"Seoi-nage combination setup",         en:"Entering seoi-nage from combination attacks",                 cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/watch?v=uPXB-60B7f0"},
  {name:"O-goshi competition variations",      en:"How top players adapt o-goshi in contest",                   cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/watch?v=oXTwNVxaka8"},
  {name:"Seoi-nage competition variations",    en:"Competition entries and grips for seoi-nage",                cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/watch?v=qo-3PNAIaPQ"},
  {name:"O-soto-gari competition variations",  en:"How elite judoka score with o-soto-gari",                   cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/watch?v=wm1n4c9d1pE"},
  {name:"O-soto-gari combos",                  en:"Combination sequences built around o-soto-gari",             cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/watch?v=OHMgiC3taZA"},
  {name:"Setting up throws in competition",    en:"Tactical tips for landing throws on resisting opponents",    cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/watch?v=dpPfPnjJUQ4"},
  {name:"Epic judo combinations",              en:"High-level combination sequences to study and copy",         cat:"Randori",sub:"Drills",ko:"",url:"https://www.youtube.com/watch?v=gud7OWhiF5k"},
  {name:"Technical gripping",                  en:"How to grip efficiently and control the contest from kumi-kata",cat:"Randori",sub:"Tips",ko:"",url:"https://www.youtube.com/watch?v=6xBOG8Y-V04"},
  {name:"Moving in randori",                   en:"Footwork patterns — how to move to create throwing opportunities",cat:"Randori",sub:"Tips",ko:"",url:"https://www.youtube.com/watch?v=j-WQ4c7EQW0"},
  {name:"Orange belt grading demo",            en:"Full orange belt grading — techniques and performance standard",cat:"Randori",sub:"Grading",ko:"",url:"https://www.youtube.com/watch?v=1Bi6nDBdWr0"},
  {name:"5 basic throws everyone should know", en:"The five fundamental throws for any beginner to master",     cat:"Randori",sub:"Tips",  ko:"",url:"https://www.youtube.com/watch?v=KFhiz7dcEkM"},
  {name:"Real ippons in competition",          en:"Full ippon scores — study the timing, kuzushi and commitment",cat:"Randori",sub:"Drills",ko:"",url:"https://www.youtube.com/watch?v=UfbCwy7-CgQ"},

  // ── UKEMI (BREAKFALLS) ───────────────────────────────────────────────────────
  {name:"Mae-ukemi",             en:"Front breakfall",                   cat:"Ukemi",sub:"Ukemi",ko:"Yes",url:"https://www.youtube.com/watch?v=veM5RFdjo0U"},
  {name:"Ushiro-ukemi",         en:"Back breakfall",                    cat:"Ukemi",sub:"Ukemi",ko:"Yes",url:"https://www.youtube.com/watch?v=_g7rvsxTkz8"},
  {name:"Yoko-ukemi",           en:"Side breakfall",                    cat:"Ukemi",sub:"Ukemi",ko:"Yes",url:"https://www.youtube.com/watch?v=JCwK1Ia4jsc"},
  {name:"Mae-mawari-ukemi",     en:"Forward rolling breakfall",         cat:"Ukemi",sub:"Ukemi",ko:"Yes",url:"https://www.youtube.com/watch?v=kbiLot6laks"},
  {name:"Ukemi overview",       en:"All breakfalls — beginner guide",   cat:"Ukemi",sub:"Ukemi",ko:"",  url:"https://www.youtube.com/watch?v=LhU8Dpu9aTE"},

  // ── EXERCISE VIDEOS ───────────────────────────────────────────────────────────
  {name:"Speed & agility for judo",       en:"Speed-focused training session",                           cat:"Exercise",sub:"Speed",   ko:"",url:"https://www.youtube.com/shorts/gIqNLmF09Mo"},
  {name:"Weight training for judo",       en:"Judo-specific weight exercises — short",                   cat:"Exercise",sub:"Weights", ko:"",url:"https://www.youtube.com/shorts/8AJc_8y_r8Y"},
  {name:"Judo strength program",          en:"Full weight training program for judo athletes",           cat:"Exercise",sub:"Weights", ko:"",url:"https://www.youtube.com/watch?v=uBy2yLDhSKY"},
  {name:"Uchi-komi partner drilling",     en:"Partner uchikomi session — entries and timing",            cat:"Exercise",sub:"Uchi-komi",ko:"",url:"https://www.youtube.com/watch?v=oBVMQRLv4dw"},
  {name:"Uchi-mata drilling",             en:"Uchi-mata specific drill session — entries and variations", cat:"Exercise",sub:"Uchi-komi",ko:"",url:"https://www.youtube.com/watch?v=eVcitLTY604"},
  {name:"HIIT for judo",                  en:"High intensity interval training — judo-focused",          cat:"Exercise",sub:"HIT",     ko:"",url:"https://www.youtube.com/watch?v=sJMy8XjVl6c"},
  {name:"Solo judo training",             en:"Judo movements you can train alone at home",               cat:"Exercise",sub:"Solo",    ko:"",url:"https://www.youtube.com/watch?v=eyeRo00P2pI"},
  {name:"Solo judo throw practice",       en:"Solo throw entry and movement drills",                     cat:"Exercise",sub:"Solo",    ko:"",url:"https://www.youtube.com/watch?v=ArleC9QIcOc"},
  {name:"Judo footwork drills",           en:"Foot movement patterns and agility for judo",              cat:"Exercise",sub:"Solo",    ko:"",url:"https://www.youtube.com/watch?v=87Ox-dF9X4Y"},
];

const BELT_DATA = [
  {
    id:"toYellow",label:"6th Kyu → 5th Kyu",from:"Red",to:"Yellow",
    fromColor:"belt-color-red",toColor:"belt-color-yellow",duration:"Typically 3–6 months",
    groups:[
      {title:"Fundamental — Ukemi",items:["Mae Ukemi (Front Breakfall)"]},
      {title:"Fundamental — Tachi-waza",items:["Tai-otoshi","Ippon-seoi-nage","Ouchi-gari"]},
      {title:"Fundamental — Osaekomi-waza",items:["Yoko-shiho-gatame","Tate-shiho-gatame","Kami-shiho-gatame"]},
      {title:"Performance — Transitions",items:["Tai-otoshi → Yoko-shiho-gatame","Ippon-seoi-nage → Kami-shiho-gatame","Ouchi-gari → Tate-shiho-gatame"]},
      {title:"Performance — Ne-waza",items:["Escape from Kami-shiho-gatame (action & reaction)","Escape from Tate-shiho-gatame (clamp & roll)","Escape from Yoko-shiho-gatame (trap, bridge & roll)","Turnover into Kesa-gatame (uke all fours)","Turnover into Mune-gatame (uke all fours)","Turnover into Yoko-shiho-gatame (uke face-down)"]},
      {title:"Performance — Kumi-kata",items:["Right & left standard grips","Right vs left, double lapel, high collar grips"]},
      {title:"Performance — Nage-komi & Randori",items:["Nage-komi in light randori (~2 min)","Alternating throws both sides with partner"]},
      {title:"Personal Choice",items:["One additional tachi-waza of choice","One additional ne-waza of choice"]},
      {title:"Knowledge — Contest Rules",items:["Give two examples of actions against the contest rules"]},
      {title:"Moral Code",items:["Courtesy","Courage","Honesty","Honour","Modesty","Respect","Self-control","Friendship"]}
    ]
  },
  {
    id:"toOrange",label:"5th Kyu → 4th Kyu",from:"Yellow",to:"Orange",
    fromColor:"belt-color-yellow",toColor:"belt-color-orange",duration:"Typically 6–12 months",
    groups:[
      {title:"Fundamental — Tachi-waza",items:["Tsurikomi-goshi","O-goshi","Seoi-otoshi","Morote-seoi-nage","Ko-uchi-gari","Ko-soto-gake","Ko-soto-gari","O-soto-gari"]},
      {title:"Performance — Combinations",items:["Ouchi-gari → Ko-uchi-gari","Ko-uchi-gari → O-soto-gari","Ko-uchi-gari → Morote-seoi-nage","Ippon-seoi-nage → Ko-uchi-gari","Any technique combined with Seoi-otoshi or Ko-uchi-gari"]},
      {title:"Performance — Counters",items:["Ouchi-gari countered by Tsurikomi-goshi","Tai-otoshi countered by Ko-soto-gari"]},
      {title:"Performance — Ne-waza",items:["Escape from Kesa-gatame (bridge & roll)","Move into Kesa-gatame from between uke's legs","Move into Yoko-shiho-gatame from between uke's legs","Arm roll — uke approaching from front","Arm roll — uke approaching from behind","Turnover from underneath into Tate-shiho-gatame"]},
      {title:"Performance — Randori",items:["Randori demonstration (~3 min)","Variety of techniques & kumi-kata","Throws to both sides where possible"]},
      {title:"Personal Choice",items:["Two tachi-waza of choice","One ne-waza of choice","Show as combination, counter, and ne-waza transition"]},
      {title:"Knowledge — Terminology",items:["Ko-soto-gake — Minor Outer Hook","Ko-soto-gari — Minor Outer Reap","Ko-uchi-gari — Minor Inner Reap","Morote-seoi-nage — Two-Handed Shoulder Throw","O-goshi — Major Hip Throw","O-soto-gari — Major Outer Reap","Seoi-otoshi — Shoulder Drop","Tsurikomi-goshi — Drawing Hip Throw","Shido — Official warning","Hansoku-make — Disqualification"]},
      {title:"Knowledge — Referee Signals",items:["Mate","Osaekomi","Toketa","Adjusting the judogi"]}
    ]
  },
  {
    id:"toGreen",label:"4th Kyu → 3rd Kyu",from:"Orange",to:"Green",
    fromColor:"belt-color-orange",toColor:"belt-color-green",duration:"Typically 12–18 months",
    groups:[
      {title:"Fundamental — Tachi-waza",items:["Kata-guruma","Sumi-otoshi","Uki-otoshi","Kibisu-gaeshi","Sukui-nage"]},
      {title:"Fundamental — Ne-waza",items:["Kesa-gatame","Yoko-tate-shiho-gatame","Kata-gatame"]},
      {title:"Performance — Combinations",items:["O-goshi → Kesa-gatame","Tai-otoshi → Kesa-gatame","Ko-soto-gari → Yoko-shiho-gatame"]},
      {title:"Performance — Counters",items:["Ko-uchi-gari countered by Hane-goshi","Ouchi-gari countered by Uchi-mata"]},
      {title:"Performance — Ne-waza",items:["Escape from Kesa-gatame (shifting weight)","Escape from Kata-gatame (bridge & roll)","Sweep from Kesa-gatame to uke's back position"]},
      {title:"Performance — Randori",items:["Randori demonstration (~4 min)","Variety of standing & ground techniques","Show awareness of scoring opportunities"]},
      {title:"Personal Choice",items:["One tachi-waza of choice","One ne-waza of choice — correct timing & situation"]},
      {title:"Knowledge — Scoring",items:["Ippon — Full point","Waza-ari — Half point","Yuko — Minor point"]},
      {title:"Knowledge — Moral Code",items:["Explain: Jita Kyoei (Mutual Welfare & Benefit)","Explain: Seiryoku Zenyo (Maximum Efficiency)"]},
      {title:"Knowledge — Referee Signals",items:["Ippon","Waza-ari","Yuko","Shido","Mate","Hajime","Sono-mama","Toketa"]}
    ]
  },
  {
    id:"toBlue",label:"3rd Kyu → 2nd Kyu",from:"Green",to:"Blue",
    fromColor:"belt-color-green",toColor:"belt-color-blue",duration:"Typically 18–24 months",
    groups:[
      {title:"Fundamental — Tachi-waza",items:["Uchi-mata","Harai-goshi","Hane-goshi","Ushiro-goshi","O-soto-guruma","Ashi-guruma"]},
      {title:"Fundamental — Ne-waza",items:["Held down for 25 seconds in any hold"]},
      {title:"Performance — Combinations",items:["Uchi-mata → O-goshi","O-goshi → Kesa-gatame","Ko-soto-gari → Uchi-mata"]},
      {title:"Performance — Counters",items:["Uchi-mata countered by Sode-tsurikomi-goshi","Ouchi-gari countered by Uki-goshi"]},
      {title:"Performance — Ne-waza",items:["Transition from Kesa-gatame to Kata-gatame","Sweep from guard to uke's back","Apply Shime-waza from back control"]},
      {title:"Performance — Randori",items:["Randori demonstration (~5 min)","At least one scoring technique","Show control & tactical awareness"]},
      {title:"Personal Choice",items:["Two tachi-waza of choice","One ne-waza of choice — realistic contest situation"]},
      {title:"Knowledge",items:["Explain Golden Score (Overtime)","Describe prohibited acts in competition","Explain role of referee & judges","Tori — person executing","Uke — person receiving","Shime-waza — strangulation","Kansetsu-waza — joint lock"]}
    ]
  },
  {
    id:"toBrown",label:"2nd Kyu → 1st Kyu",from:"Blue",to:"Brown",
    fromColor:"belt-color-blue",toColor:"belt-color-brown",duration:"Typically 24–36 months",
    groups:[
      {title:"Fundamental — Tachi-waza",items:["Tani-otoshi","Yoko-gake","Yoko-guruma","Tomoe-nage","Ura-nage","Sumi-gaeshi"]},
      {title:"Fundamental — Ne-waza",items:["Apply Kansetsu-waza (arm lock) safely","Multiple transitions between holds","Hold uke for 30 seconds in any ne-waza technique"]},
      {title:"Performance — Combinations",items:["Tai-otoshi → Uchi-mata","O-goshi → Ura-nage","Ouchi-gari → Tani-otoshi"]},
      {title:"Performance — Counters",items:["Tai-otoshi countered by Harai-goshi","O-goshi countered by Sukui-nage"]},
      {title:"Performance — Ne-waza",items:["Complete ne-waza sequence both sides","Transition from pin to strangulation","Apply joint lock from various positions"]},
      {title:"Performance — Randori",items:["Randori demonstration (~6 min)","Multiple scoring opportunities","Advanced tactical awareness & strategy"]},
      {title:"Personal Choice",items:["Three tachi-waza of choice","One ne-waza of choice — mastery in randori situations"]},
      {title:"Knowledge",items:["Ne-waza no Kakari (ground attack rules)","Rules for dangerous techniques","Juji-jime — Cross strangulation","Gyaku-jime — Reversed strangulation","Ude-gatame — Arm entrapment","Philosophical principles of Judo","How Judo applies to daily life"]}
    ]
  }
];

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

// ── EXERCISE LIBRARY ───────────────────────────────
const EXERCISES = [
  // UCHI-KOMI
  { name: 'Shadow Uchikomi',        cat: 'Uchi-komi',    note: 'Full entry movement solo — both sides. Perfect reps build the reflex.' },
  { name: 'Band Uchikomi',          cat: 'Uchi-komi',    note: 'Loop resistance band at lapel height on door. Drive through the full entry.' },
  { name: 'Moving Uchikomi',        cat: 'Uchi-komi',    note: 'Attack while stepping — never throw from standing still. Step in, step in, attack.' },
  { name: 'Ko-uchi Uchikomi',       cat: 'Uchi-komi',    note: 'Isolate the minor reap entry. Load the step, not just the foot.' },
  { name: 'Seoi-nage Uchikomi',     cat: 'Uchi-komi',    note: 'Hip height. Elbows tight. Turn fully. Feel the load before you stop.' },
  { name: 'O-soto Uchikomi',        cat: 'Uchi-komi',    note: 'Pull the sleeve hard before the reap — kuzushi first, leg second.' },
  { name: 'Combo Uchikomi',         cat: 'Uchi-komi',    note: 'Two-throw combo entries. Ko-uchi → O-soto, or Ko-uchi → Seoi. First attack creates the reaction.' },
  { name: 'Nagekomi (partner)',      cat: 'Uchi-komi',    note: 'Full throw with a partner. Crash mat or tatami. Commit — no half-throws.' },

  // GRIP STRENGTH
  { name: 'Towel Pull-ups',         cat: 'Grip Strength', note: 'Drape towel over bar, grip each end. Brutal on grip endurance — the judo standard.' },
  { name: 'Dead Hang',              cat: 'Grip Strength', note: 'Hang from bar, arms straight, full bodyweight. Hold for time. Builds grip endurance fast.' },
  { name: 'Isometric Gi Hold',      cat: 'Grip Strength', note: 'Grip belt or rolled towel, squeeze max for 30s. Don\'t let go — simulate contest grip.' },
  { name: 'Plate Pinch',            cat: 'Grip Strength', note: 'Pinch two plates between fingers and thumb, carry or hold. Trains the pinch used in sleeve grip.' },
  { name: 'Wrist Roller',           cat: 'Grip Strength', note: 'Roll weight up, lower slow. Both directions. Hits wrist flexors and extensors.' },
  { name: 'Rice Bucket',            cat: 'Grip Strength', note: 'Plunge hand in rice, open and close. 2–3 min continuous. Rehab and strength combined.' },
  { name: 'Gi Pull-ups',            cat: 'Grip Strength', note: 'Grip actual gi jacket draped over bar. Replicates exact contest grip demands on fingers.' },
  { name: 'Finger Extension Band',  cat: 'Grip Strength', note: 'Loop band around fingers, extend outward. Balances grip muscles — prevents injury.' },
  { name: 'Rope Climb (arms only)', cat: 'Grip Strength', note: 'Climb using arms only, no legs. If no rope, towel over pull-up bar. Ultimate grip builder.' },

  // JUDO STRENGTH
  { name: 'Judo Squats',            cat: 'Strength',      note: 'Shoulder-width, judo stance. Explosive up, controlled down. Builds throw drive.' },
  { name: 'Explosive Pushups',      cat: 'Strength',      note: 'Chest to floor, fast off the ground. Hands leave the floor at the top.' },
  { name: 'Bent-over Rows',         cat: 'Strength',      note: 'Drive elbow back hard. Mimics the sleeve/lapel pull needed for throws.' },
  { name: 'Romanian Deadlift',      cat: 'Strength',      note: 'Hip hinge, hamstrings loaded. Translates directly to hip drive in throws.' },
  { name: 'Kettlebell Swing',       cat: 'Strength',      note: 'Hip snap — same explosive pattern as throw entry. Keep back flat.' },
  { name: 'Turkish Get-up',         cat: 'Strength',      note: 'Floor to standing, controlled. Builds ne-waza transition strength and stability.' },
  { name: 'Pull-ups',               cat: 'Strength',      note: 'Full range, dead hang start. Core and lats — essential for pinning and throwing.' },
  { name: 'Single-leg Deadlift',    cat: 'Strength',      note: 'Balance and hip stability. Helps planted foot in ashi-waza throws.' },

  // CONDITIONING
  { name: 'Sprawls',                cat: 'Conditioning',  note: 'Drop hips fast and low. React immediately — don\'t pause to think.' },
  { name: 'Burpee + Shadow Throw',  cat: 'Conditioning',  note: 'Up from burpee, straight into shadow entry. Simulates randori scramble pace.' },
  { name: 'Fast Footwork',          cat: 'Conditioning',  note: 'Light on toes, quick short steps, stay in judo stance the whole time.' },
  { name: 'Shuttle Sprints',        cat: 'Conditioning',  note: '5m out and back × 6. Short explosive efforts — matches randori energy system.' },
  { name: '30s On / 15s Off',       cat: 'Conditioning',  note: 'Max effort shadow uchikomi ON, recovery walk OFF. Repeat × 6–8 rounds.' },
  { name: 'Bear Crawl',             cat: 'Conditioning',  note: 'Hips low, move fluidly. Builds ne-waza movement patterns and core stability.' },
  { name: 'Jump Squats',            cat: 'Conditioning',  note: 'Explosive — land soft and absorb. Builds ashi-waza snap.' },

  // MOBILITY
  { name: 'Hip Circles',            cat: 'Mobility',      note: 'Large, slow circles both ways. Open the hips — essential before any throwing work.' },
  { name: 'Deep Squat Hold',        cat: 'Mobility',      note: 'Hold the bottom position, chest up. Grip a doorframe for support if needed.' },
  { name: 'Shoulder CARs',          cat: 'Mobility',      note: 'Controlled full-range shoulder rotations — slow. Prevents the rotator damage judo causes.' },
  { name: 'Thoracic Rotation',      cat: 'Mobility',      note: 'Thread the needle or seated twist. Keeps throw entry rotation sharp.' },
  { name: 'Neck Rolls',             cat: 'Mobility',      note: 'Slow, full range. Judo puts huge demand on the neck — keep it mobile and strong.' },
  { name: 'Hip Flexor Stretch',     cat: 'Mobility',      note: 'Deep lunge, tuck pelvis under. Essential for full extension in throws.' },
  { name: 'Shoulder Dislocates',    cat: 'Mobility',      note: 'Band or stick overhead and behind. Opens thoracic spine and shoulders.' },

  // RANDORI PRACTICE
  { name: 'Light Randori (3 min)',   cat: 'Randori',      note: 'Full pace but controlled — attack every 30s minimum. No passive gripping allowed.' },
  { name: 'Ne-waza Randori',         cat: 'Randori',      note: 'Ground only from seated position. Work turnovers, pins, escapes. 2–3 min each way.' },
  { name: 'Grip Fighting Randori',   cat: 'Randori',      note: 'Focus entirely on grip — establish yours, break theirs, repeat. No throws, just gripping.' },
  { name: 'Combination Randori',     cat: 'Randori',      note: 'Every attack must be part of a 2-throw combo. First attack creates the reaction — commit to the second.' },
  { name: 'Positional Drilling',     cat: 'Randori',      note: 'Attacker tries to hold for 10s, defender escapes. Switch roles each round. Sharp ne-waza builder.' },
  { name: '1-Minute Blasts',         cat: 'Randori',      note: 'Maximum effort randori for 60s, full recovery, repeat × 5. Builds the randori-specific gas tank.' },
  { name: 'Shadow Randori',          cat: 'Randori',      note: 'Solo: visualise an opponent, move and attack. Work your best combinations. 3–5 min.' },
  { name: 'Situational Randori',     cat: 'Randori',      note: 'Start from a specific grip or position each time. Drill the entry from that exact situation.' },
];
