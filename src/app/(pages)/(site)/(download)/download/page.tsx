import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { siteURL } from "@/lib/utils/constants/urls";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Download Pokémon Infinite Fusion v6.2.4 | Official Links and Guides',
  description: 'Get the official download links for Pokémon Infinite Fusion v6.2.4. Learn how to install on Windows, Mac, Linux, and Steam Deck. Follow our guides for a smooth gaming experience.',
  keywords: 'Pokémon Infinite Fusion, download, installation guide, Windows, Mac, Linux, Steam Deck, official download, video game, sprites, gaming community',
  openGraph: {
    title: 'Download Pokémon Infinite Fusion v6.2.4 | Official Links and Guides',
    description: 'Official download links and installation instructions for Pokémon Infinite Fusion v6.2.4. Compatible with Windows, Mac, Linux, and Steam Deck.',
    url: 'https://yourwebsite.com/download-pokemon-infinite-fusion',
    siteName: 'Your Website Name',
    images: [
      {
        url: `${siteURL}/images/og/download.jpg`,
        width: 800,
        height: 600,
        alt: 'Pokémon Infinite Fusion Screenshot'
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download Pokémon Infinite Fusion v6.2.4 | Official Links and Guides',
    description: 'Official download links and installation instructions for Pokémon Infinite Fusion v6.2.4. Compatible with Windows, Mac, Linux, and Steam Deck.',
    images: `${siteURL}/images/og/download.jpg`,
  },
  robots: 'index, follow',
};


export default function DownloadPage() {
  return (
    <>
      <h1>Download Pokémon Infinite Fusion 6.2.4</h1>
      <Alert variant="default" className="mb-8">
        <AlertTitle className="text-lg font-bold">Important Notice</AlertTitle>
        <AlertDescription>
          <ul className="list-disc pl-4 space-y-2">
            <li>The sprite server is currently down. Use the provided downloads that include all sprites.</li>
            <li className="text-red-500p">Beware of unofficial websites! Only download from official Discord, Reddit, or PokeCommunity sources.</li>
            <li>The game is optimized for Windows. Other platforms use workarounds that may affect performance.</li>
          </ul>
        </AlertDescription>
      </Alert>

      <section>
        <h2>Current Version: 6.2.4</h2>
        <Separator />
        <p>This game is primarily developed for Windows. Other platforms use workarounds that may affect performance.</p>
      </section>

      <section>
        <h2>Windows Installation (Recommended)</h2>
        <Separator />

        <h3>Download Links</h3>
        <ul>
          <li>Official Guide: <a href="https://docs.google.com/document/d/1CzIZSZC3g3PYytpOjX237DiVETD7Iflqfq9G8Rm-ylw/edit?tab=t.0#heading=h.cagbjdl7ozya">Installation Tutorial</a></li>
          <li>Full Game with ALL Sprites (2.57 GB): <a href="https://www.mediafire.com/file/yyhnqh6wkl4quuu/InfiniteFusion_6.2.4_preloaded.zip/file">MediaFire Download</a></li>
          <li>Download WinRAR: <a href="https://www.rarlab.com/rar/winrar-x64-701.exe">Click Here</a></li>
        </ul>

        <h3>Installation Steps</h3>
        <ol>
          <li>Delete any existing InfiniteFusion game folder - you don’t need it anymore.</li>
          <li>Download and install <strong>WinRAR</strong> (required for extracting large files).</li>
          <li>
            Right-click <strong>InfiniteFusion.zip</strong> → WinRAR → "Extract to InfiniteFusion\"
            <ul>
              <li>Do not extract over any existing game folder.</li>
              <li>Avoid using the default Windows extractor; use WinRAR for best results.</li>
            </ul>
          </li>
          <li>Open the newly extracted <strong>InfiniteFusion</strong> folder.</li>
          <li>Run <strong>Game.exe</strong> to launch the game.</li>
          <li>
            <strong>In-game setup:</strong>
            <ul>
              <li>Press <strong>ESC</strong> to open the options menu.</li>
              <li>Turn <strong>OFF Download Sprites</strong> in settings.</li>
              <li>Save your settings and restart the game.</li>
              <li>When starting a new game, select <strong>NO</strong> if prompted to download sprites.</li>
            </ul>
          </li>
        </ol>

        <h3>Quick FAQ</h3>
        <ul>
          <li><strong>What are these files?</strong> - This version includes preloaded sprites, so no internet is needed for sprite downloads.</li>
          <li><strong>Do I need to move my save file?</strong> - No. Save files are stored separately and won’t be affected by reinstalling.</li>
          <li><strong>What if the sprite server is restored?</strong> - You’ll just need to update the game by running INSTALL_OR_UPDATE.bat in the game folder and can re-enable Download Sprites.</li>
        </ul>
      </section>


      <section>
        <h2>Android Installation</h2>
        <Separator />

        <h3>Download Links</h3>
        <ul>
          <li>Game Files + Plugins: <a href="https://drive.google.com/file/d/12snKwObLwzQVmVJ0tJRR2_rnXEOAJeEb/view?usp=sharing">Google Drive (All-in-one package)</a></li>
          <li>Official Guide: <a href="https://docs.google.com/document/d/116NPjPnsosN3s4tg-LKN_IWZK990X8q6qL-V7OYtUUE/edit?tab=t.0#heading=h.eul55dcdzj6v">Written Guide</a></li>
          <li>Video Guide: <a href="https://youtu.be/cBfNahsoGbM?si=NYjRcivLbA9DyZ9X">YouTube Guide</a></li>
        </ul>

        <h3>Prerequisites</h3>
        <ul>
          <li>Uninstall any existing versions of JoiPlay and RPG Maker from your device.</li>
          <li>Install a <strong><a href="https://play.google.com/store/apps/details?id=com.rarlab.rar&hl=en_US&gl=US">RAR Extractor</a></strong> app from Google Play to handle large files.</li>
        </ul>

        <h3>Installation Steps</h3>
        <ol>
          <li>Extract <strong>InfiniteFusionAndroid.zip</strong> using the RAR Extractor.</li>
          <li>Extract <strong>PIFAndroidPlugins.zip</strong> as well.</li>
          <li>Install <strong>JoiPlay APK</strong> (version 1.20.410) from the extracted files.</li>
          <li>Install <strong>RPG Maker Plugin APK</strong> (version 1.20.53) for compatibility.</li>
          <li>Open JoiPlay and set up the game:
            <ul>
              <li>Tap the <strong>+</strong> button → Add Game.</li>
              <li>Navigate to the <strong>InfiniteFusion</strong> folder.</li>
              <li>Select <strong>Game.exe</strong> and confirm.</li>
            </ul>
          </li>
          <li>Once in-game:
            <ul>
              <li>Press <strong>ESC</strong> to access options.</li>
              <li>Turn <strong>OFF Download Sprites</strong> in settings.</li>
              <li>Save settings, restart the game, and confirm sprite download setting is off when starting a new game.</li>
            </ul>
          </li>
        </ol>

        <h3>Quick FAQ</h3>
        <ul>
          <li><strong>Do I need additional sprites?</strong> - This package includes all custom sprites, so no further downloads are needed. Note that auto-generated sprites may still show as placeholders due to the sprite server being down.</li>
          <li><strong>Why isn’t a preloaded version available?</strong> - Due to the large file count, preloaded sprites are not supported on Android to avoid performance issues.</li>
          <li><strong>Will my device work?</strong> - The game is optimized for select devices; consult the <a href="https://docs.google.com/document/d/116NPjPnsosN3s4tg-LKN_IWZK990X8q6qL-V7OYtUUE/edit?tab=t.0#heading=h.eul55dcdzj6v">Compatible Devices</a> list for more information.</li>
        </ul>

        <h3>Troubleshooting</h3>
        <ul>
          <li><strong>HTTP Errors</strong> - These often indicate use of non-official game files. Reinstall the game following this guide.</li>
          <li><strong>Compile Errors</strong> - Long-press the game icon in JoiPlay, select Edit, and set the engine type to RPG Maker (mkxp-z).</li>
          <li><strong>Map or Tileset Errors</strong> - Try optimizing maps in JoiPlay settings; if the app crashes during optimization, close other running apps and try again.</li>
          <li><strong>Controls or Typing Issues</strong> - Access JoiPlay settings to adjust controls under Gamepad Settings or switch Text Entry to Cursor mode.</li>
        </ul>
      </section>


      <section>
        <h2>Mac Installation</h2>
        <Separator />
        <h3>Download Links</h3>
        <ul>
          <li>Game Files: <a href="https://www.mediafire.com/file/rusox8ozuz8h2z0/InfiniteFusion.zip/file">MediaFire Download</a></li>
          <li>Official Guide: <a href="https://www.youtube.com/watch?v=vElcL_dG6r4">Mac Installation Tutorial</a></li>
          <li>Written Guide: <a href="https://docs.google.com/document/d/19p7WSql5LJQwKqEhwFJp868IMXaZFrLLx1UE9oqoVwI/edit?tab=t.0#heading=h.kiukblqcgsfu">Click Here</a></li>
          <li>Install Unarchiver: <a href="https://theunarchiver.com/">Click Here</a></li>
        </ul>

        <h3>System Requirements</h3>
        <ul>
          <li>MacOS 14.5 Sonoma or later (preferably 15.0 Sequoia)</li>
          <li>Install <a href="https://theunarchiver.com/">Unarchiver</a> for file extraction</li>
        </ul>

        <h3>Installation Steps</h3>
        <ol>
          <li><strong>Install HomeBrew</strong>
            <pre>/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</pre>
          </li>
          <li><strong>Set up HomeBrew Environment Variables</strong>
            <p>After installation, the terminal will prompt specific commands. Copy and paste them exactly, as they vary by Mac model and OS.</p>
            <ul>
              <li>If prompted with a command starting with <code>eval "$(/opt/homebrew/bin/brew shellenv)"</code>, execute it.</li>
              <li>If you receive an error like <code>no such file or directory: /opt/homebrew/bin/brew</code>, use the following for Intel-based Macs:
                <pre>eval "$(/usr/local/bin/brew shellenv)"</pre>
              </li>
            </ul>
          </li>
          <li><strong>Configure Homebrew Path</strong>
            <ul>
              <li>Apple Silicon: <pre>export PATH="/opt/homebrew/bin:$PATH"</pre></li>
              <li>Intel Mac: <pre>export PATH="/usr/local/bin:$PATH"</pre></li>
            </ul>
          </li>
          <li><strong>Prepare Homebrew for Wine</strong> (if needed)
            <pre>brew tap homebrew/cask-versions</pre>
            <p>If you get the message "homebrew/cask-versions was deprecated," you can skip this step.</p>
            <p>If you encounter a <code>brew not found</code> error, try running:
              <pre>echo 'eval $(/opt/homebrew/bin/brew shellenv)' &gt;&gt; ~/.zshrc</pre>
              <pre>source ~/.zshrc</pre>
            </p>
          </li>
          <li><strong>Install Wine Stable</strong>
            <pre>brew install --cask --no-quarantine wine-stable</pre>
            <ul>
              <li>If you get an error like <code>Binary at '/opt/homebrew/bin/appdb' already exists</code>, open <code>/opt/homebrew/bin/</code> in Finder and delete all files except "brew". Then re-run the command.</li>
              <li>If you see <code>requires Rosetta 2</code>, paste the suggested command from the terminal to install Rosetta 2.</li>
            </ul>
          </li>
          <li><strong>Extract Game Files with Unarchiver</strong>
            <p>Use <a href="https://theunarchiver.com/">Unarchiver</a> to extract the game files you downloaded. This will make sure everything is unpacked correctly.</p>
          </li>
          <li><strong>Open Game with Wine</strong>
            <p>Right-click <code>Game.exe</code> in the extracted folder and select "Open with Wine Stable". Ignore any warnings that may pop up.</p>
          </li>
        </ol>

        <h3>Save File Location</h3>
        <p>To access or transfer save files:</p>
        <ol>
          <li>Open Finder</li>
          <li>Press <code>Command + Shift + G</code></li>
          <li>Navigate to the save folder (replace <code>YOURNAME</code> with your username):
            <pre>/Users/YOURNAME/.wine/drive_c/users/YOURNAME/AppData/Roaming/infinitefusion</pre>
          </li>
        </ol>
      </section>


      <section>
        <h2>Linux (Ubuntu) and Steam Deck Installation Guide</h2>
        <Separator />
        <h3>Download Links</h3>
        <ul>
          <li>Game Files: <a href="https://www.mediafire.com/file/rusox8ozuz8h2z0/InfiniteFusion.zip/file">MediaFire Download</a></li>
          <li>Official Guide: <a href="https://docs.google.com/document/d/1Wjz8lTTFIInnIvED1pX_Z7qFajF8rg22j8p3zF2_pug/edit">Written Guide</a></li>
          <li>Steam Deck Video Guide: <a href="https://youtu.be/LRzdEYJsRhU">Steam Deck Installation</a></li>
        </ul>

        <h3>System Requirements</h3>
        <ul>
          <li><strong>Linux (Ubuntu)</strong>: Ensure that Wine is installed</li>
          <li><strong>Steam Deck</strong>: Use Desktop Mode and ensure Wine is installed</li>
          <li>Install location must be on main storage for the Steam Deck, not an SD card</li>
        </ul>

        <h3>Linux (Ubuntu) Installation</h3>
        <ol>
          <li><strong>Install Wine</strong>
            <p>Follow this <a href="https://www.youtube.com/watch?v=yCxBUy7S4Ks">Installing Wine on Linux Video</a> to set up Wine. Alternatively, use the following commands in the terminal:</p>
            <pre>
              sudo dpkg --add-architecture i386
              sudo apt update
              sudo apt install wine winbind
            </pre>
          </li>
          <li><strong>Download and Extract the Game</strong>
            <p>After downloading the game files, use your file manager or run the following command in terminal to extract:</p>
            <pre>unzip InfiniteFusion.zip</pre>
            <p>If you get an error, ensure the zip file is in an accessible directory.</p>
          </li>
          <li><strong>Run the Game</strong>
            <p>Navigate to the extracted game folder and run:</p>
            <pre>wine Game.exe</pre>
          </li>
        </ol>

        <h3>Steam Deck Installation</h3>
        <ol>
          <li><strong>Switch to Desktop Mode</strong>
            <p>On your Steam Deck, switch to Desktop Mode by holding the power button and selecting “Switch to Desktop.”</p>
          </li>
          <li><strong>Install Wine</strong>
            <p>Follow this <a href="https://youtu.be/LRzdEYJsRhU">Steam Deck Installation Video</a> to set up Wine on the Steam Deck. Make sure you’re installing on the main storage, as SD cards are not supported.</p>
          </li>
          <li><strong>Download and Extract Game Files</strong>
            <p>Download the game files and use an extraction tool to unzip them into a location on the main storage.</p>
          </li>
          <li><strong>Run the Game</strong>
            <p>Navigate to the extracted game directory and right-click on <code>Game.exe</code>, selecting “Open with Wine.”</p>
          </li>
        </ol>

        <h3>Common Issues and Troubleshooting</h3>
        <ul>
          <li><strong>Black Screen on Startup</strong>: This can happen while loading sprites. Wait a few minutes, and the game should start normally.</li>
          <li><strong>HTTP Error</strong>: If you encounter this error, you may have downloaded fake game files. Only download from official sources.</li>
          <li><strong>Where to Find Save Files</strong>: Save file locations vary by platform. For Linux, they’re often in <code>~/.wine/drive_c/users/[username]/AppData/Roaming/infinitefusion</code>. On Steam Deck, check the main Wine prefix location.</li>
        </ul>
      </section>

      <section>
        <h2>Credits and Community Links</h2>
        <Separator />
        <p>This guide and the official installation resources are provided courtesy of the <strong>Pokemon Infinite Fusion Team</strong> with special thanks to <strong>megaman</strong> (Tech Manager for Pokemon Infinite Fusion) and community contributor <strong>27masonp</strong> for the Linux and Chromebook instructions.</p>

        <h3>Community and Support Links</h3>
        <ul>
          <li>Official <strong>Discord</strong> Community: <a href="https://discord.gg/infinitefusion">Join Here</a></li>
          <li>Official <strong>Reddit</strong>: <a href="https://www.reddit.com/r/PokemonInfiniteFusion/">Visit Here</a></li>
          <li><strong>PokeCommunity Forum</strong>: <a href="https://www.pokecommunity.com/">Visit Here</a></li>
        </ul>

        <p>Note: I am not affiliated with the developers of Pokemon Infinite Fusion. I’m simply sharing the official download links and guides to help the community. If you encounter any issues with installation or gameplay, please reach out to the official channels above or contact me directly for assistance.</p>
      </section>

    </>
  )
}