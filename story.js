/**
 * ==========================================================================
 * STORY DATA: THE CRIMSON BYPASS (ENGLISH VERSION)
 * ==========================================================================
 * Narrative script, branching choices, background visual tags, and audio
 * cues are stored here in a clean, modular JavaScript object.
 */

const storyData = {
  // ----------------------------------------------------------------------
  // SCENE 1: THE LONELY TRACK (PROLOGUE)
  // ----------------------------------------------------------------------
  OpeningScene1: {
    title: "PROLOGUE — THE LONELY TRACK",
    bgTag: "opening-bg",
    bgVideo: "videos/Download action essential blood effect.mp4",
    bgVideoBrightness: "140%",
    audio: {
      action: "playBGM",
      src: "audio/audiopapkin-ambient-soundscape-ps-001-344715.mp3",
      volume: 0.4,
    },
    // Text is split into an array for interactively paced step-by-step printing
    text: [
      "“People in Medan say the bypass remembers everything.”",
      {
        text: "“Especially the screams.”",
        sfx: "audio/jusatti890-scream-horror-sfx-490908.mp3",
        sfxVolume: 0.7,
        slowFade: true,
      },
      "Broken streetlights appear.",
      "A long, desolate bypass road stretches infinitely into the darkness outside Medan. Broken lamps flicker like dying stars above cracked, oil-stained asphalt. Giant, rusted container trucks sleep like dead monsters near warehouses from the Belawan industrial route.",
      "The night air feels warm, suffocating, and dirty. Far away, a faint, melancholic song echoes from a small roadside coffee shop, swallowed quickly by the hollow wind. A mosque speaker reverberates softly in the background, a distant reminder of a peaceful world that feels entirely out of reach.",
      {
        text: "Then—",
        clickSfx: "audio/mixkit-motorcycle-engine-doing-gearshift-2725.wav",
        clickSfxVolume: 0.8,
      },
      "<span class='blood-glow'>Two sharp, blood-red headlights pierce the distance.</span>",
      "The cold wind slams violently against my jacket, tearing at my clothes while my motorcycle cuts through the empty bypass. I glance nervously at the glowing clock on my phone mounted beside the handle.",
      "<strong>12:47 AM.</strong>",
      "Too late.",
      "My chest hurts from breathing in the freezing air. I should have taken the inside road home. It was longer, but crowded. But the bypass is faster, a straight shot home after a grueling, exhausting shift. At least… that’s what I foolishly thought earlier.",
      "The road tonight feels completely dead. Wrong. No angkot. No bright food stalls. No late-night university students. Even the usual street racers are gone, leaving only rows of dark, silent warehouses and rusted container trucks sitting beneath weak, decaying orange lights.",
      "My father’s severe warning suddenly crashes back into my mind.",
      "<blockquote>“Never trust the bypass after midnight. The shadows out there are always hungry.”</blockquote>",
      "I used to laugh whenever he said that, dismissing it as old superstition. Now, looking at the endless black void ahead, I understand why.",
      {
        text: "My phone vibrates violently against the handlebar.",
        clickSfx: "audio/soundmother.mp3",
        clickSfxVolume: 0.95
      },
      "<blockquote><strong>MOTHER:</strong> <em>“Are you still outside? Please hurry home.”</em></blockquote>",
      "Before my trembling thumb can even touch the screen to reply—",
      {
        text: "I notice headlights exploding in my cracked rearview mirror.",
        clickSfx: "audio/soundngebut.wav",
        clickSfxVolume: 0.9,
        clickSfxFadeIn: 2500
      },
      "Two motorcycles. Far away, but moving with terrifying speed. Very fast. Closing the gap like predators catching a scent.",
      "I look forward, praying, then look back into the mirror.",
      "They are much closer now.",
      "One rider flashes his high beams repeatedly, blinding me through the mirror. My throat goes completely dry; my chest tightens immediately.",
      "Maybe they just want to pass. Maybe I’m just paranoid.",
      "I move slightly to the shoulder of the road to let them through.",
      "But they don’t pass.",
      "They stay right behind me, perfectly matching my speed, tracking my every movement. The roar of their modified engines grows louder, vibrating through my own bike. One of them lets out a long, sharp, mocking whistle that cuts through the wind.",
      "Pure, unadulterated fear crawls slowly into my stomach.",
    ],
    choiceLayout: "cards",
    choices: [
      {
        text: "SPEED UP (Push the Throttle)",
        nextScene: "SpeedUp",
        sfx: "audio/motorcycle_roar.mp3",
        video: "videos/Speedup.mp4",
      },
      {
        text: "HIDE (Search for Shelter)",
        nextScene: "HideRoute",
        sfx: "audio/suaranafas.mp3",
        video: "videos/Hide.mp4",
      },
    ],
  },

  // ----------------------------------------------------------------------
  // SCENE: PATH A - SPEED UP
  // ----------------------------------------------------------------------
  SpeedUp: {
    title: "RUNNING BLIND",
    bgTag: "red-screen", // Blood-red screen flash trigger
    bgVideo: "videos/lv_0_20260524220013.mp4",
    bgVideoBrightness: "20%",
    audio: {
      action: "playSFX",
      src: "audio/motorcycle_roar.mp3",
      volume: 0.8,
    },
    text: [
      "I twist the throttle hard, pushing the engine to its absolute limit.",
      {
        text: "The motorcycle jumps forward violently.",
        clickSfx: "audio/soundngebut.wav",
        clickSfxVolume: 0.95,
        clickSfxFadeIn: 3000
      },
      {
        text: "<strong class='blood-glow'>90 km/h</strong>",
        autoAdvance: true,
        autoAdvanceDelay: 3000,
        align: "left",
        slowFade: true,
      },
      {
        text: "<strong class='blood-glow'>95 km/h</strong>",
        autoAdvance: true,
        autoAdvanceDelay: 3000,
        align: "left",
        slowFade: true,
      },
      {
        text: "<strong class='blood-glow'>96 km/h</strong>",
        autoAdvance: true,
        autoAdvanceDelay: 3000,
        align: "left",
        slowFade: true,
      },
      {
        text: "The bypass becomes a terrifying blur of flickering lights and dark shadows. Warm Medan air crashes brutally into my face while I fly past closed ruko buildings covered in faded banners and election posters.",
        clickSfx: "audio/darkjoy.mp3",
        clickSfxVolume: 0.95
      },
      {
        text: "Behind me—the hunters accelerate too, their engines screaming in dark joy.",
        clickSfx: "audio/soundculik.mp3",
        clickSfxVolume: 0.95
      },
      "<blockquote>“CHASE HIM! DON'T LET HIM REACH THE LIGHTS!” someone screams from behind.</blockquote>",
      "My heartbeat becomes louder than the engine.",
      "I nearly lose control after hitting a massive pothole near the industrial roadside. The motorcycle shakes violently beneath me. For one horrible, breathless second, I think I’m going to crash.",
      "But I stabilize the handles. Barely.",
      "The riders behind me laugh loudly, a cruel, mocking sound. They’re enjoying the hunt.",
    ],
    choices: [{ text: "Continue...", nextScene: "Scene2A" }],
  },

  // ----------------------------------------------------------------------
  // SCENE: PATH B - HIDE
  // ----------------------------------------------------------------------
  HideRoute: {
    title: "COWERING IN DARKNESS",
    bgTag: "dark-flicker",
    bgVideo: "videos/lv_0_20260524221653.mp4",
    bgVideoBrightness: "100%",
    bgVideoMuted: true,
    flashlight: true, // Turns on the flashlight effect dynamically
    audio: {
      action: "playSFX",
      src: "audio/suaranafas.mp3",
      volume: 0.9,
    },
    text: [
      "Panic takes over.",
      "I suddenly turn left, swerving into a narrow, unlit roadside area beside a closed, abandoned shop. I kill the engine instantly. Flipped the switch.",
      "Total silence.",
      {
        text: "Only the sound of my ragged, terrified breathing remains.",
        clickSfx: "audio/soundkayukayu.mp3",
        clickSfxVolume: 0.95
      },
      "I crouch low behind a stack of old wooden crates, trying to shrink into the shadows. The suffocating smell of stagnant rainwater, cheap cigarettes, and old cooking oil fills the air. Nearby, a broken Indomaret sign flickers weakly, buzzing like an angry insect.",
      "I pull out my phone with shaking, sweating hands.",
      "<strong class='blood'>No signal. Zero bars. Of course.</strong>",
      "Then—the heavy thud of engines grows closer.",
      {
        text: "<strong class='blood-glow'>Closer.</strong>",
        autoAdvance: true,
        autoAdvanceDelay: 1800,
        align: "left",
        slowFade: true,
      },
      {
        text: "<strong class='blood-glow'>Closer.</strong>",
        autoAdvance: true,
        autoAdvanceDelay: 1800,
        align: "left",
        slowFade: true,
      },
      {
        text: "<strong class='blood-glow'>Closer.</strong>",
        autoAdvance: true,
        autoAdvanceDelay: 1800,
        align: "left",
        slowFade: true,
      },
      "The headlights sweep across the cracked walls of the shop. A motorcycle stops just meters away. The engine idles loudly.",
      "Then, the heavy stomp of boots follows. Slow. Heavy. Deliberate.",
      "A voice, cold and sharp, cuts through the darkness.",
      "<blockquote>“He turned here. The engine heat is still fresh.”</blockquote>",
      "Another voice laughs quietly, devoid of any mercy.",
      "<blockquote>“Easy prey. Find him.”</blockquote>",
      "My body freezes completely. I stop breathing.",
    ],
    choices: [{ text: "Continue...", nextScene: "Scene2B" }],
  },

  // ----------------------------------------------------------------------
  // SCENE 2A: CONFLICT - RUN (PERSPECTIVE SHIFT)
  // ----------------------------------------------------------------------
  Scene2A: {
    title: "THE HUNTER'S VISOR",
    bgTag: "crimson-pulse",
    bgVideo: "videos/gemini_generated_video_7fb07571.mp4",
    bgVideoBrightness: "20%",
    bgVideoMuted: false, // Memutar suara asli dari dalam berkas video
    audio: {
      action: "playBGM",
      src: "audio/audiopapkin-ambient-soundscape-ps-001-344715.mp3",
      volume: 0.35,
    },
    text: [
      "The perspective shifts.",
      "Now I am riding on the backseat, trapped behind the Boss. The rusty metal pipe gripped in my trembling hand feels freezing cold despite the suffocating heat of the night.",
      "Ahead of us, the victim is speeding desperately, a lone silhouette fighting for his life.",
      "The Boss laughs loudly beneath his helmet, twisting the throttle tighter.",
      "<blockquote>“Look at him run! He’s scared to death already!”</blockquote>",
      "I stay silent, my jaw clenched.",
      "Streetlights flash across my dark visor over and over like a countdown clock while we race through the desolate bypass.",
      "The victim hits a pothole, his bike wobbling violently near a parked industrial truck. He almost goes down. For a split second, my heart stops.",
      "But somehow, he survives. Lucky. Or maybe, incredibly unlucky.",
      "My father used to drive an old, broken angkot near Amplas Terminal. Every single night he came home completely exhausted, smelling like cheap tobacco, gasoline, and heavy sweat.",
      "But no matter how poor we were, he always looked me dead in the eye and told me:",
      "<blockquote>“Poor people only have one thing left to keep them human, son. Their humanity. Never steal it from someone else.”</blockquote>",
      "The Boss suddenly violently elbows my ribs, snapping me back to reality.",
      "<blockquote>“Get the pipe ready! When I pull up next to him, you strike his arm! Knock him down!”</blockquote>",
      "I tighten my grip on the freezing pipe, but my stomach twists painfully.",
      "The victim glances back for a fraction of a second, his visor catching the weak orange light. Our eyes meet.",
      "And suddenly—he reminds me exactly of my younger brother. Same frightened eyes. Same desperate panic.",
      "The Boss accelerates harder, the roaring engine tearing through the night. The distance between us disappears completely. We are right on his tail.",
      "The Boss leans back slightly, his voice dropping into a dark threat.",
      "<blockquote>“After this, we split the money and buy your mother’s medicine. Don’t mess this up, kid. And stop acting like a coward.”</blockquote>",
      "My throat feels completely dry. He knows. He knows I’m hesitating.",
      "The victim suddenly turns sharply into a smaller, unpaved road beside unfinished, abandoned concrete structures.",
      "The Boss curses loudly, throwing the bike into a dangerous lean to follow.",
      "Now the road is narrower. Pitch black. One wrong movement here means a fatal crash.",
    ],
    choices: [
      {
        text: "SABOTAGE THE CHASE (Drop the Pipe)",
        nextScene: "Scene2AOptionA",
        sfx: "audio/metal_strike.mp3",
      },
      {
        text: "OBEY THE BOSS (Strike the Victim)",
        nextScene: "Scene2AOptionB",
      },
    ],
  },

  // ----------------------------------------------------------------------
  // SCENE 2B: CONFLICT - HIDE (PERSPECTIVE SHIFT)
  // ----------------------------------------------------------------------
  Scene2B: {
    title: "THE COLD ALLEY",
    bgTag: "green-screen", // CRT Terminal style shift
    bgVideo: "videos/lv_0_20260524221653.mp4",
    bgVideoBrightness: "100%",
    bgVideoMuted: true,
    flashlight: true, // Turns on the flashlight effect dynamically
    audio: {
      action: "playBGM",
      src: "audio/audiopapkin-ambient-soundscape-ps-001-344715.mp3",
      volume: 0.3,
    },
    text: [
      "The Boss slams on the brakes beside the abandoned shop. Dust rises like smoke around our headlights. The victim’s motorcycle is parked haphazardly against the wall. The engine is still clicking, radiating heat. Fresh tire marks cut through the dirt.",
      "The Boss grins under his mask, a sickening expression.",
      "<blockquote>“He’s hiding. He’s cornered himself.”</blockquote>",
      "I step off the backseat slowly, my boots sinking into the gravel.",
      "The area feels completely dead. Only the high-voltage electric cables buzz overhead, and distant stray dogs bark somewhere behind the concrete ruins.",
      "I grip the metal pipe tighter, but my chest feels like it’s being crushed under a mountain.",
      "My little brother still thinks I work honorable night shifts at a warehouse near Marelan. If he saw me standing in this dark alley right now—he would never look at me again.",
      "The Boss points a heavy finger toward the dark space behind stacked crates.",
      "<blockquote>“Check behind there. Drag him out.”</blockquote>",
      "I walk slowly into the darkness. Carefully. Silently. My boots making no sound.",
      "I turn the corner of the wooden crates. Then—I see him.",
      "The victim. He is crouching, trying to fuse with the shadows. He is completely terrified. His breathing is a ragged, shaky whisper. His hands are trembling so badly he can barely hold his helmet.",
      "For one endless second, neither of us moves. We just stare at each other.",
      "Suddenly—the Boss’s harsh voice shatters the silence from the entrance of the alley.",
      "<blockquote>“WHAT’S TAKING SO LONG?! IS HE THERE OR NOT? HURRY UP!”</blockquote>",
      "I freeze.",
      "If I help this kid escape, the Boss will immediately realize the betrayal. And the Boss is not the type of person who lets traitors live.",
      "The victim looks up at me, tears streaming down his face, and whispers a single, broken word:",
      "<blockquote>“Please…”</blockquote>",
      "That single word hits my chest harder than any weapon.",
    ],
    choices: [
      {
        text: "HELP HIM ESCAPE (Lie to the Boss)",
        nextScene: "Scene2BOptionA",
      },
      {
        text: "DRAG HIM TO THE BOSS (Obey the Command)",
        nextScene: "Scene2BOptionB",
        sfx: "audio/metal_strike.mp3",
      },
    ],
  },

  // ----------------------------------------------------------------------
  // RESOLUTION EPILOGUES
  // ----------------------------------------------------------------------
  Scene2AOptionA: {
    title: "EPILOGUE — A CHOICE OF CONSCIENCE",
    bgTag: "opening-bg",
    bgVideo: "videos/Download action essential blood effect.mp4",
    bgVideoBrightness: "140%",
    bgVideoMuted: true,
    text: [
      {
        text: "You deliberately drop the heavy metal pipe. It hits the tire with a loud metallic crash!",
        clickSfx: "audio/untukclang.mp3",
        clickSfxVolume: 0.9
      },
      "<span class='sfx'>CLANG!!! Motorcycle swerves wildly</span>",
      "The bike loses balance. The Boss curses loudly as you both crash hard onto the dirt, letting the victim speed away into the distant safety of Medan's city lights.",
      "You are bruised, and the Boss is furious, but as you look at the empty bypass road, your chest feels incredibly light.",
      "<em>You chose your conscience. The story for this prototype is complete. Thank you for playing!</em>",
    ],
    choices: [{ text: "Try Again", nextScene: "OpeningScene1" }],
  },
  Scene2AOptionB: {
    title: "EPILOGUE — LOST HUMANITY",
    bgTag: "red-screen",
    bgVideo: "videos/Download action essential blood effect.mp4",
    bgVideoBrightness: "140%",
    bgVideoMuted: true,
    text: [
      {
        text: "You close your eyes and strike with the heavy metal pipe.",
        clickSfx: "audio/sickening.mp3",
        clickSfxVolume: 0.95
      },
      "A sickening crack echoes through the wind. The victim's motorcycle flips violently, sending rider and steel sliding brutally across the oil-stained bypass asphalt.",
      "The Boss cheers in triumph, stopping the bike to strip the fallen rider of his belongings.",
      "You stand in the shadows, holding the heavy metal pipe in hands that will never feel clean again.",
      "<em>You chose the medicine for your mother, but lost your humanity. The story for this prototype is complete.</em>",
    ],
    choices: [{ text: "Try Again", nextScene: "OpeningScene1" }],
  },
  Scene2BOptionA: {
    title: "EPILOGUE — SILENT HERO",
    bgTag: "opening-bg",
    bgVideo: "videos/Download action essential blood effect.mp4",
    bgVideoBrightness: "140%",
    bgVideoMuted: true,
    text: [
      {
        text: "You look back toward the Boss, then turn your head and make eye contact with the boy.",
        clickSfx: "audio/silenthero.mp3",
        clickSfxVolume: 0.95
      },
      "You shake your head slightly, make a 'shh' motion, and turn back to walk out of the dark alley.",
      "<blockquote>“Nothing here, boss! Just some empty crates and a stray cat!” you shout.</blockquote>",
      "The Boss curses, kicks a stone in frustration, and tells you to get back on the bike to search the inside roads.",
      "In the dark corner of the alley, the victim survives another night, and you walk away with your humanity intact.",
      "<em>You saved the victim. The story for this prototype is complete. Thank you for playing!</em>",
    ],
    choices: [{ text: "Try Again", nextScene: "OpeningScene1" }],
  },
  Scene2BOptionB: {
    title: "EPILOGUE — THE COMPLIANT SOUL",
    bgTag: "red-screen",
    bgVideo: "videos/Download action essential blood effect.mp4",
    bgVideoBrightness: "140%",
    bgVideoMuted: true,
    text: [
      "<blockquote>“HE’S HERE!” you shout loudly.</blockquote>",
      "You grab the trembling boy's arm and drag him brutally out of the shadows. He cries, pleading for his life, but your grip remains tight.",
      "The Boss runs over, a cruel grin under his mask, raising a fist...",
      "You turn your face away, staring into the dark sky of Medan bypass, shutting your ears to the screams.",
      "<em>You surrendered the victim. The story for this prototype is complete.</em>",
    ],
    choices: [{ text: "Try Again", nextScene: "OpeningScene1" }],
  },
};
