/* Tweaks island — restrained, on-brand controls */
const { useEffect } = React;

const ACCENTS = [
  { hex: '#2f6b4f', name: 'Forest' },
  { hex: '#2b6b66', name: 'Teal' },
  { hex: '#3f4d5c', name: 'Slate' },
  { hex: '#9a5b43', name: 'Clay' },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#2f6b4f",
  "heading": "serif"
}/*EDITMODE-END*/;

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accent);
    document.documentElement.style.setProperty(
      '--serif',
      t.heading === 'sans'
        ? "'Inter', sans-serif"
        : "'Newsreader', Georgia, serif"
    );
    document.body.dataset.heading = t.heading;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t.accent);
  }, [t.accent, t.heading]);

  return (
    <TweaksPanel>
      <TweakSection label="Accent" />
      <TweakColor label="Color" value={t.accent}
        options={ACCENTS.map((a) => a.hex)}
        onChange={(v) => setTweak('accent', v)} />
      <TweakSection label="Headings" />
      <TweakRadio label="Display font" value={t.heading}
        options={['serif', 'sans']}
        onChange={(v) => setTweak('heading', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);
