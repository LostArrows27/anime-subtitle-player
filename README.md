<div align="center">
  <a href="https://github.com/LostArrows27/anime-subtitle-player">
    <img src="https://i.pinimg.com/736x/0a/77/ab/0a77ab9b741887432031c9d0670ac3f3.jpg" alt="Logo" width="160" height="160">
  </a>
  <h3>Anime Subtitle Player</h3>
<div>Learn Japanese through Anime</div>
</div>

## 💬 About The Project

- Anime Subtitle Player is a video player that help people to learn Japanese through watching Anime with Japanese subtitle.

## ⏳ Timeline

- ✅ I started this project on Aug 6, 2023 because it's a bit annoying to use MKV player with a tab aside (it's make video too small 😠). Also, i want to make it easier for me to just hover directly to the subtitle in the video and get the definition of the word.

- ❌ I am not going to finish this project at a specific time cause i'm going to use this everyday and do more feature when i have time to make it better 😁.

## 📺 Preview

- In video subtitle

![image](https://github.com/LostArrows27/anime-subtitle-player/assets/97510841/840d8c55-337e-46c7-bd0a-47d3f66d8e98)

- Under video subtitle

![image](https://github.com/LostArrows27/anime-subtitle-player/assets/97510841/2face80e-c5e9-4305-b367-e4ddcfcf2562)

- Beside video subtitle

![image](https://github.com/LostArrows27/anime-subtitle-player/assets/97510841/c3c0b11a-252e-4804-8518-5783acb93048)

- Hover translation dictionary

![image](https://github.com/LostArrows27/anime-subtitle-player/assets/97510841/463ac839-f794-4b76-9364-e38df8d51504)

- Japanese's word dictionary (support Vietnamese and English)

![ image](https://github.com/LostArrows27/anime-subtitle-player/assets/97510841/42ea249c-e8cc-4505-a131-a1489a242d68)

- Kanji dictionary (support Vietnamese and English)

![image](https://github.com/LostArrows27/anime-subtitle-player/assets/97510841/e99c487d-4242-4dc3-949e-94f454f795ca)

- Subtitle Position setting

![image](https://github.com/LostArrows27/anime-subtitle-player/assets/97510841/b419c179-f719-4d81-bc09-a2f10285bf0f)

- Keyboard shortcut

![image](https://github.com/LostArrows27/anime-subtitle-player/assets/97510841/d55d924b-43c6-4075-b33d-cd2b43e56ff4)

- Subtitle setting

![image](https://github.com/LostArrows27/anime-subtitle-player/assets/97510841/d8ac54eb-3ea1-435c-8769-8c6d0acffeca)

- Subtitle's Synchronization setting

![image](https://github.com/LostArrows27/anime-subtitle-player/assets/97510841/fda15a7a-31fa-4ed9-bbe7-aefc90de110a)

## 📚 TODO

#### 1. Subtitle

- [ ] Supporting `.ass` subtitle file (handle multiple language)
- [ ] Auto translation (for no subtitle case)
- [ ] Silence + Music OP and ED identicator
- [ ] Font optimization using [next/font/google](https://www.youtube.com/watch?v=L8_98i_bMMA), [google font with tailwind](https://www.youtube.com/watch?v=VVRskhA2rug)

#### 2. Dicitonaries + Translation

- [ ] Input loading state + icon
- [ ] If not have definiton, ex: だから　さっき妖夢化した秋人君は => searching for "name" definition
- [ ] [Immersion Kit API](https://docs.immersionkit.com/public%20api/search) for anime sentence example
- [ ] Add card to Anki with exact audio time and image

#### 3. Video

- [ ] Add dowload screenshot with sub or not sub (using imageNext smth i forgot 😭)
- [ ] [playerIO](https://plyr.io/) player
- [ ] Support video link

#### 4. UI + main page

- [ ] Add "sample" video and subtitle for user
- [ ] Website name
- [ ] Store anime name and watch progress to ask next time if user watch same video
- [ ] Website main page with instruction + better README
- [ ] Add login + save word to dictionary with audio + image screenshot
- [ ] Export to anki word have saved

#### 5. Settings

- [ ] Add image bg for settings subtitle background opacity
- [ ] Save user's settting in local storage
- [ ] Changin subtitle color and text shadow color

## ✅ Finished Task

- [x] Handle subtitle logic
  - [x] Remove subtitle block when there's no dialogue
  - [x] Hover then pause
- [x] Add setting gears on top right screen as modal pop up
- [x] Making subtitle in 3 mode
  - [x] On the right of video
  - [x] Under video
  - [x] In video
- [x] Fix click at any subtitle in beside mode
- [x] Add ui when there's no sub
- [x] Change ion-icon to react icon
- [x] Add ui when there's no video
- [x] Subtitle being "lag" when forward video at specific time
- [x] Change subtitle font (Netflix-San, Yu-Gothic, Zen-Maru-Gothic)
- [x] Change font's weight (bold, thin);
- [x] Preview font option in settings
- [x] Change Font size
- [x] Adjust sub bg, font size, edit mode, sync slow fast, subtitle position (3 mode)
- [x] Subtitle Background
- [x] Toggle subtitle
- [x] Change js file to module and export
- [x] Synchrnization settings
- [x] Hover subtitle pause video
  - [x] In video
  - [x] Under video
  - [x] Beside video
- [x] Toggle text shadow
- [x] Adding Yu Gothic, Noto Font and MS Gothic
- [x] Furigana for subtitle
- [x] Fix render 2 time subtitle error
- [x] Add Whisper Model AI to subtitle Synchronization
- [x] Add larger screen feature like the old template + fix speed button not working + click button video stop error
- [x] Keyboard shortcut
- [x] keyboard shortcut UI
- [x] Instruction at screen + bocchi loading screen
- [x] Auto Sync subtitle with Video
- [x] Add in video subtitle along with beside subtitle
- [x] Add something when video haven't loaded
- [x] Break down sentence when hover
- [x] Storing sentence that have fetched to avoid fetching again
- [x] Storing each word that have fetched to avoid fetching again
- [x] "Translation" modal for each word when hovering
- [x] Add hover translation hover for word with 'each word translation i4"
- [x] Popup Dictionary Loading UI
- [x] Complete popup dicitonary Body
- [x] Add Shortcut instruction for this
- [x] Handle in auto sync if difference video file / not have subtitle (limit button click time)
- [x] File upload type limit (toast message)
- [x] next and prev subtitle error when sync ealier or later
- [x] Moving the translation feature to use everywhere on the screen too;
- [x] Fix word form error (Kyoukai no kanata - eps 10 - 9:57)
- [x] Multiple key click toggle translation
- [x] Fix main state hide and show length error
- [x] Fix can't click dicitonaries => click video instead
- [x] Open side bar dictionary with 2 mode (use ChakraUI's drawer)
  - [x] Vietnamese Dictionary word(Mazii)
  - [x] English Dictionary word(Mazii)
- [x] jaen kanji search mode
- [x] javi kanji searhc mode
